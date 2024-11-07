import { authAxiosInstance } from '@libs/axios/axiosInstance';

// 사용자 프로필 이미지 변경 API
export const patchUserImage = async (image: string) => {
  const response = await authAxiosInstance.patch('user', {
    image,
  });
  return response.data;
};
