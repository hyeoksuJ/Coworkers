import { postSendResetPasswordEmail, postSignIn } from '@/src/api/auth/authAPI';
import { useUserStore } from '@/src/stores/useUserStore';
import Button from '@components/@shared/Button';
import { IconInput, Input } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import { useModal } from '@hooks/useModal';
import NonVisibleIcon from '@icons/visibility_off.svg';
import VisibleIcon from '@icons/visibility_on.svg';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function SignInForm() {
  const router = useRouter();
  const { setTokens, updateUser } = useUserStore();
  const { isOpen, onOpen, onClose } = useModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [modalEmail, setModalEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalError, setModalError] = useState('');
  const [emailSentMessageVisible, setEmailSentMessageVisible] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('이메일은 필수 입력입니다.');
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 형식으로 작성해 주세요.');
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = () => {
    if (!password) {
      setPasswordError('비밀번호는 필수 입력입니다.');
    } else {
      setPasswordError('');
    }
  };

  // 모달 이메일 유효성 검사 함수
  const validateModalEmail = () => {
    if (!modalEmail) {
      setModalError('이메일을 입력해주세요.');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (email) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (password) {
      setPasswordError('');
    }
  };

  const handleModalEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalEmail(e.target.value);
    if (modalEmail) {
      setModalError('');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleCloseClick = () => {
    setModalEmail('');
    setModalMessage('');
    setModalError('');
    onClose();
  };

  // 로그인 Mutation
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
      console.error('로그인 중 에러 발생', error);
      setEmailError('이메일 혹은 비밀번호를 확인해주세요.');
      setPasswordError('이메일 혹은 비밀번호를 확인해주세요.');
    },
  });

  // 비밀번호 재설정 이메일 전송 Mutation
  const sendResetPasswordEmailMutation = useMutation({
    mutationFn: async () => {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
      const sendResetPasswordEmailResponse = await postSendResetPasswordEmail(
        modalEmail,
        redirectUrl
      );
      return sendResetPasswordEmailResponse; // 비밀번호 재설정 이메일 전송 응답 반환
    },
    onSuccess: (data) => {
      // 이메일 전송 성공 시 모달에 안내 메시지 생성 및 로딩 중지
      console.log(data);
      setModalMessage(data.message);
      setEmailSentMessageVisible(true);
      setEmailLoading(false);
    },
    onError: (error) => {
      console.error('비밀번호 재설정 이메일 전송 에러:', error);
      setModalError('잘못된 이메일입니다.');
      setEmailLoading(false);
    },
  });

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (emailError || passwordError) return;

    signInMutation.mutate(); // 로그인 API 호출
  };

  // 이메일로 비밀번호 재설정 링크 보내기
  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalError) {
      setEmailLoading(true);
      sendResetPasswordEmailMutation.mutate(); // 비밀번호 재설정 이메일 전송 API 호출
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="mt-12 flex w-[343px] flex-col gap-10 md:mt-[100px] md:w-[460px]">
        <div className="flex flex-col gap-3">
          <form className="flex w-full flex-col gap-6">
            <h1 className="flex w-full justify-center text-2xl-semibold text-brand-primary md:mb-[80px] md:text-2xl-medium md:text-text-primary xl:text-4xl">
              로그인
            </h1>
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
          </form>
          <button
            className="text-right text-[14px] font-medium leading-6 text-interaction-focus underline md:text-[16px]"
            type="button"
            onClick={onOpen}
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>
        <Button size="full" onClick={handleSubmit}>
          로그인
        </Button>
      </div>
      <div className="flex items-center gap-3 text-md-medium md:text-lg-medium">
        <span className="text-text-primary">아직 계정이 없으신가요?</span>
        <Link href="/signup" className="text-interaction-focus underline">
          가입하기
        </Link>
      </div>
      <Modal
        isOpen={isOpen}
        array="column"
        padding="default"
        bgColor="secondary"
        fontSize="16"
        fontArray="center"
        gap="24"
      >
        <Modal.Wrapper>
          <Modal.Header fontColor="primary">비밀번호 재설정</Modal.Header>
          <Modal.Content
            className="items-center gap-4"
            array="column"
            fontColor="secondary"
            fontSize="14"
          >
            <p className="mt-2">비밀번호 재설정 링크를 보내드립니다.</p>
            <form className="w-[280px]">
              <Input
                placeholder="이메일을 입력하세요."
                isError={!!modalError}
                errorMessage={modalError}
                inputProps={{
                  value: modalEmail,
                  onChange: handleModalEmailChange,
                  onBlur: validateModalEmail,
                }}
              />
            </form>
            {emailSentMessageVisible && (
              <div
                className="flex w-[280px] flex-col items-center justify-center text-brand-primary"
                onClick={handleCloseClick}
              >
                <p>{modalMessage}</p>
              </div>
            )}
          </Modal.Content>
        </Modal.Wrapper>
        <Modal.Footer className="justify-center" array="row">
          <div className="flex w-[280px] gap-2">
            <Button
              onClick={handleCloseClick}
              bgColor="white"
              fontColor="green"
              border="green"
            >
              닫기
            </Button>
            <Button onClick={handleSubmitEmail} disabled={emailLoading}>
              링크 보내기
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
