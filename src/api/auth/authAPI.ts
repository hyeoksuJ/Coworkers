import { publicAxiosInstance } from '@libs/axios/axiosInstance';

// 회원가입 API
export const postSignUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
) => {
  const response = await publicAxiosInstance.post('auth/signUp', {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  return response.data;
};

// 로그인 API
export const postSignIn = async (email: string, password: string) => {
  const response = await publicAxiosInstance.post('auth/signIn', {
    email,
    password,
  });
  return response.data;
};

// 액세스 토큰 재발급 API
export const postRefreshToken = async (refreshToken: string) => {
  const response = await publicAxiosInstance.post('auth/refresh-token', {
    refreshToken,
  });
  return response.data;
};

// 구글 로그인 API
export const postSignInGoogle = async (
  redirectUri: string,
  token: string | string[],
  state?: string
) => {
  const response = await publicAxiosInstance.post('auth/signIn/GOOGLE', {
    state,
    redirectUri,
    token,
  });
  return response.data;
};

// 카카오 로그인 API
export const postSignInKakao = async (
  redirectUri: string,
  token: string | string[],
  state?: string
) => {
  const response = await publicAxiosInstance.post('auth/signIn/KAKAO', {
    state,
    redirectUri,
    token,
  });
  return response.data;
};

// 비밀번호 재설정 이메일 전송 API
export const postSendResetPasswordEmail = async (
  email: string,
  redirectUrl: string
) => {
  const response = await publicAxiosInstance.post(
    'user/send-reset-password-email',
    {
      email,
      redirectUrl,
    }
  );
  return response.data;
};

// 비밀번호 재설정 API
export const patchResetPassword = async (
  passwordConfirmation: string,
  password: string,
  token: string | string[] | undefined
) => {
  const response = await publicAxiosInstance.patch('user/reset-password', {
    passwordConfirmation,
    password,
    token,
  });
  return response.data;
};
