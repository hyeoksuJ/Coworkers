import Image from 'next/image';

export const moreIcon = (
  <div className="relative flex w-[20px] items-center">
    <Image
      src="/icons/kebab_large.svg"
      alt="더보기 아이콘"
      width={4}
      height={20}
      className="mx-auto"
    />
  </div>
);
