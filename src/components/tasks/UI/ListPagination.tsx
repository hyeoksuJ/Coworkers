import ICON_PATHS from '@constants/iconPaths';
import Image from 'next/image';
import TextButtonMotion from '@components/@shared/animation/TextButtonMotion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export default function ListPagination({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  return (
    <div className="mb-4 flex justify-between">
      <TextButtonMotion className="flex gap-2" disabled={currentPage === 1}>
        <button
          type="button"
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 text-md-regular ${
            currentPage === 1 ? 'text-text-default' : 'text-brand-primary'
          }`}
        >
          <Image
            alt="왼쪽 화살표 아이콘"
            src={ICON_PATHS.ARROW_LEFT}
            width={12}
            height={12}
            className="m-auto"
          />
          <span>이전 목록</span>
        </button>
      </TextButtonMotion>
      <TextButtonMotion
        className="flex gap-2"
        disabled={currentPage === totalPages}
      >
        <span className="rounded-full border-opacity-80  bg-background-secondary p-1 px-2 text-md-regular text-text-tertiary">
          <span className="text-brand-primary">{currentPage} </span>/{' '}
          {totalPages}
        </span>
        <button
          type="button"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 text-md-regular ${
            currentPage === totalPages
              ? 'text-text-default'
              : 'text-brand-primary'
          }`}
        >
          <span>다음 목록</span>
          <Image
            alt="오른쪽 화살표 아이콘"
            src={ICON_PATHS.ARROW_RIGHT}
            width={12}
            height={12}
            className="m-auto"
          />
        </button>
      </TextButtonMotion>
    </div>
  );
}
