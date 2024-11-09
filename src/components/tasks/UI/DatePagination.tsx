import Image from 'next/image';
import { useDate } from '@/src/contexts/DateContext';
import dayjs from 'dayjs';
import IconSparkleMotion from '@components/@shared/animation/IconSparkleMotion';

import ICON_PATHS from '@constants/iconPaths';

export default function DatePagination() {
  const { date, setDate } = useDate();

  // 이전 날짜로 이동
  const handlePrevDate = () => {
    const newDate = dayjs(date).subtract(1, 'day');
    setDate(newDate);
  };

  // 다음 날짜로 이동
  const handleNextDate = () => {
    const newDate = dayjs(date).add(1, 'day');
    setDate(newDate);
  };

  return (
    <div className="mx-auto  flex items-center gap-1">
      <button type="button" className="" onClick={handlePrevDate}>
        <IconSparkleMotion>
          <Image
            alt="왼쪽 화살표 아이콘"
            src={ICON_PATHS.ARROW_LEFT}
            width={12}
            height={12}
            className="h-4 w-4 rounded-full bg-background-secondary p-[2px]"
          />
        </IconSparkleMotion>
      </button>
      <button type="button" onClick={handleNextDate}>
        <IconSparkleMotion>
          <Image
            alt="오른쪽 화살표 아이콘"
            src={ICON_PATHS.ARROW_RIGHT}
            width={12}
            height={12}
            className="h-4 w-4 rounded-full bg-background-secondary p-[2px]"
          />
        </IconSparkleMotion>
      </button>
    </div>
  );
}
