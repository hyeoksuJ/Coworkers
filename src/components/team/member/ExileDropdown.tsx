import BasicDropdown from '@components/@shared/BasicDropdown';
import Image from 'next/image';

interface ExileDropdownProps {
  onSelect: () => void;
  isSelf?: boolean;
}

export default function ExileDropdown({
  onSelect,
  isSelf = false,
}: ExileDropdownProps) {
  const Option = [
    {
      component: (
        <div className="text-point-rose">
          {isSelf ? '탈퇴하기' : '추방하기'}
        </div>
      ),
    },
  ];

  const moreIcon = (
    <div className="relative flex h-[10px] w-[20px] items-center">
      <Image
        src="/icons/kebab_large.svg"
        alt="더보기 아이콘"
        width={4}
        height={10}
        className="mx-auto"
      />
    </div>
  );

  return (
    <BasicDropdown
      options={Option}
      triggerIcon={moreIcon}
      onSelect={onSelect}
    />
  );
}
