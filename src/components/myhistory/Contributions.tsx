import { useMemo, useState } from 'react';
import { useTask } from '@hooks/myhistory/useTask';
import NetworkError from '@components/@shared/NetworkError';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import Task from '@/src/types/myhistory/TaskType';
import LeftIcon from 'public/icons/arrow_left.svg';
import RightIcon from 'public/icons/arrow_right.svg';
import styles from '@styles/scroll.module.css';

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

const getBackgroundColor = (count: number, isEmpty: boolean) => {
  if (isEmpty) return 'bg-transparent'; // 빈 칸은 투명 배경
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

  const NUM_DAYS = dayjs(`${year}-01-01`).isLeapYear() ? 366 : 365;

  // 연도별 task 완료 횟수 계산
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

  // 주별로 날짜를 배열에 나열
  const daysArray = useMemo(() => {
    const startOfYear = dayjs().year(year).startOf('year');
    const startDayOfWeek = startOfYear.day();

    const days = [
      ...Array.from({ length: startDayOfWeek }, (_, index) => ({
        date: `empty-${index}`,
        count: 0,
        isEmpty: true, // 빈 칸 표시
      })),
      ...Array.from({ length: NUM_DAYS }).map((_, i) => {
        const date = startOfYear.add(i, 'day').format('YYYY-MM-DD');
        const count = completedCounts.get(date) || 0;
        return { date, count, isEmpty: false };
      }),
    ];

    // 7일씩 끊어서 주 단위로 그룹화
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [year, completedCounts, NUM_DAYS]);

  const handlePreviousYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <NetworkError />;

  return (
    <div className="flex flex-col">
      <h1 className="mb-[15px] text-2lg-bold">My Contributions</h1>
      <div className=" w-max-full mr-1 h-full max-w-full rounded-lg border-4 border-[#313131] p-10">
        <div className="mb-4 flex gap-5">
          <button type="button" onClick={handlePreviousYear}>
            <LeftIcon />
          </button>
          <span className="font-bold">{year}</span>
          <button type="button" onClick={handleNextYear}>
            <RightIcon />
          </button>
        </div>

        {/* 월 이름을 가로로 배치 */}
        <div className={`overflow-x-auto ${styles.ContributionsScroll}`}>
          <div className="mb-4 ml-10 flex gap-[57px]">
            {monthNames.map((month) => (
              <span key={`${month}-${year}`} className="text-sm font-bold">
                {month}
              </span>
            ))}
          </div>

          <div className="flex ">
            <div className="mr-4 mt-[14px] flex flex-col gap-4">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            {/* 잔디 그래프 가로 배치 */}
            <div className="flex gap-1">
              {daysArray.map((week, weekIndex) => (
                <div
                  key={`week-${week[0]?.date}`}
                  className="flex flex-col gap-[4px]"
                >
                  {week.map(({ date, count, isEmpty }, dayIndex) => (
                    <div
                      key={date || `${weekIndex}-${dayIndex}`}
                      className={`h-[14.5px] w-[14.5px] rounded-sm ${getBackgroundColor(count, isEmpty)}`}
                      title={isEmpty ? '' : `${date}: ${count} tasks completed`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
