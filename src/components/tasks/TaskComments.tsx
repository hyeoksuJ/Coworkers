import { useEffect, useState } from 'react';
import Image from 'next/image';
import UserProfileIcon from '@icons/profile_small.svg';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getComments,
  postComment,
  deleteComment,
  patchComment,
  CommentUrlParams,
} from '@/src/api/tasks/commentAPI';
import { useTaskListStore } from '@/src/stores/taskListStore';
import getTimeAgo from '@utils/getTimeAgo';

import { AutoTextArea } from '@components/@shared/Input';
import EditDropdown from '@components/team/EditDropdown';
import type { CommentRequestBody } from '@/src/types/tasks/commentDto';

export function TaskComments() {
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>('');
  const { comments, setComments, taskId, setCommentId } = useTaskListStore();

  // GET, comments
  const { data: commentsData } = useQuery({
    queryKey: ['tasks', taskId],
    queryFn: () =>
      getComments({
        taskId,
      }),
    enabled: !!taskId,
  });

  // store
  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
  }, [commentsData, setComments]);

  // POST, comment 생성
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

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        setEditedCommentContent(commentToEdit.content);
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

  const handleEditSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    e.preventDefault();
    try {
      await editComment({
        params: { taskId, commentId },
        data: { content: editedCommentContent },
      });
      setEditingCommentId(null);
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
                <div className="absolute -top-1 right-0">
                  <EditDropdown
                    triggerIcon={
                      <Image
                        src="/icons/kebab_large.svg"
                        alt="더보기 아이콘"
                        width={10}
                        height={10}
                        className="h-3"
                      />
                    }
                    onSelect={(option) =>
                      handleDropdownSelection(option, comment.id)
                    }
                  />
                </div>
              )}
              {editingCommentId === comment.id ? (
                <form
                  className="flex gap-3"
                  onSubmit={(e) => handleEditSubmit(e, comment.id)}
                >
                  <textarea
                    value={editedCommentContent}
                    placeholder={comment.content}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    required
                    className="h-auto w-full resize-none overflow-hidden rounded-md bg-background-secondary p-3 text-md-medium outline-dashed outline-2 outline-background-tertiary focus:outline-text-default"
                  />
                  <button
                    type="submit"
                    className="my-auto h-9 w-14 rounded-md border-[1px] border-background-tertiary bg-text-default px-2 py-1 text-xs-medium text-white hover:border-brand-primary hover:bg-brand-primary"
                  >
                    수정
                  </button>
                </form>
              ) : (
                <p className="pr-4 text-md-regular">{comment.content}</p>
              )}
              <div className="flex">
                <div className="flex flex-1 items-center gap-4">
                  {comment.writer && (
                    <>
                      {comment.writer.image ? (
                        <Image
                          alt="유저 프로필 이미지"
                          src={comment.writer.image}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <UserProfileIcon />
                      )}
                      <span className="text-md-medium">
                        {comment.writer.nickname}
                      </span>
                    </>
                  )}
                  {!comment.writer && <UserProfileIcon />}
                </div>
                <span className="my-auto text-md-regular text-text-default">
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
