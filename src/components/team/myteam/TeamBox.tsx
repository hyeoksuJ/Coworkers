import getTimeAgo from '@utils/getTimeAgo';
import Link from 'next/link';
import SlideItemsMotion from '@components/@shared/animation/SlideItemsMotion';

interface TeamBoxProps {
  teamName: string;
  image: string;
  groupId: number;
  updatedAt: string;
  index: number;
}

export default function TeamBox({
  teamName,
  image,
  groupId,
  updatedAt,
  index,
}: TeamBoxProps) {
  const lastActiveAt = getTimeAgo(updatedAt);

  return (
    <ul className="w-full">
      <Link href={`/${groupId}`}>
        <SlideItemsMotion
          index={index}
          className="flex w-full gap-[10px] rounded-[12px] bg-background-secondary px-6 py-[20px] hover:brightness-110 md:grid-cols-[100px_1fr] md:gap-[20px] md:p-[20px] md:px-3 "
        >
          <img
            src={image}
            alt="팀 프로필 이미지"
            className="h-[40px] w-[40px] rounded-[12px] object-cover md:h-[64px] md:w-[64px]"
          />
          <div className="flex flex-col justify-between overflow-hidden md:my-[5px]">
            <p className="mr-[10px] overflow-hidden text-ellipsis whitespace-nowrap text-md-bold md:text-lg-bold">
              {teamName}
            </p>
            <p className="text-[11px] text-text-secondary md:text-xs-regular">
              최근 활동 : {lastActiveAt}
            </p>
          </div>
        </SlideItemsMotion>
      </Link>
    </ul>
  );
}
