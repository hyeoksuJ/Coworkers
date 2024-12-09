import { fetchEditArticle } from '@/src/api/article/EditarticleAPI';
import { useMutation } from '@tanstack/react-query';

export const useEditArticle = () => {
  return useMutation({
    mutationFn: fetchEditArticle,
  });
};
