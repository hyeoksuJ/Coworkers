import { useModal } from '@hooks/useModal';
import { useTeamStore } from '@/src/stores/teamStore';
import Link from 'next/link';
import TaskBar from './TaskBar';
import AddTaskListModal from './AddTaskListModal';
import styles from '../../../styles/scroll.module.css';

export default function TaskList() {
  const {
    isOpen: addListIsOpen,
    onOpen: addListOpenModal,
    onClose: addListCloseModal,
  } = useModal();

  const { taskLists, id } = useTeamStore();

  const listCount = taskLists.length;

  return (
    <section>
      <div className="my-[20px]">
        <div className="flex justify-between">
          <div className="flex gap-[10px]">
            <p className="text-lg-medium">할 일 목록</p>
            <p className="text-lg-regular text-text-default">({listCount}개)</p>
          </div>
          <button
            type="button"
            onClick={addListOpenModal}
            className="cursor-pointer text-md-regular text-brand-primary"
          >
            +새로운 목록 추가하기
          </button>
          <AddTaskListModal
            isOpen={addListIsOpen}
            onClose={addListCloseModal}
            groupId={id}
          />
        </div>
      </div>
      {listCount === 0 && (
        <p className="my-[100px] text-center text-md-medium text-text-default">
          아직 할 일 목록이 없습니다.
        </p>
      )}

      <div className={`max-h-[320px] overflow-y-auto ${styles.taskListScroll}`}>
        <div className="flex flex-col gap-[10px]">
          {taskLists.map((taskList) => (
            <TaskBar
              key={taskList.id}
              name={taskList.name}
              tasks={taskList.tasks}
              id={taskList.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
