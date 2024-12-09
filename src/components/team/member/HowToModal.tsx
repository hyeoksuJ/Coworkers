import { Modal } from '@components/@shared/Modal';
import Image from 'next/image';

interface HowToModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToModal({ isOpen, onClose }: HowToModalProps) {
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
      width="500"
    >
      <div className="flex flex-col gap-[15px] pb-[20px]">
        <div className="relative mx-[10px] h-[80%] w-full max-w-[90%] cursor-pointer">
          <Image
            src="/images/participate.png"
            alt="팀 참여 방법 설명 이미지"
            width={1000}
            height={1000}
            quality={100}
            className="mx-[10px] object-cover"
          />
        </div>
        <p className="my-[20px] text-md-regular">
          관리자의 링크를 받아서 팀 참여하기 페이지에 입력!
        </p>
      </div>
    </Modal>
  );
}
