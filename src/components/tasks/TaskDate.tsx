import { useEffect, useState } from 'react';
import { formatTaskListDate } from '@utils/getFormattedDate';
import { useDate } from '@/src/contexts/DateContext';
import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import DatePagination from './UI/DatePagination';
import CalenderButton from './UI/button/CalenderButton';
import AddTaskListButton from './UI/button/AddTaskListButton';

export default function TaskDate() {
  const { date } = useDate();
  const formattedDate = formatTaskListDate(date);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [date]);

  return (
    <section className="flex flex-col gap-6 text-text-primary">
      <h1 className="text-center text-xl-bold">할 일</h1>
      <div className="my-auto flex justify-between">
        <div className="flex gap-3">
          <SlideInMotion key={animateKey} className="text-lg-medium">
            {formattedDate}
          </SlideInMotion>
          <DatePagination />
          <CalenderButton />
        </div>
        <AddTaskListButton />
      </div>
    </section>
  );
}
