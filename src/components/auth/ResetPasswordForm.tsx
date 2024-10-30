import { patchResetPassword } from '@/src/api/auth/authAPI';
import Button from '@components/@shared/Button';
import { IconInput } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import { useModal } from '@hooks/useModal';
import NonVisibleIcon from '@icons/visibility_off.svg';
import VisibleIcon from '@icons/visibility_on.svg';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function SignUpForm() {
  const router = useRouter();
  const { token } = router.query;
  const { isOpen, onOpen, onClose } = useModal();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // 비밀번호 유효성 검사 함수
  const validatePassword = () => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (password.length < 8) {
      setPasswordError('비밀번호는 최소 8자 이상입니다.');
    } else if (
      !/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).+$/.test(password)
    ) {
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

  const handlePasswordChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const toggleNewPasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handleModalButtonClick = () => {
    router.push('/signin');
    onClose();
  };

  // 비밀번호 재설정 Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async () => {
      const resetPasswordResponse = await patchResetPassword(
        passwordConfirmation,
        password,
        token
      );
      return resetPasswordResponse; // 비밀번호 재설정 응답
    },
    onSuccess: () => {
      // 비밀번호 재설정 성공 시 알림 모달 열기
      onOpen();
    },
    // 여기에 비밀번호 설정시 에러 모달 넣어야함@@@
  });

  // 받은 링크의 토큰을 가지고 비밀번호 재설정하기
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    validatePassword();
    validatePasswordConfirmation();

    if (passwordError || passwordConfirmationError) return;

    resetPasswordMutation.mutate(); // 비밀번호 재설정 API 호출
  };

  return (
    <div className="my-6 flex w-[343px] flex-col gap-10 md:my-[100px] md:w-[460px]">
      <form className="flex w-full flex-col gap-6">
        <h1 className="flex w-full justify-center text-2xl-medium text-text-primary md:mb-[80px] xl:text-4xl">
          비밀번호 재설정
        </h1>
        <IconInput
          label="새 비밀번호"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          isError={!!passwordError}
          errorMessage={passwordError}
          inputProps={{
            type: isPasswordVisible ? 'text' : 'password',
            value: password,
            onChange: handlePasswordChnage,
            onBlur: validatePassword,
          }}
          actionIcon={
            isPasswordVisible ? (
              <VisibleIcon onClick={toggleNewPasswordVisibility} />
            ) : (
              <NonVisibleIcon onClick={toggleNewPasswordVisibility} />
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
      <Button size="full" onClick={handleResetPassword}>
        재설정
      </Button>
      <Modal
        isOpen={isOpen}
        array="column"
        padding="default"
        bgColor="secondary"
        fontSize="16"
        fontArray="center"
        gap="24"
        className="items-center"
      >
        <Modal.Wrapper className="w-[280px]">
          <Modal.Header fontColor="primary">비밀번호 재설정 완료</Modal.Header>
          <Modal.Content array="column" fontColor="secondary" fontSize="14">
            <p className="mt-2 text-brand-primary">
              변경된 비밀번호로 로그인해주세요!
            </p>
          </Modal.Content>
        </Modal.Wrapper>
        <Modal.Footer>
          <Button onClick={handleModalButtonClick} width={280}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
