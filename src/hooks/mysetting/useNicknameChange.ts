import { fetchProfileNickname } from '@/src/api/mysetting/inputAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useNicknameChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchProfileNickname,
    onSuccess: () => {
      console.log('닉네임 변경!');
    },
    onError: (error) => {
      console.error('닉네임 변경 실패', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
