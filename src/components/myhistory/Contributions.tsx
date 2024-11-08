import { useMemo, useState } from 'react';
import { useTask } from '@hooks/myhistory/useTask';
import NetworkError from '@components/@shared/NetworkError';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import Task from '@/src/types/myhistory/TaskType';
import LeftIcon from 'public/icons/arrow_left.svg';
import RightIcon from 'public/icons/arrow_right.svg';

dayjs.extend(isLeapYear);

// 월 이름 목록
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getBackgroundColor = (count: number) => {
  if (count > 10) return 'bg-[#ff1f58]';
  if (count > 5) return 'bg-[#ff5681]';
  if (count > 3) return 'bg-[#ff96b0]';
  if (count > 0) return 'bg-[#ffdae3]';
  return 'bg-[#262525]';
};

export default function Contributions() {
  const [year, setYear] = useState(dayjs().year());
  const { data: taskResponse, isLoading, isError } = useTask();

  const hasTasksDone = (data: any): data is { tasksDone: Task[] } => {
    return data && Array.isArray(data.tasksDone);
  };

  // 선택한 연도에 맞춰 일 수를 설정
  const NUM_DAYS = dayjs(`${year}-01-01`).isLeapYear() ? 366 : 365;

  // 선택한 연도에 해당하는 데이터 필터링
  const completedCounts = useMemo(() => {
    const tasks = hasTasksDone(taskResponse)
      ? taskResponse.tasksDone.filter(
          (task) => dayjs(task.doneAt).year() === year
        )
      : [];
    const count = new Map<string, number>();
    tasks.forEach((task) => {
      const data = dayjs(task.doneAt).format('YYYY-MM-DD');
      count.set(data, (count.get(data) || 0) + 1);
    });
    return count;
  }, [taskResponse, year]);

  // 연도 변경 시 daysArray 및 첫 주 빈 칸 재계산
  const daysArray = useMemo(() => {
    const startOfYear = dayjs().year(year).startOf('year');
    const startDayOfWeek = startOfYear.day();

    return [
      ...Array.from({ length: startDayOfWeek }, (_, index) => ({
        date: `empty-${index}`,
        count: 0,
      })), // 첫 주의 빈 칸, 고유한 key 부여
      ...Array.from({ length: NUM_DAYS }).map((_, i) => {
        const date = startOfYear.add(i, 'day').format('YYYY-MM-DD');
        const count = completedCounts.get(date) || 0;
        return { date, count };
      }),
    ];
  }, [year, completedCounts, NUM_DAYS]);

  const handlePreviousYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <NetworkError />;

  return (
    <div className="mr-10 flex flex-col items-center justify-center">
      <h1 className="mb-[15px] text-2lg-bold">My Contributions</h1>
      <div className=" inline-block h-full rounded-lg border-4 border-[#313131] p-10">
        <div className="mb-4 flex justify-between">
          <button type="button" onClick={handlePreviousYear}>
            <LeftIcon />
          </button>
          <span className="font-bold">{year}</span>
          <button type="button" onClick={handleNextYear}>
            <RightIcon />
          </button>
        </div>
        <div className="mb-[2px] ml-[30px] flex gap-8">
          <span>Sun</span>
          <span>Wen</span>
          <span>Sat</span>
        </div>
        <div className="grid grid-cols-[30px_auto] gap-x-2">
          <div className="flex flex-col items-end gap-[71px]">
            {monthNames.map((month) => (
              <span key={`${month}-${year}`} className="text-sm font-bold">
                {month}
              </span>
            ))}
          </div>
          <div className="grid max-w-[130px] grid-flow-row grid-cols-7 gap-[6px]">
            {daysArray.map(({ date, count }, index) => (
              <div
                key={date || index}
                className={
                  date.startsWith('empty')
                    ? ''
                    : `h-[16px] w-[15px] rounded-sm ${getBackgroundColor(count)}`
                }
                title={
                  date.startsWith('empty')
                    ? ''
                    : `${date}: ${count} tasks completed`
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
