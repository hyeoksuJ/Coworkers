import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

// 한국어 로케일
dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);

export const toKSTISOString = (date: dayjs.Dayjs | string): string => {
  const dayjsDate = typeof date === 'string' ? dayjs(date) : date;
  return dayjs(dayjsDate).tz('Asia/Seoul').format();
};
