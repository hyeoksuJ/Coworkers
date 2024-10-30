import { useUserStore } from '@/src/stores/useUserStore';
import Button from '@components/@shared/Button';
import { Input } from '@components/@shared/Input';
import { authAxiosInstance } from '@libs/axios/axiosInstance';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SocialSignUpForm() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  // 이름 유효성 검사 함수
  const validateNickname = () => {
    if (!nickname) {
      setNicknameError('이름은 필수 입력입니다.');
    } else if (nickname.length > 10) {
      setNicknameError('이름은 최대 10자까지 가능합니다.');
    } else {
      setNicknameError('');
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (nickname) {
      setNicknameError('');
    }
  };

  const patchNickname = async (newNickname: string) => {
    const response = await authAxiosInstance.patch('user', {
      nickname: newNickname,
    });

    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateNickname();

    if (nicknameError) return;

    try {
      const response = await patchNickname(nickname);
      if (response) {
        // 현재 상태에서 사용자 정보 가져오기
        const { user, updateUser } = useUserStore.getState();

        // 기존 사용자 정보에 닉네임 업데이트
        if (user) {
          updateUser({ ...user, nickname });
          router.push('/myteam');
        }
      }
    } catch (error) {
      console.error('닉네임 업데이트 에러:', error);
    }
  };

  return (
    <div className="my-6 flex w-[343px] flex-col gap-10 md:my-[100px] md:w-[460px]">
      <form className="flex w-full flex-col gap-6">
        <h1 className="flex w-full justify-center text-2xl-medium text-text-primary md:mb-[80px] xl:text-4xl">
          간편 회원가입
        </h1>
        <Input
          label="이름"
          placeholder="사용하실 이름을 입력해주세요."
          isError={!!nicknameError}
          errorMessage={nicknameError}
          inputProps={{
            value: nickname,
            onChange: handleNicknameChange,
            onBlur: validateNickname,
          }}
        />
      </form>
      <Button size="full" onClick={handleSubmit}>
        간편 회원가입
      </Button>
    </div>
  );
}
