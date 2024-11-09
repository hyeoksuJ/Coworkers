import { fetchCommentPatch } from '@/src/api/article/CommentCardAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommentEdit = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchCommentPatch,
    onSuccess: () => {
      console.log('게시글 수정 완료');
    },
    onError: (error) => {
      console.error('게시글 수정 실패', error);
    },
    onSettled: () => {
      QueryClient.invalidateQueries({
        queryKey: ['CommentCards'],
      });
    },
  });
};
