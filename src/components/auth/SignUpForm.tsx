import { postSignIn, postSignUp } from '@/src/api/auth/authAPI';
import { useUserStore } from '@/src/stores/useUserStore';
import Button from '@components/@shared/Button';
import { IconInput, Input } from '@components/@shared/Input';
import NonVisibleIcon from '@icons/visibility_off.svg';
import VisibleIcon from '@icons/visibility_on.svg';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUpForm() {
  const router = useRouter();
  const { setTokens, updateUser } = useUserStore();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('이메일은 필수 입력입니다.');
    } else if (email.length > 50) {
      setEmailError('이메일은 50자 이내로 작성해 주세요.');
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 형식으로 작성해 주세요.');
    } else {
      setEmailError('');
    }
  };

  // 이름 유효성 검사 함수
  const validateNickname = () => {
    if (!nickname) {
      setNicknameError('이름은 필수 입력입니다.');
    } else if (nickname.length > 10) {
      setNicknameError('이름은 10글자 이내로 작성해 주세요.');
    } else {
      setNicknameError('');
    }
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
    if (!password) {
      setPasswordError('비밀번호는 필수 입력입니다.');
    } else if (password.length < 8) {
      setPasswordError('비밀번호는 최소 8자 이상입니다.');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 숫자, 영문, 특수문자가 포함되어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 비밀번호 확인 유효성 검사 함수
  const validatePasswordConfirmation = () => {
    if (!passwordConfirmation) {
      setPasswordConfirmationError('비밀번호 확인을 입력해주세요.');
    } else if (passwordConfirmation !== password) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmationError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (email) {
      setEmailError('');
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (nickname) {
      setNicknameError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (password) {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
    if (passwordConfirmation) {
      setPasswordConfirmationError('');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  // 로그인 mutation
  const signInMutation = useMutation({
    mutationFn: async () => {
      const signInResponse = await postSignIn(email, password);
      return signInResponse; // 로그인 응답 반환
    },
    onSuccess: (data) => {
      // 로그인 성공 시 토큰 저장 및 사용자 정보 업데이트
      const { accessToken, refreshToken, user } = data;
      setTokens(accessToken, refreshToken);
      updateUser(user);
      router.push('/myteam');
    },
    onError: (error) => {
      console.error('로그인 중 에러 발생:', error);
    },
  });

  // 회원가입 mutation
  const signUpMutation = useMutation({
    mutationFn: async () => {
      await postSignUp(email, nickname, password, passwordConfirmation);
    },
    onSuccess: () => {
      // 회원가입 성공 시 로그인 시도
      signInMutation.mutate();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === '이미 사용중인 이메일입니다.') {
          setEmailError('이미 사용중인 이메일입니다.');
        }
        if (error.response?.data.message === '이미 사용중인 닉네임입니다.') {
          setNicknameError('이미 사용중인 이름입니다.');
        }
        console.error('회원가입 중 에러 발생:', error);
      }
    },
  });

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    validateEmail();
    validateNickname();
    validatePassword();
    validatePasswordConfirmation();

    if (
      emailError ||
      nicknameError ||
      passwordError ||
      passwordConfirmationError
    )
      return;

    signUpMutation.mutate(); // 회원가입 API 호출
  };

  return (
    <div className="mt-6 flex w-[343px] flex-col gap-10 md:mt-[100px] md:w-[460px]">
      <form className="flex w-full flex-col gap-6">
        <h1 className="flex w-full justify-center text-2xl-medium text-text-primary md:mb-[80px] xl:text-4xl">
          회원가입
        </h1>
        <Input
          label="이름"
          placeholder="이름을 입력해주세요."
          isError={!!nicknameError}
          errorMessage={nicknameError}
          inputProps={{
            value: nickname,
            onChange: handleNicknameChange,
            onBlur: validateNickname,
          }}
        />
        <Input
          label="이메일"
          placeholder="이메일을 입력해주세요."
          isError={!!emailError}
          errorMessage={emailError}
          inputProps={{
            value: email,
            onChange: handleEmailChange,
            onBlur: validateEmail,
          }}
        />
        <IconInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          isError={!!passwordError}
          errorMessage={passwordError}
          inputProps={{
            type: isPasswordVisible ? 'text' : 'password',
            value: password,
            onChange: handlePasswordChange,
            onBlur: validatePassword,
          }}
          actionIcon={
            isPasswordVisible ? (
              <VisibleIcon onClick={togglePasswordVisibility} />
            ) : (
              <NonVisibleIcon onClick={togglePasswordVisibility} />
            )
          }
        />
        <IconInput
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          isError={!!passwordConfirmationError}
          errorMessage={passwordConfirmationError}
          inputProps={{
            type: isConfirmPasswordVisible ? 'text' : 'password',
            value: passwordConfirmation,
            onChange: handlePasswordConfirmationChange,
            onBlur: validatePasswordConfirmation,
          }}
          actionIcon={
            isConfirmPasswordVisible ? (
              <VisibleIcon onClick={toggleConfirmPasswordVisibility} />
            ) : (
              <NonVisibleIcon onClick={toggleConfirmPasswordVisibility} />
            )
          }
        />
      </form>
      <Button size="full" onClick={handleSubmit}>
        회원가입
      </Button>
    </div>
  );
}
