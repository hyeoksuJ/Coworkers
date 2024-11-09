import BasicDropdown from '@components/@shared/BasicDropdown';
import { ReactNode } from 'react';
import { Option } from '../../@shared/Dropdown';

export const editOption = [
  { label: 'edit', component: <div>수정하기</div> },
  { label: 'deleteTask', component: <div>선택 삭제하기</div> },
  { label: 'deleteRecurring', component: <div>일괄 삭제하기</div> },
];

interface TaskEditDropdownProps {
  triggerIcon: ReactNode;
  onSelect: (option: Option) => void;
}

export default function TaskEditDropdown({
  triggerIcon,
  onSelect,
}: TaskEditDropdownProps) {
  return (
    <BasicDropdown
      options={editOption}
      triggerIcon={triggerIcon}
      onSelect={onSelect}
    />
  );
}
