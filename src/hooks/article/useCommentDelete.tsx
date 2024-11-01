import { fetchCommentDelete } from '@/src/api/article/CommentCardAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchCommentDelete,
    onSuccess: () => {
      console.log('게시글 삭제 완료');
    },
    onError: (error) => {
      console.error('게시글 삭제 실패', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['CommentCards'] });
      queryClient.invalidateQueries({ queryKey: ['DetailCard'] });
    },
  });
};
