import { deleteTaskList } from '@/src/api/tasks/taskListAPI';
import { useTeamStore } from '@/src/stores/teamStore';
import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
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
  // 'user' 키로 캐싱된 유저 데이터 가져오기
  const userData = queryClient.getQueryData<UserData>(['user']);

  // 팀 관리자만 삭제 가능
  const isAdmin =
    userData &&
    userData.memberships.find((m) => m.groupId === Number(id))?.role ===
      'ADMIN';

  // 목록 삭제 Mutation
  const { mutate: deleteList } = useMutation({
    mutationFn: (id: number) => deleteTaskList({ groupId: id }),
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
    deleteList(taskListId);

    // 로컬 스토리지에서 기존 TaskLists 가져오기 (없으면 빈 배열)
    const existingTaskListsString = localStorage.getItem(`TaskLists_${id}`);

    let existingTaskLists = [];
    if (existingTaskListsString) {
      try {
        existingTaskLists = JSON.parse(existingTaskListsString);

        // JSON 파싱 후 배열인지 확인
        if (!Array.isArray(existingTaskLists)) {
          existingTaskLists = []; // 배열이 아닐 경우 빈 배열로 초기화
        }
      } catch (error) {
        console.error(
          '로컬 스토리지에서 TaskLists를 파싱하는 중 오류 발생:',
          error
        );
        existingTaskLists = []; // 파싱 오류 발생 시 빈 배열로 초기화
      }
    }

    // 삭제할 항목의 name을 가진 요소 필터링
    const updatedTaskLists = existingTaskLists.filter(
      (task) => task.name !== taskName
    );

    // 업데이트된 배열을 로컬 스토리지에 저장
    localStorage.setItem(`TaskLists_${id}`, JSON.stringify(updatedTaskLists));
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
