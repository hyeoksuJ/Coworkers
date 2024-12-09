// useAdminCheck.ts
import { UserData } from '@components/team/member/ExileUserModal';
import { useQueryClient } from '@tanstack/react-query';
import { useTeamStore } from '@/src/stores/useTeamStore';

export const useAdminCheck = () => {
  const { id } = useTeamStore();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserData>(['user']);

  const isAdmin =
    userData &&
    userData.memberships.find((m) => m.groupId === Number(id))?.role ===
      'ADMIN';

  return isAdmin;
};
