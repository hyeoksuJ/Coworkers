import { fetchEditArticle } from '@/src/api/article/EditarticleAPI';
import { useMutation } from '@tanstack/react-query';

export const useEditArticle = () => {
  return useMutation({
    mutationFn: fetchEditArticle,
    onSuccess: () => {
      console.log('게시글 수정 완료');
    },
    onError: (error) => {
      console.error('게시글 수정 실패', error);
    },
  });
};
