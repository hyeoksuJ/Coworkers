import { TaskProps, useTeamStore } from '@/src/stores/teamStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CardMotion from '@components/@shared/animation/CardMotion';
import CircleGraph from '../CircleGraph';

interface TaskBarProps {
  name: string;
  tasks: TaskProps[];
  id: number;
  isDragging: boolean;
  index: number;
}

interface StoredTaskList {
  name: string;
  color: string;
}

export default function TaskBar({
  name,
  tasks,
  id,
  isDragging,
  index,
}: TaskBarProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const { id: groupId } = useTeamStore();

  // 1. 총 task의 개수
  const totalTasks = tasks.length;
  // 2. doneAt이 null이 아닌 task의 개수
  const doneTasksCount = tasks.filter((task) => task.doneAt !== null).length;
  // 3. 진척도
  const doneRate = totalTasks === 0 ? 0 : (doneTasksCount / totalTasks) * 100;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [currentTagColor, setCurrentTagColor] = useState('');

  useEffect(() => {
    const pointColors = [
      '#ba70ff', // purple
      '#18d8ff', // blue
      '#15fbd8', // mint
      '#EC4899', // pink
      '#F43F5E', // rose
      '#ff9d35', // orange
      '#E6FE0B', // yellow
    ];
    // 로컬 스토리지에서 taskLists 가져오기
    const storedTaskLists = JSON.parse(
      localStorage.getItem(`TaskLists_${groupId}`) || '[]'
    );

    // 기존 taskList에 색상이 없으면 순서에 맞는 색상 할당
    let currentTaskList = storedTaskLists.find(
      (taskList: StoredTaskList) => taskList.name === name
    );

    if (!currentTaskList) {
      // 새로운 taskList일 경우 순서에 따라 색상 할당
      const colorIndex = storedTaskLists.length % pointColors.length;
      const newColor = pointColors[colorIndex];
      currentTaskList = { name, color: newColor };

      // taskList 저장
      localStorage.setItem(
        `TaskLists_${groupId}`,
        JSON.stringify([...storedTaskLists, currentTaskList])
      );
    }

    // 설정된 색상 사용
    setCurrentTagColor(currentTaskList.color);
  }, [groupId, name]);

  return (
    <CardMotion index={index} className="list-none">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex h-[40px] justify-between rounded-bl-[12px] rounded-br-[0px] rounded-tl-[12px] rounded-tr-[0px] bg-background-secondary pr-[20px]"
      >
        <Link
          href={`/${id}/tasks`}
          className={`flex flex-grow cursor-pointer justify-between ${isDragging ? 'pointer-events-none' : ''}`}
        >
          <div className="flex flex-grow items-center justify-start gap-[10px]">
            <div
              className="h-full w-[12px] shrink-0 rounded-bl-[12px] rounded-br-[0px] rounded-tl-[12px] rounded-tr-[0px]"
              style={{ backgroundColor: currentTagColor }}
            >
              &nbsp;
            </div>
            <p className="break-words break-all text-left text-md-medium">
              {name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="mr-[10px] flex items-center ">
              <div className="flex h-[25px] w-fit min-w-[57px] items-center justify-between gap-[2px] rounded-[12px] bg-background-primary px-[8px] py-[4px]">
                {doneRate === 100 ? (
                  <Image
                    src="/icons/progress_done.svg"
                    alt="완료 아이콘"
                    width={17}
                    height={17}
                    className="flex-shrink-0"
                  />
                ) : (
                  <CircleGraph
                    backgroundColor="#ffffff"
                    gradientColorStart="#FF5580"
                    gradientColorEnd="#FF5580"
                    radius={6}
                    percentage={doneRate}
                    strokeWidth={3}
                  />
                )}
                <p className="flex-grow text-center text-md-regular text-brand-primary">
                  {doneTasksCount}/{totalTasks}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </CardMotion>
  );
}
