import getTimeAgo from '@utils/getTimeAgo';
import Link from 'next/link';

interface TeamBoxProps {
  teamName: string;
  image: string;
  groupId: number;
  updatedAt: string;
}

export default function TeamBox({
  teamName,
  image,
  groupId,
  updatedAt,
}: TeamBoxProps) {
  const lastActiveAt = getTimeAgo(updatedAt);

  return (
    <div className="w-full">
      <Link href={`/${groupId}`}>
        <div className="flex w-full grid-cols-[100px_1fr] gap-[10px] rounded-[12px] bg-background-tertiary px-[10px] py-[20px] hover:brightness-110 md:gap-[20px] md:p-[20px] ">
          <img
            src={image}
            alt="팀 프로필 이미지"
            className="h-[40px] w-[40px] rounded-[12px] object-cover md:h-[64px] md:w-[64px]"
          />
          <div className="flex flex-col justify-between overflow-hidden md:my-[5px]">
            <p className="mr-[10px] overflow-hidden text-ellipsis whitespace-nowrap text-md-bold md:text-lg-bold">
              {teamName}
            </p>
            <p className="text-[9px] text-text-secondary md:text-xs-regular">
              최근 활동 : {lastActiveAt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
