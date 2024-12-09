import { ReactNode } from 'react';
import Dropdown, { Option } from './Dropdown';

interface BasicDropdownProps {
  options: Option[];
  triggerIcon: ReactNode;
  onSelect: (option: Option) => void;
}

export default function BasicDropdown({
  options,
  triggerIcon,
  onSelect,
}: BasicDropdownProps) {
  return (
    <Dropdown
      options={options}
      triggerIcon={triggerIcon}
      optionsWrapClass="mt-2 right-0 shadow-[0_2px_10px_rgba(0,0,0,0.5)] rounded-[12px] border border-background-tertiary"
      optionClass="rounded-[12px] md:w-[135px] md:h-[47px] w-[120px] h-[40px] justify-center text-md-regular md:text-lg-regular text-center hover:bg-background-tertiary"
      onSelect={onSelect}
    />
  );
}
