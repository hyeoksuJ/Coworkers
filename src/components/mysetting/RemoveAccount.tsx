import SecessionIcon from 'public/icons/secession.svg';
import { Modal } from '@components/@shared/Modal';
import { useModal } from '@hooks/useModal';
import AlertIcon from 'public/icons/alert.svg';
import Button from '@components/@shared/Button';
import { useUserDelete } from '@hooks/mysetting/useUserDelete';
import { useRouter } from 'next/router';

export default function RemoveAccount() {
  const { isOpen, onOpen, onClose } = useModal();
  const router = useRouter();
  const mutation = useUserDelete();

  const handleUserDelete = async () => {
    try {
      await mutation.mutateAsync();
      onClose();
      localStorage.removeItem('userStorage');
      router.push('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center gap-2"
      >
        <SecessionIcon className="ml-6" />
        <span className="text-lg-medium text-status-danger">회원 탈퇴하기</span>
      </button>

      <Modal
        isOpen={isOpen}
        isXButton={false}
        onClose={onClose}
        array="column"
        padding="default"
        bgColor="primary"
        fontSize="16"
        fontArray="center"
        gap="40"
      >
        <Modal.Wrapper array="column">
          <Modal.Header fontColor="primary">
            <div className="flex flex-col items-center justify-center gap-4">
              <AlertIcon />
              <span className="mb-2 text-lg-medium text-text-primary">
                회원 탈퇴를 진행하시겠어요?
              </span>
            </div>
          </Modal.Header>
          <Modal.Content fontColor="secondary" fontSize="14" fontArray="left">
            <div className="flex flex-col items-center justify-center text-md-medium text-text-secondary">
              <p>그룹장으로 있는 그룹은 자동으로 삭제되고,</p>
              <p>모든 그룹에서 나가집니다.</p>
            </div>
          </Modal.Content>
        </Modal.Wrapper>
        <Modal.Footer>
          <div className="flex items-center justify-center gap-2">
            <Button
              bgColor="white"
              fontColor="gray"
              fontSize="16"
              width={136}
              height={48}
              border="gray"
              onClick={onClose}
            >
              닫기
            </Button>
            <Button
              bgColor="red"
              width={136}
              height={48}
              onClick={handleUserDelete}
              className="bg-amber-400 text-red-50"
            >
              회원 탈퇴
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
