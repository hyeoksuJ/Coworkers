import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import Image from 'next/image';

interface GetUserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  img: string | null;
  role: string;
}

export default function GetUserDetailModal({
  isOpen,
  onClose,
  name,
  email,
  img,
  role,
}: GetUserDetailModalProps) {
  const handleCopyClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('복사한 이메일: ', email);
      })
      .catch((err) => {
        console.error('복사에 실패했습니다!: ', err);
      });
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
        <Modal.Header fontColor="primary">
          <div className="relative mx-auto h-[100px] w-[100px]">
            <Image
              src={img || '/icons/profile_large.svg'}
              alt="프로필 사진"
              fill
              className="rounded-[16px] object-cover "
            />
          </div>
        </Modal.Header>
        <Modal.Content fontColor="secondary" fontSize="14" fontArray="center">
          <p className="mt-[20px] flex items-center justify-center gap-[2px]">
            {role === 'ADMIN' && (
              <Image
                src="/images/crown.png"
                alt="왕관 이미지"
                width={15}
                height={15}
              />
            )}
            {name}
          </p>
          <p className="mt-[8px] text-xs-regular">{email}</p>
        </Modal.Content>
      </Modal.Wrapper>
      <Modal.Footer>
        <Button size="full" onClick={() => handleCopyClick(email)}>
          이메일 복사하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
