import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from '@/src/api/mysetting/inputAPI';
import { User } from '@/src/types/mysetting/settingData';

const logoOnlyPages = [
  '/signin',
  'signup',
  'addteam',
  '/',
  '/oauth/signup/google',
  '/oauth/signup/kakao',
];

export const useUserData = () => {
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  return useQuery<User>({
    queryKey: ['user'],
    queryFn: fetchUserData,
    enabled: !logoOnlyPages.includes(currentPath),
  });
};
