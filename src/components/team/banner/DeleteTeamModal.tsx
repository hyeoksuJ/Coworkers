import { deleteGroupById } from '@/src/api/team/teamAPI';
import { useTeamStore } from '@/src/stores/teamStore';
import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { UserData } from '../member/ExileUserModal';

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteTeamModal({
  isOpen,
  onClose,
}: DeleteTeamModalProps) {
  const { id } = useTeamStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  // 'user' 키로 캐싱된 유저 데이터 가져오기
  const userData = queryClient.getQueryData<UserData>(['user']);

  // 팀 관리자만 삭제 가능
  const isAdmin =
    userData &&
    userData.memberships.find((m) => m.groupId === Number(id))?.role ===
      'ADMIN';

  // 그룹 삭제 Mutation
  const { mutate: deleteGroup } = useMutation({
    mutationFn: (groupId: string) => deleteGroupById(groupId),
    onSuccess: () => {
      console.log('팀 정보 삭제 완료!');
      onClose();
      router.push('/myteam');
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('팀 삭제 실패:', error);
    },
  });

  const handleDeleteClick = () => {
    // 팀 관리자만 삭제 가능
    if (!isAdmin) {
      return;
    }
    deleteGroup(id as string);
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
          {isAdmin ? (
            <span>목록을 삭제하시겠어요?</span>
          ) : (
            <span>권한 없음</span>
          )}
        </Modal.Header>
        <Modal.Content fontColor="secondary" fontSize="14" fontArray="center">
          {isAdmin && (
            <p className="mt-[20px]">
              팀과 관련된 모든 정보가 사라집니다. 정말로 삭제하시겠습니까?
            </p>
          )}
          {!isAdmin && (
            <p className="mt-[20px]">관리자만 삭제할 수 있습니다.</p>
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
          {isAdmin && (
            <Button size="full" bgColor="red" onClick={handleDeleteClick}>
              삭제
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}
