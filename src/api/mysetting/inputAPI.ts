import { authAxiosInstance } from '@libs/axios/axiosInstance';
import {
  UserPassword,
  UserPasswordCheck,
  UserProfileChange,
  UserProfileNickname,
} from '@/src/types/mysetting/settingData';

// 계정설정 페이지의 프로필이미지, 이름, 이메일 가져옴
export const fetchUserData = async () => {
  const response = await authAxiosInstance.get('user');
  return response.data;
};

// 프로필 이미지 변경
export const fetchProfileImage = async ({ image }: UserProfileChange) => {
  const response = await authAxiosInstance.patch('user', {
    image,
  });
  return response.data;
};

// 프로필 닉네임 변경
export const fetchProfileNickname = async ({
  nickname,
}: UserProfileNickname) => {
  const response = await authAxiosInstance.patch('user', {
    nickname,
  });
  return response.data;
};

// 회원탈퇴 api
export const fetchDeletUser = async () => {
  const response = await authAxiosInstance.delete('user');
  return response.data;
};

// 비밀번호 변경
export const fetchChangePassword = async ({
  passwordConfirmation,
  password,
}: UserPassword) => {
  const response = await authAxiosInstance.patch('user/password', {
    passwordConfirmation,
    password,
  });
  return response.data;
};

// 비밀번호 변경을 위한 로그인 api
export const fetchPasswordCheck = async ({
  email,
  password,
}: UserPasswordCheck) => {
  const response = await authAxiosInstance.post('auth/signIn', {
    email,
    password,
  });
  return response.data;
};

export const fetchImageURL = async ({ image }: { image: File }) => {
  const formData = new FormData();
  formData.append('image', image); // 'image'는 서버에서 기대하는 필드 이름

  const response = await authAxiosInstance.post('images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
    },
  });
  return response.data;
};
