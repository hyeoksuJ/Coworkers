import { postImage } from '@/src/api/imageAPI';
import { fetchUserData } from '@/src/api/mysetting/inputAPI';
import { postGroupById } from '@/src/api/team/teamAPI';
import Button from '@components/@shared/Button';
import { Input } from '@components/@shared/Input';
import ProfileImageInput from '@components/@shared/ProfileImageInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Group {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

interface Membership {
  group: Group;
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface UserData {
  teamId: string;
  image: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: Membership[];
}

export default function AddTeamForm() {
  const router = useRouter();
  const { data: userData } = useQuery<UserData>({
    queryKey: ['user'],
    queryFn: fetchUserData,
  });
  const [teamName, setTeamName] = useState('');
  const [teamProfileFile, setTeamProfileFile] = useState<File | null>(null);
  const [nameError, setNameError] = useState('');
  const [profileError, setProfileError] = useState('');

  // 팀 이름 유효성 검사
  const validateName = () => {
    // 팀 이름이 비어있는지 확인
    if (!teamName) {
      setNameError('팀 이름을 입력해주세요.');
      return false;
    }

    // 팀 이름은 30자 이내로
    if (teamName.length > 30) {
      setNameError('팀 이름은 30자 이내로 작성해주세요.');
      return false;
    }

    // 유저가 속해있는 모든 그룹 이름 중복 체크
    const allGroupNames =
      userData?.memberships.map(
        (membership: Membership) => membership.group.name
      ) || [];

    if (allGroupNames.includes(teamName)) {
      setNameError('이미 존재하는 이름입니다.');
      return false;
    }

    // 에러가 없을 경우
    setNameError('');
    return true;
  };

  // 팀 프로필 유효성 검사
  const validateProfile = () => {
    // 팀 프로필이 비어있는지 확인
    if (!teamProfileFile) {
      setProfileError('팀 프로필 이미지를 넣어주세요.');
      return false;
    }

    // 에러가 없을 경우
    setProfileError('');
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    // 에러 메시지가 있을 때 이름을 입력하면 에러 메시지 사라지도록
    if (teamName) {
      setNameError('');
    }
  };

  const handleFileChange = (file: File | null) => {
    setTeamProfileFile(file);
    // 에러 메시지가 있을 때 파일을 업로드 했을 때 에러 메시지 사라지도록
    if (file) {
      setProfileError('');
    }
  };

  // 팀 생성 Mutation
  const { mutate: addTeam } = useMutation({
    mutationFn: ({ image, name }: { image: string; name: string }) =>
      postGroupById(image, name),
    onSuccess: (data) => {
      const teamId = data.id; // 팀 ID
      setTeamName('');
      setTeamProfileFile(null);
      console.log(`${teamName}팀(아이디: ${teamId})이 생성되었습니다.`);
      // 팀 생성 후 해당 팀 페이지로 리디렉트
      if (teamId) {
        router.push(`/${teamId}`);
      }
    },
    onError: (error) => {
      console.error('팀 생성 실패:', error);
    },
  });

  // 이미지 업로드 Mutation
  const uploadImageMutate = useMutation({
    mutationFn: (file: File) => postImage(file),
    onSuccess: (imageUrl: string) => {
      // 이미지 URL을 성공적으로 받으면 팀 생성 요청
      addTeam({ image: imageUrl, name: teamName });
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNameValid = validateName();
    const isProfileValid = validateProfile();

    // 유효성 검사 통과하지 못하면 리턴
    if (!isNameValid || !isProfileValid) return;

    if (teamProfileFile && teamName) {
      uploadImageMutate.mutate(teamProfileFile); // 이미지 업로드 시작
    }
  };

  return (
    <form className="flex w-[343px] flex-col gap-10 md:w-[460px]">
      <div className="flex w-[343px] flex-col items-center gap-6 md:w-[460px] md:gap-[80px]">
        <div className="flex w-full flex-col gap-6">
          <div>
            <div className="mb-3 text-lg-medium">팀 프로필</div>
            <ProfileImageInput onFileChange={handleFileChange} />
            {profileError && (
              <p className="mt-[10px] text-md-medium text-status-danger">
                {profileError}
              </p>
            )}
          </div>
          <Input
            label="팀 이름"
            placeholder="팀 이름을 입력해주세요."
            isError={!!nameError}
            errorMessage={nameError}
            inputProps={{
              value: teamName,
              onChange: handleNameChange,
            }}
          />
        </div>
      </div>
      <Button size="full" onClick={handleSubmit}>
        생성하기
      </Button>
    </form>
  );
}
