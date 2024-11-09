import { fetchProfileNickname } from '@/src/api/mysetting/inputAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useNicknameChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchProfileNickname,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
