import { fetchCommentPatch } from '@/src/api/article/CommentCardAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommentEdit = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchCommentPatch,
    onSettled: () => {
      QueryClient.invalidateQueries({
        queryKey: ['CommentCards'],
      });
    },
  });
};
