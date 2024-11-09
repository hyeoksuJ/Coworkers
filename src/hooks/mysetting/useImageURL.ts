import { fetchImageURL } from '@/src/api/mysetting/inputAPI';
import { useMutation } from '@tanstack/react-query';

export const useImageURL = () => {
  return useMutation({
    mutationFn: fetchImageURL,
  });
};
