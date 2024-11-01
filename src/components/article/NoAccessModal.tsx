import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';

interface NoAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoAccessModal({ isOpen, onClose }: NoAccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={onClose}
      array="column"
      padding="default"
      bgColor="primary"
      fontSize="16"
      fontArray="center"
      gap="40"
    >
      <Modal.Wrapper array="column">
        <Modal.Header fontColor="primary">권한이 없습니다.</Modal.Header>
      </Modal.Wrapper>
      <Modal.Footer>
        <Button bgColor="red" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
