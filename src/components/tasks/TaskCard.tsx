import CalenderIcon from '@icons/calendar_large.svg';
import CommentIcon from '@icons/comment.svg';
import RepeatIcon from '@icons/repeat.svg';
import type { TaskDto } from '@/src/types/tasks/taskDto';

import { formatTaskCardDate } from '@utils/getFormattedDate';
import { useRouter } from 'next/router';
import { useModal } from '@hooks/useModal';
import { useTaskListStore } from '@/src/stores/taskListStore';
import useDropdownModals from '@hooks/useDropdownModals';
import Image from 'next/image';

import CardMotion from '@components/@shared/animation/CardMotion';
import ClickMotion from '@components/@shared/animation/ClickMotion';
import TaskEditDropdown, {
  editOption,
} from '@components/tasks/UI/TaskEditDropdown';
import Link from 'next/link';
import EditTaskModal from './UI/modal/EditTaskModal';
import DeleteTaskModal from './UI/modal/DeleteTaskModal';
import DeleteRecurringModal from './UI/modal/DeleteRecurringModal';
import { TaskDetails } from './TaskDetails';
import CheckBox from './UI/CheckBox';

interface TaskCardProps {
  task: TaskDto;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const { taskCompletionStatus, setTaskId, isSidebarOpen, setSidebarOpen } =
    useTaskListStore();
  const router = useRouter();
  const { query } = router;
  const { teamid, taskListId } = query;

  // 각 모달의 상태 독립적으로 관리
  const editModal = useModal();
  const deleteTaskModal = useModal();
  const deleteRecurringModal = useModal();

  // 드롭다운 핸들러
  const { handleOptionSelect } = useDropdownModals(editOption, [
    editModal,
    deleteTaskModal,
    deleteRecurringModal,
  ]);

  const handleDropdownSelection = (option: any) => {
    handleOptionSelect(option);
    setTaskId(task.id);
  };

  // 사이드바 핸들러
  const handleCloseTaskDetails = () => {
    setSidebarOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { taskId, teamid: teamIdFromQuery, ...restQuery } = query;
    router.push({
      pathname: `/${teamid}/tasks`,
      query: {
        ...restQuery,
        taskListId,
      },
    });
  };

  const isChecked = taskCompletionStatus[task.id]?.done ?? task.doneAt !== null;

  return (
    <CardMotion
      index={index}
      className="flex flex-col gap-[10px] rounded-lg bg-background-secondary px-[14px] py-3 text-text-default"
    >
      <div className="flex items-center">
        <div className="flex items-center">
          <CheckBox
            taskId={task.id}
            taskName={task.name}
            taskDescription={task.description}
            doneAt={task.doneAt}
          />
          <Link
            href={{
              pathname: `/${teamid}/tasks`,
              query: { taskListId, taskId: task.id },
            }}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <h1
              className={`ml-1 text-text-primary hover:text-text-secondary ${isChecked ? 'line-through' : ''}`}
            >
              {task.name}
            </h1>
          </Link>
          {isSidebarOpen && (
            <div>
              <TaskDetails
                isOpen={isSidebarOpen}
                onClose={handleCloseTaskDetails}
              />
            </div>
          )}
        </div>
        <div className="flex flex-grow justify-end gap-2 md:ml-2 md:flex-shrink md:justify-between">
          <div className="flex items-center gap-[2px]">
            <CommentIcon />
            <span className="text-md-medium text-text-tertiary">
              {task.commentCount}
            </span>
          </div>
          {!isSidebarOpen && (
            <ClickMotion>
              <TaskEditDropdown
                triggerIcon={
                  <Image
                    src="/icons/kebab_large.svg"
                    alt="더보기 아이콘"
                    width={10}
                    height={10}
                    className="h-3"
                  />
                }
                onSelect={handleDropdownSelection}
              />
            </ClickMotion>
          )}
          {editModal.isOpen && (
            <EditTaskModal
              isOpen={editModal.isOpen}
              onClose={editModal.onClose}
              done={task.doneAt !== null}
            />
          )}
          {deleteTaskModal.isOpen && (
            <DeleteTaskModal
              isOpen={deleteTaskModal.isOpen}
              onClose={deleteTaskModal.onClose}
              taskName={task.name}
            />
          )}
          {deleteRecurringModal.isOpen && (
            <DeleteRecurringModal
              isOpen={deleteRecurringModal.isOpen}
              onClose={deleteRecurringModal.onClose}
              taskName={task.name}
              taskRecurringId={task.recurringId}
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-[10px] text-xs-regular">
        <CalenderIcon />
        <span>{formatTaskCardDate(task.date)}</span>
        <div className="h-3 border-[1px] border-slate-700" />
        <RepeatIcon />
        <span>{task.frequency}</span>
      </div>
    </CardMotion>
  );
}
