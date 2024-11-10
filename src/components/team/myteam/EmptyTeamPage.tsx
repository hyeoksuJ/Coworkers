import Button from '@components/@shared/Button';
import Link from 'next/link';

export default function EmptyTeamPage() {
  return (
    <main className="mx-auto mt-[100px] flex h-auto w-full min-w-[300px] flex-col items-center px-[31px] text-center text-md-medium text-text-default md:px-[112px] xl:w-[1200px] xl:text-lg-medium">
      <div className="relative mx-auto flex h-auto w-full flex-grow xl:block xl:h-[255px] xl:w-[810px]">
        <img
          src="/images/team_none_tb.png"
          alt="PC 팀 소속 없는 이미지"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <p className="mt-[70px] xl:mt-[120px]">아직 소속된 팀이 없습니다.</p>
      <p className="mt-[4px]">팀을 생성하거나 팀에 참여해보세요.</p>
      <Link href="/addteam">
        <Button width={136} height={48} fontSize="14" className="mt-[48px]">
          팀 생성하기
        </Button>
      </Link>
      <Link href="/addteam/participate">
        <Button
          width={136}
          height={48}
          bgColor="transparent"
          border="green"
          fontColor="green"
          fontSize="14"
          className="mt-[8px]"
        >
          팀 참여하기
        </Button>
      </Link>
    </main>
  );
}
