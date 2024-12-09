import { postAcceptInvitation } from '@/src/api/addteam/participateTeamAPI';
import Button from '@components/@shared/Button';
import { Input } from '@components/@shared/Input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ParticipateTeamForm() {
  const router = useRouter();
  const [teamLink, setTeamLink] = useState('');
  const [linkError, setLinkError] = useState('');

  const validateLink = () => {
    if (!teamLink) {
      setLinkError('팀 링크를 입력해주세요.');
      return false;
    }
    setLinkError('');
    return true;
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamLink(e.target.value);
    if (teamLink) {
      setLinkError('');
    }
  };

  // 팀 참여 Mutation
  const { mutate: participateTeam } = useMutation({
    mutationFn: ({ userEmail, token }: { userEmail: string; token: string }) =>
      postAcceptInvitation(userEmail, token),
    onSuccess: (data) => {
      const teamId = data.groupId; // 팀 ID
      setTeamLink('');
      console.log(`참여한 팀 아이디: ${teamId}`);
      // 팀 참여 후 해당 팀 페이지로 리디렉트
      if (teamId) {
        router.push(`/${teamId}`);
      }
    },
    onError: (error) => {
      console.error('팀 참여 실패:', error);
      setLinkError('유효하지 않은 초대입니다.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isLinkValid = validateLink();

    if (!isLinkValid) return;

    const userStorage = localStorage.getItem('userStorage');
    if (userStorage) {
      const parsedData = JSON.parse(userStorage);
      const { email } = parsedData.state.user;
      if (email && teamLink) {
        participateTeam({ userEmail: email, token: teamLink }); // 팀 참여하기 시작
      }
    }
  };

  return (
    <form className="flex w-[343px] flex-col gap-10 md:w-[460px]">
      <div className="flex w-[343px] flex-col items-center gap-6 md:w-[460px] md:gap-[80px]">
        <Input
          label="팀 링크"
          placeholder="팀 링크를 입력해주세요."
          isError={!!linkError}
          errorMessage={linkError}
          inputProps={{
            value: teamLink,
            onChange: handleLinkChange,
          }}
        />
      </div>
      <Button size="full" onClick={handleSubmit}>
        참여하기
      </Button>
    </form>
  );
}
