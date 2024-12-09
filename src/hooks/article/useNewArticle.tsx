import { fetchNewArticle } from '@/src/api/article/newarticleAPI';
import { useMutation } from '@tanstack/react-query';

export const useNewArticle = () => {
  return useMutation({
    mutationFn: fetchNewArticle,
  });
};
