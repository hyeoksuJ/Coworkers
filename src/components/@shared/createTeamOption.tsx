// utils/teamOptions.ts
import { Option } from '@components/@shared/Dropdown';
import { Membership } from '@/src/types/mysetting/settingData';
import Image from 'next/image';
import Button from './Button';

// 팀 멤버쉽을 Option 타입으로 변환하는 함수
export const createTeamOption = (
  membership: Membership,
  onSelect: (groupId: number) => void
): Option => ({
  label: membership.group.name || '',
  id: membership.group.id,
  component: (
    <div
      className="flex items-center justify-between overflow-hidden"
      onClick={() => onSelect(membership.groupId)}
    >
      <div className="flex items-center justify-between gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="v relative h-[30px] w-[30px] shrink-0">
          <Image
            src={membership.group.image}
            alt="팀 이미지"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {membership.group.name}
        </p>
      </div>
    </div>
  ),
});

// 기본 메뉴 옵션 생성 함수
export const createMenuOption = (): Option => ({
  label: '팀 메뉴',
  component: (
    <Button bgColor="transparent" border="green" size="full" height={40}>
      + 팀 추가하기
    </Button>
  ),
});
