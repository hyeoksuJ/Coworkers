import { fetchProfileImage } from '@/src/api/mysetting/inputAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useProfileChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchProfileImage,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
