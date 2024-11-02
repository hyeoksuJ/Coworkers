import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { useModal } from '@hooks/useModal';
import Image from 'next/image';
import ProfileImageModal from './ProfileImageModal';

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
  const {
    isOpen: IsProfileModalOpen,
    onClose: ProfileModalClose,
    onOpen: ProfileModalOpen,
  } = useModal();
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
        <Modal.Content fontColor="secondary" fontSize="14" fontArray="left">
          <div className="flex items-center justify-start gap-[20px] overflow-hidden">
            <div
              className="relative mx-auto h-[70px] w-[70px] cursor-pointer"
              onClick={ProfileModalOpen}
            >
              <Image
                src={img || '/icons/profile_large.svg'}
                alt="프로필 사진"
                fill
                className="rounded-[16px] object-cover "
              />
            </div>
            <div className="w-[60%] flex-grow md:w-[180px] md:flex-grow-0">
              <p className="flex items-center gap-[2px] break-words text-lg-medium">
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
              <p className="mt-[15px] break-words text-xs-regular">{email}</p>
            </div>
          </div>
        </Modal.Content>
      </Modal.Wrapper>
      <Modal.Footer>
        <Button size="full" onClick={() => handleCopyClick(email)}>
          이메일 복사하기
        </Button>
      </Modal.Footer>
      <ProfileImageModal
        isOpen={IsProfileModalOpen}
        onClose={ProfileModalClose}
        img={img || '/icons/profile_large.svg'}
      />
    </Modal>
  );
}
