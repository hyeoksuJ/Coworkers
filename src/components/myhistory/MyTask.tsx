import CheckBoxIconActiveIcon from 'public/icons/checkbox_active.svg';
import dayjs from 'dayjs';
import { useTask } from '@hooks/myhistory/useTask';
import Task from '@/src/types/myhistory/TaskType';
import SlideItemsMotion from '@components/@shared/animation/SlideItemsMotion';
import NetworkError from '@components/@shared/NetworkError';

export default function MyTask() {
  const { data: taskResponse, isLoading, isError } = useTask();

  // 타입 가드를 정의, data가 어떤 형태든 검사할수 있도록 하려고 any타입으로 지정함
  // data가 { tasksDone: Task[] }이런 구조를 가지고 있는지 확인함
  const hasTasksDone = (data: any): data is { tasksDone: Task[] } => {
    return data && Array.isArray(data.tasksDone);
  };

  // 타입 가드를 사용하여 검사 후 `tasks` 가져오기!!
  const tasks = hasTasksDone(taskResponse)
    ? taskResponse.tasksDone.filter(Boolean)
    : [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <NetworkError />;
  }

  if (tasks.length === 0) {
    return (
      <p className="flex h-[65vh] items-center justify-center text-md-medium text-text-default">
        아직 히스토리 없습니다.
      </p>
    );
  }

  // 날짜 내림차순으로 정렬
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!b || !a) return 0; // a나 b가 undefined일 경우 처리
    return (
      new Date(b.doneAt ?? 0).getTime() - new Date(a.doneAt ?? 0).getTime()
    );
  });

  // 날짜별로 그룹화된 객체 생성
  const groupedTasks = sortedTasks.reduce(
    (acc, task) => {
      if (!task?.doneAt) {
        return acc;
      }

      const date = dayjs(task?.doneAt).format('YYYY년 MM월 DD일');

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    },
    {} as Record<string, Task[]>
  );

  return (
    <div className="flex flex-col gap-6  ">
      {Object.keys(groupedTasks).map((date) => (
        <div key={date}>
          <h2 className="mb-4 text-lg-bold">{date}</h2>
          {groupedTasks[date].map((taskItem, index) => (
            <SlideItemsMotion
              index={index}
              key={taskItem.id}
              className=" relative mb-2 flex min-w-[270px] items-center justify-between break-all rounded-md bg-background-secondary px-3.5 py-2.5 text-md-regular md:mb-4"
            >
              <div className="flex items-center gap-1.5  ">
                <CheckBoxIconActiveIcon />
                <span className="line-through">{taskItem.name}</span>
              </div>
            </SlideItemsMotion>
          ))}
        </div>
      ))}
    </div>
  );
}
