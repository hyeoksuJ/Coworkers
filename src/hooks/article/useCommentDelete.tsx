import { fetchCommentDelete } from '@/src/api/article/CommentCardAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchCommentDelete,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['CommentCards'] });
      queryClient.invalidateQueries({ queryKey: ['DetailCard'] });
    },
  });
};
