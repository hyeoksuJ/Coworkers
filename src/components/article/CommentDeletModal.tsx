import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { useCommentDelete } from '@hooks/article/useCommentDelete';
import Image from 'next/image';

interface EditArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: string | null;
}

export default function CommentDeletMoal({
  isOpen,
  onClose,
  commentId,
}: EditArticleModalProps) {
  const mutation = useCommentDelete();

  const handleCommentDelete = () => {
    mutation.mutate(commentId);
    onClose();
  };

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
        <Modal.Header
          fontColor="primary"
          className="flex flex-col items-center gap-[16px]"
        >
          <Image
            src="/icons/alert.svg"
            alt="경고 아이콘"
            width={24}
            height={24}
          />
          댓글을 삭제하시겠어요?
        </Modal.Header>
        <Modal.Content fontColor="secondary" fontSize="14" fontArray="center">
          <p className="mt-[20px]">
            댓글과 관련된 모든 정보가 사라집니다. 정말로 삭제하시겠습니까?
          </p>
        </Modal.Content>
      </Modal.Wrapper>
      <Modal.Footer>
        <div className="flex gap-[8px]">
          <Button
            size="full"
            bgColor="white"
            fontColor="gray"
            onClick={onClose}
          >
            취소
          </Button>
          <Button size="full" bgColor="red" onClick={handleCommentDelete}>
            삭제
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
