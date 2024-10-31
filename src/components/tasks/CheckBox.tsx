import { useEffect, useState } from 'react';

import ActiveCheckBoxIcon from '@icons/checkbox_active.svg';
import InActiveCheckBoxIcon from '@icons/checkbox_inactive.svg';
import { useTaskListStore } from '@/src/stores/taskListStore';

interface CheckBoxProps {
  taskId: number;
  doneAt: string | null;
}

export default function CheckBox({ taskId, doneAt }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(doneAt !== null);
  const { setTaskCompletionStatus } = useTaskListStore();

  const handleClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    const updatedDoneAt = newCheckedState ? new Date().toISOString() : null;
    setTaskCompletionStatus(taskId, updatedDoneAt);
  };

  // doneAt 값이 변경될 때마다 체크 상태 업데이트
  useEffect(() => {
    setIsChecked(doneAt !== null);
  }, [doneAt]);

  return (
    <button type="button" onClick={handleClick}>
      {isChecked ? <ActiveCheckBoxIcon /> : <InActiveCheckBoxIcon />}
    </button>
  );
}
