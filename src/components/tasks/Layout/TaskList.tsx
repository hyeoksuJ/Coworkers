import { useState, useEffect } from 'react';
import type { TaskListDto, TaskDto } from '@/src/types/tasks/taskListDto';

import TaskCard from '../TaskCard';
import { MockData } from '../mockdata';

interface TaskListProps {
  initialTaskListId?: number;
}

export default function TaskList({ initialTaskListId = 1 }: TaskListProps) {
  const [selectedTasks, setSelectedTasks] = useState<TaskDto[]>([]);
  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    null
  );

  // 컴포넌트가 마운트될 때 또는 initialTaskListId가 변경될 때 해당 taskList 선택
  useEffect(() => {
    if (initialTaskListId) {
      const selectedList = MockData.find(
        (taskList: TaskListDto) => taskList.id === initialTaskListId
      );
      if (selectedList) {
        setSelectedTasks(selectedList.tasks);
        setSelectedTaskListId(initialTaskListId);
      }
    }
  }, [initialTaskListId]);

  // 선택된 taskList의 tasks[] 가져오기
  const handleButtonClick = (taskListId: number) => {
    if (selectedTaskListId === taskListId) {
      // 이미 선택된 taskList를 클릭한 경우, 선택 해제
      setSelectedTasks([]);
      setSelectedTaskListId(null);
    } else {
      // 새로운 taskList를 선택한 경우
      const selectedList = MockData.find(
        (taskList: TaskListDto) => taskList.id === taskListId
      );
      if (selectedList) {
        setSelectedTasks(selectedList.tasks);
        setSelectedTaskListId(taskListId);
      }
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <ul className="flex gap-3">
        {MockData.map((taskList: TaskListDto) => (
          <li
            key={taskList.id}
            className={
              selectedTaskListId === taskList.id
                ? 'border-b-[1px] border-b-white text-white'
                : 'text-text-default'
            }
          >
            <button
              type="button"
              onClick={() => handleButtonClick(taskList.id)}
              className="pb-1"
            >
              {taskList.name}
            </button>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-4">
        {selectedTasks.length > 0 &&
          selectedTasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </ul>
    </section>
  );
}
