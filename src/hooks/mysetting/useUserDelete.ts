import { useMutation } from '@tanstack/react-query';
import { fetchDeletUser } from '@/src/api/mysetting/inputAPI';

export const useUserDelete = () => {
  return useMutation({
    mutationFn: fetchDeletUser,
  });
};
