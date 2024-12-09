// useImageUpload.ts
import { useMutation } from '@tanstack/react-query';
import { postImage } from '@/src/api/imageAPI';

export const useImageUpload = (onSuccess: (imgUrl: string) => void) => {
  const uploadImageMutate = useMutation({
    mutationFn: (file: File) => postImage(file),
    onSuccess,
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });

  return uploadImageMutate;
};
