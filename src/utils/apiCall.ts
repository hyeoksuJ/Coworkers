import { authAxiosInstance } from '@libs/axios/axiosInstance';

type HttpMethod = 'get' | 'post' | 'patch' | 'delete' | 'put';

// 공통 apiCall 함수
export const apiCall = async (
  method: HttpMethod,
  url: string,
  data: any = null,
  config: object = {}
) => {
  const response = await authAxiosInstance[method](url, data, config);
  return response.data;
};
