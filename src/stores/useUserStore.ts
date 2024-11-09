import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  nickname: string;
  updateAt: string;
  createAt: string;
  image: string | null;
  teamId: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  updateUser: (user: User) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  // 새로고침해도 상태 유지하기 위해 persist 사용
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      updateUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        localStorage.removeItem('userStorage');
      },
    }),
    {
      name: 'userStorage', // localStorage에 저장될 키 이름
    }
  )
);
