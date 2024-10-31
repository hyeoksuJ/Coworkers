import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getGroupById } from '@/src/api/team/teamAPI';
import TeamBanner from '@components/team/banner/TeamBanner';
import TaskList from '@components/team/taskList/TaskList';
import Report from '@components/team/Report';
import MemberList from '@components/team/member/MemberList';
import { useTeamStore } from '@/src/stores/teamStore';
import { useEffect } from 'react';
import Button from '@components/@shared/Button';
import LoadingSpinner from '@components/@shared/LoadingSpinner';

export default function TeamPage() {
  const router = useRouter();
  const { teamid } = router.query;

  const teamIdString = Array.isArray(teamid) ? teamid[0] : teamid;
  const { setTeamData } = useTeamStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['group', teamIdString],
    queryFn: () => getGroupById(teamIdString as string),
  });

  useEffect(() => {
    if (data) {
      setTeamData(data);
    }
  }, [data, setTeamData]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading data</div>;

  return (
    <main className="mx-auto mb-[30px] mt-[20px] flex w-full min-w-[340px] flex-col px-[10px] xl:w-[1200px] xl:px-0">
      <TeamBanner />
      <TaskList />
      <Report />
      <MemberList />
      <Button
        className="mx-auto mt-[50px] w-full md:mr-0 md:mt-[100px] md:w-[200px]"
        size="full"
        type="button"
        bgColor="transparent"
        border="green"
        fontColor="green"
        onClick={() => router.push('myteam')}
      >
        팀 목록으로 돌아가기
      </Button>
    </main>
  );
}
