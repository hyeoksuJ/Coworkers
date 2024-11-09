import Button from '@components/@shared/Button';
import { ScrollTextArea } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import { useCommentAdd } from '@hooks/article/useCommentAdd';
import { useModal } from '@hooks/useModal';
import { useState } from 'react';

interface CommentFromProps {
  articleId: number;
}

export default function CommentForm({ articleId }: CommentFromProps) {
  const [content, setContent] = useState('');
  const { isOpen, onOpen, onClose } = useModal();
  const { mutate } = useCommentAdd();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = () => {
    if (content.trim()) {
      mutate({ articleId, content });
      setContent('');
    } else {
      onOpen();
    }
  };

  return (
    <div className="mt-20">
      <ScrollTextArea
        label="댓글달기"
        placeholder="댓글을 입력해주세요"
        textareaProps={{
          value: content,
          onChange: handleContentChange,
        }}
      />
      <div className="mt-4 h-12 text-right">
        <button
          type="button"
          className="h-8 w-[74px] rounded-xl bg-brand-primary text-md-semibold md:h-12 md:w-[184px] md:text-lg-semibold"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
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
        <Modal.Wrapper
          array="column"
          className="flex flex-col items-center justify-center gap-4"
        >
          <Modal.Header fontColor="primary" className="text-2xl-bold">
            댓글을 입력해 주세요.
          </Modal.Header>
        </Modal.Wrapper>
        <Modal.Footer>
          <Button bgColor="red" onClick={onClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
