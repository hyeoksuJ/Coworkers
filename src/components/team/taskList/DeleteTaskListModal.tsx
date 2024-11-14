import { deleteTaskList } from '@/src/api/tasks/taskListAPI';
import { useTeamStore } from '@/src/stores/useTeamStore';
import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import useTaskListStorage from '@hooks/team/useTaskListStorage';
import { UserData } from '../member/ExileUserModal';

interface DeleteTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskListId: number;
  taskName: string;
}

export default function DeleteTaskListModal({
  isOpen,
  onClose,
  taskListId,
  taskName,
}: DeleteTaskListModalProps) {
  const queryClient = useQueryClient();
  const { id } = useTeamStore();
  const { deleteStoredTaskList } = useTaskListStorage(id);
  // 'user' 키로 캐싱된 유저 데이터 가져오기
  const userData = queryClient.getQueryData<UserData>(['user']);

  // 팀 관리자만 삭제 가능
  const isAdmin =
    userData &&
    userData.memberships.find((m) => m.groupId === Number(id))?.role ===
      'ADMIN';

  // 목록 삭제 Mutation
  const { mutate: deleteList } = useMutation({
    mutationFn: (listId: string) => deleteTaskList({ listId }),
    onSuccess: () => {
      onClose();
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: (error) => {
      console.error('목록 삭제 실패:', error);
    },
  });

  const handleDeleteClick = () => {
    // 팀 관리자만 삭제 가능
    if (!isAdmin) {
      return;
    }
    deleteList(String(taskListId));

    deleteStoredTaskList(taskName);
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
              [{taskName}] 내의 모든 할 일이 사라집니다. 정말로
              삭제하시겠습니까?
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
