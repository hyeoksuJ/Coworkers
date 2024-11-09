import { Modal } from '@components/@shared/Modal';
import AddTaskForm from '../../AddTaskForm';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={onClose}
      array="column"
      padding="datePicker"
      fontArray="center"
      bgColor="secondary"
    >
      <Modal.Wrapper array="column" gap="24" className="px-2">
        <Modal.Header fontColor="primary" className="flex flex-col gap-4">
          <h1 className="text-lg-medium">할 일 만들기</h1>
          <p className="text-md-medium text-text-default">
            할일은 실제로 행동 가능한 작업 중심으로 <br />
            작성해주시면 좋습니다.
          </p>
        </Modal.Header>
        <Modal.Content fontColor="primary" fontSize="16" fontArray="left">
          <AddTaskForm onClose={onClose} />
        </Modal.Content>
      </Modal.Wrapper>
    </Modal>
  );
}
