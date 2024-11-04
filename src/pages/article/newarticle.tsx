import Button from '@components/@shared/Button';
import { Input, ScrollTextArea } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import ArticleImageInput from '@components/article/NewArticleImage';
import { useNewArticle } from '@hooks/article/useNewArticle';
import { useModal } from '@hooks/useModal';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NewArticle() {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isContentError, setIsContentError] = useState<boolean>(false);

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useModal();
  const mutation = useNewArticle();

  const handleSubmit = () => {
    if (content && title && image) {
      mutation.mutate({ title, content, image });
      router.push('/article');
    } else {
      onOpen();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
    setIsTitleError(value.length > 50);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
    setIsContentError(value.length > 2000);
  };

  const handleImageChange = (response: string) => {
    setImage(response);
  };

  const disabled = isTitleError || isContentError;

  return (
    <div className="mx-4 mt-10 max-w-[1200px] xl:mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2lg-medium md:text-xl-bold">게시글 쓰기</h1>
        <div className="w-[184px] max-md:hidden">
          <Button disabled={disabled} size="full" onClick={handleSubmit}>
            등록
          </Button>
        </div>
      </header>
      <hr className="my-6 border-border-primary border-opacity-10" />
      <main className="flex flex-col gap-8">
        <div>
          <span className="text-md-medium md:text-lg-medium">
            <span className="text-brand-tertiary">*</span> 제목
          </span>
          <Input
            placeholder="이름을 입력해주세요"
            inputProps={{
              value: title,
              onChange: handleTitleChange,
            }}
            isError={isTitleError}
            errorMessage="제목은 50자 내외입니다."
          />
        </div>
        <div>
          <span className="text-md-medium md:text-lg-medium">
            <span className="text-brand-tertiary">*</span> 내용
          </span>
          <ScrollTextArea
            placeholder="내용을 입력해주세요."
            textareaProps={{
              value: content,
              onChange: handleContentChange,
            }}
            isError={isContentError}
            errorMessage="내용은 2000자 내외입니다."
          />
        </div>
        <div>
          <h2 className="mb-4 text-md-medium md:text-lg-medium">이미지</h2>
          <ArticleImageInput onUploadSuccess={handleImageChange} />
        </div>

        <div className="md:hidden">
          <Button size="full" onClick={handleSubmit}>
            등록
          </Button>
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
              필드값을 입력해 주세요.
            </Modal.Header>
            <Modal.Content fontColor="secondary" fontSize="14" fontArray="left">
              <p>제목, 내용, 이미지 모두 작성해주세요.</p>
            </Modal.Content>
          </Modal.Wrapper>
          <Modal.Footer>
            <Button bgColor="red" onClick={onClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}
