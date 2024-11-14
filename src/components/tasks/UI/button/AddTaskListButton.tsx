import Image from 'next/image';
import { useModal } from '@hooks/useModal';
import useViewportSize from '@hooks/useViewportSize';
import ICON_PATHS from '@constants/iconPaths';
import ButtonMotion from '@components/@shared/animation/ButtonMotion';
import AddTaskListModal from '../modal/AddTaskListModal';

export default function AddTaskListButton() {
  const { isOpen, onOpen, onClose } = useModal();
  const { isMobile } = useViewportSize();

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className=" flex items-center gap-2"
      >
        <ButtonMotion className=" my-auto flex gap-2 text-md-regular text-brand-primary">
          <Image
            alt="분홍색 십자가 아이콘"
            src={ICON_PATHS.PLUS_PINK}
            width={16}
            height={16}
            quality={100}
            className="bg-b m-auto rounded-full bg-background-secondary p-[2px]"
          />
          {isMobile ? '목록 추가' : '새로운 목록 추가하기'}
        </ButtonMotion>
      </button>

      {isOpen && <AddTaskListModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
