import { useModal } from '@hooks/useModal';
import { useTaskListStore } from '@/src/stores/taskListStore';
import { useDate } from '@/src/contexts/DateContext';
import ClickMotion from '@components/@shared/animation/ClickMotion';
import Button from '@components/@shared/Button';
import AddTaskModal from '../modal/AddTaskModal';

export default function AddTaskButton() {
  const { date, today } = useDate();
  const { isOpen, onOpen, onClose } = useModal();
  const { isSidebarOpen, tasks } = useTaskListStore();

  const isDisabled = date.isBefore(today, 'day');

  return (
    <>
      {!isSidebarOpen && (
        <ClickMotion
          className={`${tasks.length > 0 ? 'fixed bottom-8 right-8 xl:bottom-12' : 'flex justify-center'}`}
        >
          <Button
            bgColor="green"
            shape="round"
            onClick={onOpen}
            disabled={isDisabled}
          >
            + 할 일 추가
          </Button>
        </ClickMotion>
      )}

      {isOpen && <AddTaskModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
