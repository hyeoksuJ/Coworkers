import { useEffect, useState } from 'react';
import Image from 'next/image';
import UserProfileIcon from '@icons/profile_small.svg';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  getComments,
  postComment,
  deleteComment,
  patchComment,
  CommentUrlParams,
} from '@/src/api/tasks/commentAPI';
import { useTaskListStore } from '@/src/stores/useTaskListStore';
import getSortedDate from '@utils/getSortedDate';
import getTimeAgo from '@utils/getTimeAgo';
import ClickMotion from '@components/@shared/animation/ClickMotion';

import { AutoTextArea } from '@components/@shared/Input';
import EditDropdown from '@components/team/EditDropdown';
import type { CommentRequestBody } from '@/src/types/tasks/commentDto';
import DescriptionTextArea from './UI/input/DescriptionTextArea';

export function TaskComments() {
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState('');
  const {
    comments,
    setComments,
    taskId,
    editingCommentId,
    setEditingCommentId,
    setCommentId,
  } = useTaskListStore();
  const {
    register,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<CommentRequestBody['patch']>({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  // GET, comments
  const { data: commentsData } = useQuery({
    queryKey: ['tasks', taskId],
    queryFn: () =>
      getComments({
        taskId,
      }),
    enabled: !!taskId,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (commentsData) {
      const sortedComments = getSortedDate(commentsData, 'createdAt');
      setComments(sortedComments);
    }
  }, [commentsData, setComments]);

  // POST, comment
  const { mutate: createComment } = useMutation({
    mutationFn: async ({
      params,
      data,
    }: {
      params: CommentUrlParams;
      data: CommentRequestBody['post'];
    }) => {
      return postComment(params, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
    onError: (error) => {
      console.error('createComment 실패:', error);
    },
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (commentInput.trim()) {
      try {
        await createComment({
          params: { taskId },
          data: { content: commentInput },
        });
        setCommentInput('');
      } catch (error) {
        console.error('createComment 오류:', error);
      }
    }
  };

  // DELETE, comment 삭제
  const { mutate: removeComment } = useMutation({
    mutationFn: async ({ params }: { params: CommentUrlParams }) => {
      return deleteComment(params);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
    onError: (error) => {
      console.error('removeComment 실패:', error);
    },
  });

  const handleDeleteComment = async (commentId: number) => {
    try {
      await removeComment({ params: { taskId, commentId } });
    } catch (error) {
      console.error('handleDeleteComment 실패:', error);
    }
  };

  // 드롭다운 핸들러
  const handleDropdownSelection = (option: any, commentId: number) => {
    setCommentId(commentId);
    if (option.label === 'delete') {
      handleDeleteComment(commentId);
    } else if (option.label === 'edit') {
      setEditingCommentId(commentId);
      const commentToEdit = comments.find(
        (comment) => comment.id === commentId
      );
      if (commentToEdit) {
        setValue('content', commentToEdit.content);
      }
    }
  };

  // PATCH, comment 수정
  const { mutate: editComment } = useMutation({
    mutationFn: async ({
      params,
      data,
    }: {
      params: CommentUrlParams;
      data: CommentRequestBody['patch'];
    }) => {
      return patchComment(params, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
    onError: (error) => {
      console.error('patchComment 실패:', error);
    },
  });

  const handleEditSubmit = async () => {
    const content = getValues('content');
    if (!content) return;

    try {
      await editComment({
        params: { taskId, commentId: editingCommentId },
        data: { content },
      });
      setEditingCommentId(undefined);
      setValue('content', '');
    } catch (error) {
      console.error('댓글 수정 오류:', error);
    }
  };

  return (
    <section className="mx-5">
      <AutoTextArea
        placeholder="댓글을 달아주세요"
        value={commentInput}
        onChange={handleCommentChange}
        onSubmit={handleCommentSubmit}
      />
      {comments.length > 0 ? (
        <ul className="mt-6 flex flex-col gap-4 text-text-primary">
          {comments.map((comment) => (
            <li key={comment.id} className="relative flex flex-col gap-4">
              {/* 드롭다운, 수정 모드일 경우 렌더링 X */}
              {editingCommentId !== comment.id && (
                <ClickMotion className="absolute -top-1 right-0">
                  <EditDropdown
                    triggerIcon={
                      <Image
                        src="/icons/kebab_large.svg"
                        alt="더보기 아이콘"
                        width={10}
                        height={10}
                        className="h-3"
                        quality={100}
                      />
                    }
                    onSelect={(option) =>
                      handleDropdownSelection(option, comment.id)
                    }
                  />
                </ClickMotion>
              )}
              {editingCommentId === comment.id ? (
                <form
                  className="flex w-full gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSubmit();
                  }}
                >
                  <DescriptionTextArea
                    placeholder={comment.content}
                    register={register}
                    registerValue="content"
                    isError={!!errors.content}
                    errorMessage={String(errors.content?.message)}
                  />
                  <div className="mb-auto mt-3 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingCommentId(undefined)}
                      className="my-auto h-9 w-14 rounded-md border-[1px] border-background-tertiary bg-text-default px-2 py-1 text-xs-medium text-text-disabled hover:border-status-danger hover:bg-status-danger hover:text-text-inverse"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`my-auto h-9 w-14 rounded-md border-[1px] px-2 py-1 text-xs-medium text-white 
                      ${!isValid ? 'border-background-tertiary bg-text-disabled ' : 'border-brand-primary bg-brand-primary  hover:bg-interaction-hover'}`}
                    >
                      수정
                    </button>
                  </div>
                </form>
              ) : (
                <p className="pr-4 text-md-regular ">{comment.content}</p>
              )}
              <div className="flex">
                <div className="flex flex-1 items-center gap-4">
                  {comment.user && (
                    <>
                      {comment.user.image ? (
                        <Image
                          alt="유저 프로필 이미지"
                          src={comment.user.image}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <UserProfileIcon />
                      )}
                      <span className="text-md-medium">
                        {comment.user.nickname}
                      </span>
                    </>
                  )}
                  {!comment.user && <UserProfileIcon />}
                </div>
                <span className="my-auto text-md-regular text-text-disabled">
                  {getTimeAgo(comment.createdAt)}
                </span>
              </div>
              <div className="mb-4 h-[1px] w-full bg-background-tertiary" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto mt-20 text-center text-md-medium text-text-default md:mt-40 ">
          <p>아직 댓글이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
