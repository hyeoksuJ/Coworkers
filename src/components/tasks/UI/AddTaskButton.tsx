import { useModal } from '@hooks/useModal';
import { useTaskListStore } from '@/src/stores/taskListStore';
import Button from '@components/@shared/Button';
import AddTaskModal from './AddTaskModal';

export default function AddTaskButton() {
  const { isOpen, onOpen, onClose } = useModal();
  const { isSidebarOpen } = useTaskListStore();

  return (
    <>
      {!isSidebarOpen && (
        <Button
          bgColor="green"
          shape="round"
          className="fixed bottom-8 right-8 xl:bottom-12"
          onClick={onOpen}
        >
          + 할 일 추가
        </Button>
      )}

      {isOpen && <AddTaskModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
