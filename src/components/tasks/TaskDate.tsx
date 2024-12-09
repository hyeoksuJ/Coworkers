import { useEffect, useState } from 'react';
import { formatTaskListDate } from '@utils/getFormattedDate';
import { useDate } from '@/src/contexts/DateContext';
import { useTaskListStore } from '@/src/stores/useTaskListStore';
import BounceTextMotion from '@components/@shared/animation/BounceTextMotion';
import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import DatePagination from './UI/DatePagination';
import CalenderButton from './UI/button/CalenderButton';
import AddTaskListButton from './UI/button/AddTaskListButton';

export default function TaskDate() {
  const { date } = useDate();
  const formattedDate = formatTaskListDate(date);
  const { selectedTaskListName } = useTaskListStore();
  const [taskListAnimateKey, setTaskListAnimateKey] = useState(0);
  const [dateAnimateKey, setDateAnimateKey] = useState(0);

  useEffect(() => {
    setTaskListAnimateKey((prev) => prev + 1);
  }, [selectedTaskListName]);

  useEffect(() => {
    setDateAnimateKey((prev) => prev + 1);
  }, [date]);
  return (
    <section className="flex flex-col gap-6 text-text-primary">
      <h1 className="flex flex-col gap-1 text-center text-lg-bold">
        <span className="text-xl-bold">
          [{' '}
          <BounceTextMotion
            text={selectedTaskListName}
            key={taskListAnimateKey}
            className="inline text-brand-primary"
          />{' '}
          ]{' '}
        </span>
        할 일 목록
      </h1>
      <div className="my-auto flex justify-between">
        <div className="flex gap-3">
          <SlideInMotion key={dateAnimateKey} className="text-lg-medium">
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
