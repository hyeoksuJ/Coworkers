import { fetchArticleDelete } from '@/src/api/article/articlecardAPI';
import { useMutation } from '@tanstack/react-query';

export const useArticleDelete = () => {
  return useMutation({
    mutationFn: fetchArticleDelete,
  });
};
