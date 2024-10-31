import Link from 'next/link';
import { useTaskListStore } from '@/src/stores/taskListStore';
import TaskCard from '../TaskCard';

export default function TaskList() {
  const { taskLists, taskListId, setTaskListId, tasks, setTasks } =
    useTaskListStore();

  // 선택된 taskList의 tasks[] 가져오기
  const handleButtonClick = (selectedTaskListId: number | undefined) => {
    if (selectedTaskListId !== taskListId) {
      const selectedList = taskLists.find(
        (taskList) => taskList.id === taskListId
      );
      if (selectedList) {
        setTasks(selectedList.tasks);
        setTaskListId(selectedTaskListId);
      }
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <ul className="flex gap-3">
        {taskLists.map((taskList) => (
          <li
            key={taskList.id}
            className={
              taskListId === taskList.id
                ? 'border-b-[1px] border-b-white text-white'
                : 'text-text-default'
            }
          >
            <Link href={{ pathname: `/${taskList.id}/tasks` }}>
              <button
                type="button"
                onClick={() => handleButtonClick(taskList.id)}
                className="pb-1"
              >
                {taskList.name}
              </button>
            </Link>
          </li>
        ))}
      </ul>
      {tasks.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {tasks.length > 0 &&
            tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </ul>
      ) : (
        <div className="text-text-md mt-80 text-center text-text-default sm:mt-48">
          <p>아직 할 일이 없습니다.</p>
          <p>할 일을 추가해보세요.</p>
        </div>
      )}
    </section>
  );
}
