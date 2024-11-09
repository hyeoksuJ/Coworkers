/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface DateContextProps {
  date: dayjs.Dayjs;
  setDate: (date: dayjs.Dayjs) => void;
  inputDate: dayjs.Dayjs;
  setInputDate: (date: dayjs.Dayjs) => void;
  today: dayjs.Dayjs;
  getCurrentMonth: () => number;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);

export function DateProvider({ children }: { children: ReactNode }) {
  const today = dayjs(); // 초기값, 오늘 날짜
  const [date, setDate] = useState<dayjs.Dayjs>(today); // 선택한 날짜
  const [inputDate, setInputDate] = useState<dayjs.Dayjs>(date);

  dayjs.locale('ko');

  useEffect(() => {
    setInputDate(date);
  }, [date]);

  // 현재 날짜의 월 추출
  const getCurrentMonth = () => {
    return date.month() + 1;
  };

  return (
    <DateContext.Provider
      value={{
        today,
        date,
        setDate,
        inputDate,
        setInputDate,
        getCurrentMonth,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}

export const useDate = (): DateContextProps => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('DateContext error');
  }
  return context;
};
