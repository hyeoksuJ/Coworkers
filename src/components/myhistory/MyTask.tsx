import Dropdown, { Option } from '@components/@shared/Dropdown';
import CheckBoxIconActiveIcon from 'public/icons/checkbox_active.svg';
import KebabIcon from 'public/icons/kebab_small.svg';
import dayjs from 'dayjs';
import { useTask } from '@hooks/myhistory/useTask';
import Task from '@/src/types/myhistory/TaskType';
import { useDeleteTask } from '@hooks/myhistory/useDeleteTask';
import NetworkError from '@components/@shared/NetworkError';

export default function MyTask() {
  const mutation = useDeleteTask();

  const { data: taskResponse, isLoading, isError } = useTask();

  const tasks = Array.isArray(taskResponse) ? taskResponse.filter(Boolean) : []; // taskResponse가 배열이 아닐 경우 배열로 감싸기

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

  const handelDeleteTask = (id: number) => {
    mutation.mutate(id);
  };

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

  const basic = (taskId: number): Option[] => [
    {
      label: '삭제',
      component: <div onClick={() => handelDeleteTask(taskId)}>삭제하기</div>,
    },
  ];

  return (
    <div className="flex flex-col gap-6  ">
      {Object.keys(groupedTasks).map((date) => (
        <div key={date}>
          <h2 className="mb-4 text-lg-medium">{date}</h2>
          {groupedTasks[date].map((taskItem) => (
            <div
              key={taskItem.id}
              className=" relative mb-4 flex min-w-[270px] items-center justify-between break-all rounded-md bg-background-secondary px-3.5 py-2.5 text-md-regular"
            >
              <div className="flex items-center gap-1.5  ">
                <CheckBoxIconActiveIcon />
                <span className="line-through">{taskItem.description}</span>
              </div>

              <Dropdown
                options={basic(taskItem.id)}
                triggerIcon={<KebabIcon />}
                optionsWrapClass=" mt-2 rounded-[12px] border border-background-tertiary"
                optionClass="rounded-[12px] md:w-[120px] md:h-[47px] w-[120px] h-[40px] justify-center text-md-regular md:text-lg-regular text-center hover:bg-background-tertiary"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
