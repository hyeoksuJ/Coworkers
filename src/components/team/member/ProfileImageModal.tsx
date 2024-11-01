import { Modal } from '@components/@shared/Modal';
import Image from 'next/image';

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  img: string;
}

export default function ProfileImageModal({
  isOpen,
  onClose,
  img,
}: ProfileImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={onClose}
      array="column"
      bgColor="primary"
      fontSize="16"
      fontArray="center"
      gap="40"
    >
      <Modal.Wrapper array="column">
        <div className="flex justify-between gap-[25px]">
          <div className="relative mx-auto h-[400px] max-h-[90%] w-[400px] max-w-[90%] cursor-pointer">
            <Image
              src={img || '/icons/profile_large.svg'}
              alt="프로필 사진"
              fill
              className="rounded-[16px] object-contain "
            />
          </div>
        </div>
      </Modal.Wrapper>
    </Modal>
  );
}
