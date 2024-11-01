import Button from '@components/@shared/Button';
import { Input, ScrollTextArea } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import ArticleImageInput from '@components/article/NewArticleImage';
import { useDetailCard } from '@hooks/article/useArticleDetail';
import { useEditArticle } from '@hooks/article/useEditArticle';
import { useModal } from '@hooks/useModal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function NewArticle() {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useModal();
  const mutation = useEditArticle();
  const { articleId } = router.query;

  const { data } = useDetailCard({
    articleId: Number(articleId),
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setImage(data.image);
    }
  }, [data]);

  const handleSubmit = () => {
    if (content && title && image) {
      mutation.mutate({ title, content, image, articleId });
      router.push(`/article/${articleId}`);
    } else {
      onOpen();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleImageChange = (response: string) => {
    setImage(response);
  };

  return (
    <div className="mx-4 mt-10 max-w-[1200px] xl:mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2lg-medium md:text-xl-bold">게시글 쓰기</h1>
        <div className="w-[184px] max-md:hidden">
          <Button size="full" onClick={handleSubmit}>
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
          />
        </div>
        <div>
          <h2 className="mb-4 text-md-medium md:text-lg-medium">이미지</h2>
          <ArticleImageInput onUploadSuccess={handleImageChange} data={data} />
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
