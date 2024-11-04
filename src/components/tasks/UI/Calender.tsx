import { useState } from 'react';
import DatePicker from 'react-datepicker';
import dayjs, { Dayjs } from 'dayjs';

import { useDate } from '@/src/contexts/DateContext';
import { Modal } from '@components/@shared/Modal';
import Button from '@components/@shared/Button';
import useViewportSize from '@hooks/useViewportSize';
import CalenderArrowLeft from '@icons/calender_arrow_left.svg';
import CalenderArrowRight from '@icons/calender_arrow_right.svg';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '@styles/calendar.module.css';

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

interface CalenderProps {
  isOpen: boolean;
  onClose: () => void;
  onDateChange?: (date: Dayjs) => void | null;
  isInput?: boolean; // input 여부
}

export default function Calender({
  isOpen,
  onClose,
  onDateChange,
  isInput = false,
}: CalenderProps) {
  const { date: contextDate, setInputDate, setDate, today } = useDate();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(contextDate));
  const [displayedMonth, setDisplayedMonth] = useState(dayjs(contextDate));
  const { isMobile } = useViewportSize();

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      const dayjsDate = dayjs(newDate);
      const isBeforeToday = dayjsDate.isBefore(dayjs(), 'day');
      if (isInput && isBeforeToday) {
        return;
      }
      setSelectedDate(dayjsDate);

      if (isInput) {
        setInputDate(dayjsDate);
      } else {
        setDate(dayjsDate);
      }

      if (onDateChange) {
        onDateChange(dayjsDate);
      }
      onClose();
    }
  };

  // 커스텀 헤더 렌더링
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: CustomHeaderProps) => {
    return (
      <div className={styles.customHeader}>
        <button
          aria-label="지난 달 달력"
          type="button"
          onClick={() => {
            decreaseMonth();
            setDisplayedMonth(dayjs(date).subtract(1, 'month'));
          }}
        >
          <CalenderArrowLeft />
        </button>
        <span>{dayjs(date).locale('en').format('MMMM YYYY')}</span>
        <button
          aria-label="다음 달 달력"
          type="button"
          onClick={() => {
            increaseMonth();
            setDisplayedMonth(dayjs(date).add(1, 'month'));
          }}
        >
          <CalenderArrowRight />
        </button>
      </div>
    );
  };

  // 공통 DatePicker 컴포넌트
  const renderDatePicker = () => (
    <DatePicker
      inline={!isInput}
      dateFormat="yyyy년 MM월 dd일"
      selected={selectedDate.toDate()}
      renderCustomHeader={renderCustomHeader}
      calendarClassName={styles.calenderWrapper}
      dayClassName={(date) => {
        // 날짜 확인
        const day = dayjs(date);
        const isDisplayedMonth = day.isSame(displayedMonth, 'month');
        const isToday = day.isSame(today, 'day');
        const isBeforeToday = day.isBefore(today, 'day');
        const isSelected =
          day.isSame(selectedDate, 'month') &&
          day.date() === selectedDate.date();

        if (!isDisplayedMonth) {
          return styles.disabledDay;
        }
        if (isToday) {
          return styles.today;
        }
        if (isSelected) {
          return styles.selectedDay;
        }
        if (isInput && isBeforeToday) {
          return styles.disabledDay;
        }
        return styles.day;
      }}
      filterDate={(date) => dayjs(date).isSame(displayedMonth, 'month')}
      onChange={handleDateChange}
    />
  );

  return (
    <>
      {isInput ? renderDatePicker() : null}

      {/* 모바일 모달: 모바일 사이즈고 input 태그가 없을 경우 */}
      {isMobile && !isInput && isOpen ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className="relative flex flex-1 justify-center"
        >
          <Modal.Wrapper className="flex flex-col">
            <Modal.Content>{renderDatePicker()}</Modal.Content>
            <Modal.Footer className="mr-1 flex justify-end">
              <Button
                className="bg-slate-400"
                shape="square"
                fontColor="white"
                fontSize="14"
                width={60}
                height={30}
                border="gray"
                onClick={onClose}
              >
                닫기
              </Button>
            </Modal.Footer>
          </Modal.Wrapper>
        </Modal>
      ) : (
        isOpen && renderDatePicker()
      )}
    </>
  );
}
