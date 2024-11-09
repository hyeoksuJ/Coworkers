import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  ModalTaitle: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  ModalTaitle,
}: ShareModalProps) {
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
        <Modal.Header fontColor="primary">{ModalTaitle}</Modal.Header>
      </Modal.Wrapper>
      <Modal.Footer>
        <Button onClick={onClose}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}
