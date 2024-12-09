import { fetchChangePassword } from '@/src/api/mysetting/inputAPI';
import { useMutation } from '@tanstack/react-query';

export const usePasswordChange = () => {
  return useMutation({
    mutationFn: fetchChangePassword,
  });
};
