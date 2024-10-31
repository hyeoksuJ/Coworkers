import { getMemberships } from '@/src/api/team/memberAPI';
import Button from '@components/@shared/Button';
import LoadingSpinner from '@components/@shared/LoadingSpinner';
import EmptyTeamPage from '@components/team/myteam/EmptyTeamPage';
import TeamBox from '@components/team/myteam/TeamBox';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface Group {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  // 다른 필요한 필드가 있다면 여기에 추가할 수 있습니다.
}

export interface Membership {
  group: Group;
  groupId: number;
  role: string;
  userEmail: string;
  userId: number;
  userImage: string | null;
  userName: string;
}

export default function MyTeamPage() {
  const {
    data: memberships,
    isLoading,
    isError,
  } = useQuery<Membership[]>({
    queryKey: ['memberships'],
    queryFn: () => getMemberships(),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading data</div>;

  return memberships && memberships.length !== 0 ? (
    <main className="mx-auto mb-[30px] mt-[20px] flex w-full min-w-[340px] flex-col px-[20px] xl:w-[1200px] xl:px-0">
      <div className="mb-[10px] flex items-center justify-between md:mb-[30px]">
        <p className="text-xl-bold">참여중인 팀 목록</p>
        <Link href="/addteam/participate">
          <Button
            width={136}
            height={48}
            bgColor="transparent"
            border="none"
            fontColor="green"
            fontSize="14"
          >
            + 새로운 팀 참여하기
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 grid-rows-[100px] place-items-center gap-[15px] xl:grid-cols-3">
        {memberships.map((membership) => (
          <TeamBox
            key={membership.group.id}
            groupId={membership.group.id}
            teamName={membership.group.name}
            image={membership.group.image}
            updatedAt={membership.group.updatedAt}
          />
        ))}

        <Link
          className="h-[80px] w-full rounded-[16px] border border-[#ffffff61] md:h-[100px]"
          href="/addteam"
        >
          <Button
            size="full"
            style={{ height: '100%' }}
            fontSize="14"
            bgColor="transparent"
            border="none"
          >
            + 새로운 팀 생성하기
          </Button>
        </Link>
      </div>
      <div className="relative mx-auto flex h-auto w-full flex-grow px-[10px] pt-[100px] md:px-[100px] xl:block xl:h-[255px] xl:w-[1100px] xl:pt-[150px]">
        <img
          src="/images/team_none.png"
          alt="빈 공간 채우는 이미지"
          className="opacity-50 "
        />
      </div>
    </main>
  ) : (
    <EmptyTeamPage />
  );
}
