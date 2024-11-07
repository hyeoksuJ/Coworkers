import { useModal } from '@hooks/useModal';
import { useTaskListStore } from '@/src/stores/taskListStore';
import Button from '@components/@shared/Button';
import AddTaskModal from '../modal/AddTaskModal';

export default function AddTaskButton() {
  const { isOpen, onOpen, onClose } = useModal();
  const { isSidebarOpen, tasks } = useTaskListStore();

  return (
    <>
      {!isSidebarOpen && (
        <div
          className={`${tasks.length > 0 ? 'fixed bottom-8 right-8 xl:bottom-12' : 'flex justify-center'}`}
        >
          <Button bgColor="green" shape="round" onClick={onOpen}>
            + 할 일 추가
          </Button>
        </div>
      )}

      {isOpen && <AddTaskModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
