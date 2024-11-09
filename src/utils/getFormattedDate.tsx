import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { toKSTISOString } from './toKSTISOString';

// 한국어 로케일
dayjs.locale('ko');

// KST 날짜를 dayjs 객체로 변환하는 공통 함수
const getKSTDate = (date: dayjs.Dayjs | string): dayjs.Dayjs => {
  const kstISOString = toKSTISOString(date);
  return dayjs(kstISOString);
};

export const formatTaskListDate = (date: dayjs.Dayjs | string): string => {
  const kstDate = getKSTDate(date);
  return kstDate.format('M월 D일 (ddd)');
};

export const formatTaskCardDate = (date: dayjs.Dayjs | string): string => {
  const kstDate = getKSTDate(date);
  return kstDate.format('YYYY년 MM월 DD일');
};

export const formatTaskWriterDate = (date: dayjs.Dayjs | string): string => {
  const kstDate = getKSTDate(date);
  return kstDate.format('YYYY.MM.DD');
};
