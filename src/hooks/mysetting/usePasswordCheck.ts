import { fetchPasswordCheck } from '@/src/api/mysetting/inputAPI';
import { useMutation } from '@tanstack/react-query';

export const usePasswordCheck = () => {
  return useMutation({
    mutationFn: fetchPasswordCheck,
  });
};
