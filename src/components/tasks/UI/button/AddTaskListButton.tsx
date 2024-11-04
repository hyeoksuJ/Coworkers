import Image from 'next/image';
import { useModal } from '@hooks/useModal';
import useViewportSize from '@hooks/useViewportSize';
import ICON_PATHS from '@constants/iconPaths';
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
        <Image
          alt="왼쪽 화살표 아이콘"
          src={ICON_PATHS.PLUS_GREEN}
          width={16}
          height={16}
          quality={100}
          className="bg-b rounded-full bg-background-secondary p-[2px]"
        />
        <span className="my-auto text-md-regular text-brand-primary">
          {isMobile ? '목록 추가' : '새로운 목록 추가하기'}
        </span>
      </button>

      {isOpen && <AddTaskListModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
