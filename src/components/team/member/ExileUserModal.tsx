import { deleteMemberById } from '@/src/api/team/memberAPI';
import { useTeamStore } from '@/src/stores/useTeamStore';
import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ExileUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  userId: number;
  role: string;
  isSelf?: boolean;
}

interface Group {
  id: number;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}

interface Membership {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
  group: Group;
}

export interface UserData {
  id: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  teamId: string;
  email: string;
  memberships: Membership[];
}

export default function ExileUserModal({
  isOpen,
  onClose,
  memberName,
  userId,
  role,
  isSelf = false,
}: ExileUserModalProps) {
  const { id } = useTeamStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  // 멤버 삭제 Mutation
  const { mutate: deleteMember } = useMutation({
    mutationFn: ({ groupid, userid }: { groupid: string; userid: number }) =>
      deleteMemberById(groupid, userid),
    onSuccess: () => {
      console.log('멤버 정보 삭제 완료!');
      onClose();
      if (role !== 'ADMIN' && isSelf) {
        router.push('/myteam');
      }
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: (error) => {
      console.error('멤버 삭제 실패:', error);
    },
  });

  const handleDeleteClick = () => {
    // 팀 관리자만 삭제 가능
    if (role !== 'ADMIN' && !isSelf) {
      return;
    }

    // 관리자 본인 삭제 불가 체크
    if (role === 'ADMIN' && isSelf) {
      return;
    }

    deleteMember({ groupid: id as string, userid: userId as number });
  };

  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={onClose}
      array="column"
      padding="default"
      bgColor="primary"
      fontSize="16"
      fontArray="center"
      gap="40"
    >
      <Modal.Wrapper array="column">
        <Modal.Header
          fontColor="primary"
          className="flex flex-col items-center gap-[16px]"
        >
          <Image
            src="/icons/alert.svg"
            alt="경고 아이콘"
            width={24}
            height={24}
          />
          {role === 'ADMIN' && !isSelf && (
            <span>{memberName} 유저를 삭제하시겠어요?</span>
          )}
          {role !== 'ADMIN' && isSelf && <span>팀에서 탈퇴하시겠어요?</span>}
          {role !== 'ADMIN' && !isSelf && <span>권한 없음</span>}
        </Modal.Header>
        <Modal.Content fontColor="secondary" fontSize="14" fontArray="center">
          {role === 'ADMIN' && !isSelf && (
            <p className="mt-[20px]">
              팀 내에서 멤버를 삭제합니다. 정말로 진행하시겠습니까?
            </p>
          )}
          {role !== 'ADMIN' && isSelf && (
            <p className="mt-[20px]">
              팀에서 탈퇴합니다. 정말로 진행하시겠습니까?
            </p>
          )}
          {role !== 'ADMIN' && !isSelf && (
            <p className="mt-[20px]">관리자만 삭제할 수 있습니다.</p>
          )}
          {role === 'ADMIN' && isSelf && (
            <p className="mt-[20px]">
              관리자는 탈퇴할 수 없습니다. 팀을 삭제해주세요.
            </p>
          )}
        </Modal.Content>
      </Modal.Wrapper>
      <Modal.Footer>
        <div className="flex gap-[8px]">
          <Button
            size="full"
            bgColor="white"
            fontColor="gray"
            onClick={onClose}
          >
            취소
          </Button>
          {role === 'ADMIN' && !isSelf && (
            <Button size="full" bgColor="red" onClick={handleDeleteClick}>
              삭제
            </Button>
          )}
          {role !== 'ADMIN' && isSelf && (
            <Button size="full" bgColor="red" onClick={handleDeleteClick}>
              탈퇴
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}
