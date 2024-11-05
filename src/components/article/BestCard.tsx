import Image from 'next/image';
import IcmediaIcon from 'public/icons/ic_medal.svg';
import { useCard } from '@hooks/article/useArticleCard';
import useViewportSize from '@hooks/useViewportSize';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ArrowRightIcon from 'public/icons/arrow_right.svg';
import NetworkError from '@components/@shared/NetworkError';
import { useRouter } from 'next/router';
import HeartIcon from 'public/icons/heart.svg';

interface BestCardProps {
  keyword: string;
}

export default function BestCard({ keyword }: BestCardProps) {
  const [pageSize, setPageSize] = useState(0);
  const { data: cards, isError } = useCard(1, pageSize, 'like', keyword || '');
  const { isMobile, isTablet, isPC } = useViewportSize();
  const router = useRouter();

  const handleDetalCard = (id: number) => {
    router.push(`article/${id}`);
  };

  useEffect(() => {
    if (isMobile) {
      setPageSize(1);
    } else if (isTablet) {
      setPageSize(2);
    } else if (isPC) {
      setPageSize(3);
    }
  }, [isMobile, isTablet, isPC]); // 의존성 배열에 뷰포트 사이즈 변경을 감지

  // 에러 상태 처리
  if (isError) {
    return (
      <div>
        <NetworkError />
      </div>
    );
  }

  const handleLodaMore = () => {
    setPageSize((prevSize) => {
      if (isMobile) {
        return prevSize + 1;
      }
      if (isTablet) {
        return prevSize + 2;
      }
      if (isPC) {
        return prevSize + 3;
      }
      return prevSize;
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg-bold md:text-xl-bold">베스트 게시글</h2>
        <button
          type="button"
          className="flex items-center gap-[1px]"
          onClick={handleLodaMore}
        >
          <span className="text-sm text-slate-400 md:text-lg-regular">
            더보기
          </span>
          <ArrowRightIcon />
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards?.map((card) => (
          <li key={card.id}>
            <article className=" relative h-[178px] w-full rounded-xl border border-background-tertiary bg-background-secondary">
              <div
                className="mx-4 mb-4 mt-[9.5px] flex cursor-pointer flex-col"
                onClick={() => handleDetalCard(card.id)}
              >
                <div className="mb-6">
                  <div className=" mb-[13.5px] flex items-center">
                    <IcmediaIcon />
                    <span className="text-md-semibold md:text-lg-semibold">
                      Best
                    </span>
                  </div>
                  <div className=" flex justify-between">
                    <div className="flex-1 overflow-hidden">
                      <h3 className="mb-3 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-md-medium md:text-2lg-medium">
                        {card.title}
                      </h3>
                      <span className="text-xs-regular text-slate-400 md:text-md-medium">
                        {dayjs(card.createdAt).format('YYYY.MM.DD')}
                      </span>
                    </div>
                    <div className="ml-2 h-16 w-16 overflow-hidden rounded-lg">
                      <Image
                        src={card.image}
                        width={64}
                        height={64}
                        alt="게시글 이미지"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icons/profile_large.svg"
                      width={32}
                      height={32}
                      alt="게시글 이미지"
                      className="rounded-full"
                    />
                    <span className="text-xs-medium md:text-md-medium">
                      {card.writer.nickname}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartIcon />
                    <span className="text-xs-regular text-slate-400 md:text-md-medium">
                      {card.likeCount}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
