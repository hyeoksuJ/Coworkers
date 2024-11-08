import Image from 'next/image';
import IMAGE_PATHS from '@constants/imagePaths';

export default function NoTaskCard() {
  return (
    <div className="gradient-border xl:1/2 mx-auto mb-6 mt-40 flex w-2/3 flex-col justify-center rounded-40 shadow-[0_0_12px_2px_rgba(255,255,255,0.5)] ">
      <h1 className="mb-6 mt-8 flex w-full items-center justify-center break-words px-3 text-xl-semibold text-text-disabled xl:mt-10">
        추가된 할 일이 없습니다.
      </h1>
      <p className="mb-4 ml-3 flex flex-col gap-[2px] text-sm font-medium text-text-tertiary md:ml-8 xl:ml-12 xl:text-lg-medium">
        새로운 할 일을 추가해서 <br />
        세부적인 일정을 기록해보세요!
        <span className="mt-2 w-full text-xs font-light text-text-disabled xl:text-sm">
          * 이전 날짜의 할 일은 생성할 수 없습니다.
        </span>
      </p>
      <div className="flex gap-1 pl-6">
        <div className="mb-8 ml-auto mr-0 mt-auto flex flex-row items-center justify-around">
          <Image
            alt="할 일 카드"
            src={IMAGE_PATHS.TASKCARD}
            width={433}
            height={73}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
