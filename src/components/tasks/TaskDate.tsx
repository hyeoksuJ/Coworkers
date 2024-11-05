import { formatTaskListDate } from '@utils/getFormattedDate';
import { useDate } from '@/src/contexts/DateContext';
import DatePagination from './UI/DatePagination';
import CalenderButton from './UI/button/CalenderButton';
import AddTaskListButton from './UI/button/AddTaskListButton';

export default function TaskDate() {
  const { date } = useDate();
  const formattedDate = formatTaskListDate(date);

  return (
    <section className="flex flex-col gap-6 text-text-primary">
      <h1 className="text-xl-bold">할 일</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p className="text-lg-medium">{formattedDate}</p>
          <DatePagination />
          <CalenderButton />
        </div>
        <AddTaskListButton />
      </div>
    </section>
  );
}
