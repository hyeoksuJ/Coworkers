import { useState } from 'react';
import Button from '@components/@shared/Button';

const daysOfWeek = [
  { label: '일', value: 0 },
  { label: '월', value: 1 },
  { label: '화', value: 2 },
  { label: '수', value: 3 },
  { label: '목', value: 4 },
  { label: '금', value: 5 },
  { label: '토', value: 6 },
];
interface WeeklySelectorProps {
  onChange: (selectedWeeklyDays: number[]) => void;
}

export default function WeeklySelector({ onChange }: WeeklySelectorProps) {
  const [selectedWeeklyDays, setSelectedWeeklyDays] = useState<number[]>([]);

  const handleDayToggle = (dayValue: number) => {
    const newSelectedWeeklyDays = selectedWeeklyDays.includes(dayValue)
      ? selectedWeeklyDays.filter((d) => d !== dayValue) // 선택 해제
      : [...selectedWeeklyDays, dayValue]; // 선택 추가

    setSelectedWeeklyDays(newSelectedWeeklyDays);
    onChange(newSelectedWeeklyDays);
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-3 text-text-primary">주 설정</h2>
      <div className="flex gap-1 ">
        {daysOfWeek.map(({ label, value }) => (
          <Button
            type="button"
            fontColor="gray"
            shape="square"
            key={value}
            onClick={() => handleDayToggle(value)}
            className={`text-md-medium ${selectedWeeklyDays.includes(value) ? 'bg-blue-500 text-white' : 'bg-background-primary'}`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
