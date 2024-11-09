import Button from '@components/@shared/Button';
import { IconInput } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import NetworkError from '@components/@shared/NetworkError';
import { usePasswordChange } from '@hooks/mysetting/usePasswordChange';
import { useModal } from '@hooks/useModal';
import { useState } from 'react';

interface PasswordChangeProps {
  onSubmit: () => Promise<number>; // onSubmit 프롭 추가
}

export default function PasswordChange({ onSubmit }: PasswordChangeProps) {
  const {
    isOpen: isSuccessModalopen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModlal,
  } = useModal();
  const {
    isOpen: isErrorModalopen,
    onOpen: openErrorModal,
    onClose: closeErrorModlal,
  } = useModal();
  const {
    isOpen: iscompleteChangeopen,
    onOpen: opencompleteChange,
    onClose: closecompleteChange,
  } = useModal();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const mutation = usePasswordChange();

  const handelSubmit = () => {
    mutation.mutate({ passwordConfirmation, password });
    closeSuccessModlal();
    opencompleteChange();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handlePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setPasswordConfirmation(value);
  };

  const handleSubmit = async () => {
    try {
      const statusCode = await onSubmit(); // onSubmit 호출 후 상태 코드 확인

      if (statusCode === 200) {
        openSuccessModal(); // 상태 코드가 200일 때 모달 열기
      } else if (statusCode === 400) {
        openErrorModal(); // 400 에러 처리
      }
    } catch {
      <NetworkError />;
    }
  };
  return (
    <>
      <Button onClick={handleSubmit} fontSize="14" width={70} height={20}>
        변경하기
      </Button>

      <Modal
        isOpen={isSuccessModalopen}
        isXButton={false}
        onClose={closeSuccessModlal}
        array="column"
        padding="default"
        bgColor="primary"
        fontSize="16"
        fontArray="center"
        gap="40"
      >
        <Modal.Wrapper array="column">
          <Modal.Header fontColor="primary">
            <header className="mb-4 text-lg-medium text-text-primary">
              비밀번호 변경하기
            </header>
          </Modal.Header>
          <Modal.Content fontColor="secondary" fontSize="14" fontArray="left">
            <div className="flex flex-col gap-4">
              <IconInput
                label="새 비밀번호"
                placeholder="비밀번호를 입력해주세요"
                inputProps={{
                  value: password,
                  onChange: handlePasswordChange,
                }}
              />
              <IconInput
                label="새 비밀번호 확인"
                placeholder="비밀번호를 입력해주세요"
                inputProps={{
                  value: passwordConfirmation,
                  onChange: handlePasswordConfirmation,
                }}
              />
            </div>
          </Modal.Content>
        </Modal.Wrapper>
        <Modal.Footer>
          {/* 공통 버튼 적용 전 */}
          <div className="flex items-center justify-center gap-2">
            <Button
              bgColor="white"
              fontColor="green"
              fontSize="16"
              width={136}
              height={48}
              border="gray"
              onClick={closeSuccessModlal}
            >
              닫기
            </Button>
            <Button
              bgColor="green"
              fontColor="white"
              width={136}
              height={48}
              onClick={handelSubmit}
              className="bg-amber-400 text-red-50"
            >
              변경하기
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        isOpen={isErrorModalopen}
        isXButton={false}
        onClose={closeErrorModlal}
        array="column"
        padding="default"
        bgColor="primary"
        fontSize="16"
        fontArray="center"
        gap="40"
      >
        <Modal.Wrapper array="column">
          <Modal.Header fontColor="primary">
            <header className="mb-1 text-lg-medium text-text-primary">
              비밀번호가 일치하지 않습니다.
            </header>
          </Modal.Header>
        </Modal.Wrapper>
        <Modal.Footer>
          <Button
            bgColor="red"
            fontColor="white"
            fontSize="16"
            width={110}
            height={40}
            border="none"
            onClick={closeErrorModlal}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 비밀번호 변경 완료 모달 */}
      <Modal
        isOpen={iscompleteChangeopen}
        isXButton={false}
        onClose={closecompleteChange}
        array="column"
        padding="default"
        bgColor="primary"
        fontSize="16"
        fontArray="center"
        gap="40"
      >
        <Modal.Wrapper array="column">
          <Modal.Header fontColor="primary">
            <header className="mb-1 text-lg-medium text-text-primary">
              비밀번호가 변경되었습니다.
            </header>
          </Modal.Header>
        </Modal.Wrapper>
        <Modal.Footer>
          <Button
            bgColor="green"
            fontColor="white"
            fontSize="16"
            width={110}
            height={40}
            border="gray"
            onClick={closecompleteChange}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
