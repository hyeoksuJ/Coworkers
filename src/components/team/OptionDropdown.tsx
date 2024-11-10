import BasicDropdown from '@components/@shared/BasicDropdown';
import { ReactNode } from 'react';
import { Option } from '../@shared/Dropdown';

export const selectOption = [
  { label: 'token', component: <div>링크 복사</div> },
  { label: 'email', component: <div>이메일로 추가</div> },
];

interface OptionDropdownProps {
  triggerIcon: ReactNode;
  onSelect: (option: Option) => void;
}

export default function OptionDropdown({
  triggerIcon,
  onSelect,
}: OptionDropdownProps) {
  return (
    <BasicDropdown
      options={selectOption}
      triggerIcon={triggerIcon}
      onSelect={onSelect}
    />
  );
}
