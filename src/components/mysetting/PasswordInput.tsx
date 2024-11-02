import { IconInput, Input } from '@components/@shared/Input';
import { useEffect, useState } from 'react';
import { usePasswordCheck } from '@hooks/mysetting/usePasswordCheck';
import PasswordChange from './PasswordChange';
import { useUserData } from '@hooks/mysetting/useUserData';

export default function PasswordInput() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data } = useUserData();
  const mutation = usePasswordCheck();

  const handleSubmit = async (): Promise<number> => {
    try {
      await mutation.mutateAsync({ email, password });
      return 200;
    } catch {
      return 400;
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  useEffect(() => {
    if (data) {
      setEmail(data.email);
    }
  });

  return (
    <>
      <Input
        label="이메일"
        placeholder="이메일을 입력해주세요"
        inputProps={{
          value: email,
          onChange: handleEmailChange,
        }}
      />

      <IconInput
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        actionIcon={<PasswordChange onSubmit={handleSubmit} />}
        inputProps={{
          value: password,
          onChange: handlePasswordChange,
          type: 'password',
        }}
      />
    </>
  );
}
