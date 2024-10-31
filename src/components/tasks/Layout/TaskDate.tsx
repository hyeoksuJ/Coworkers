import { formatTaskListDate } from '@utils/getFormattedDate';
import { useDate } from '@/src/contexts/DateContext';
import Pagination from '../Pagination';
import CalenderButton from '../UI/CalenderButton';
import AddTaskListButton from '../UI/AddTaskListButton';

export default function TaskDate() {
  const { date } = useDate();
  const formattedDate = formatTaskListDate(date);

  return (
    <section className="flex flex-col gap-6 text-text-primary">
      <h1 className="text-xl-bold">할 일</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p className="text-lg-medium">{formattedDate}</p>
          <Pagination />
          <CalenderButton />
        </div>
        <AddTaskListButton />
      </div>
    </section>
  );
}
