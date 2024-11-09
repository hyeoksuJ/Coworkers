import Image from 'next/image';
import ArrayDropdown from '@components/article/ArrayDropdown';
import { useCards } from '@hooks/article/useArticleCard';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import HeartIcon from 'public/icons/heart.svg';
import LoadingSpinner from '@components/@shared/LoadingSpinner';
import UserNotFound from '@components/@shared/UserNotFound';
import { motion } from 'framer-motion';
import ArticleLoadingSpinner from 'public/icons/articleLoadingSpinner.svg';

interface ArticleCardProps {
  keyword: string;
}

interface Writer {
  nickname: string;
  id: string;
}
interface Card {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  writer: Writer;
  likeCount: number;
}

export default function ArticleCard({ keyword }: ArticleCardProps) {
  const [orderBy, setorderBy] = useState('recent');
  const { query } = useRouter();
  const {
    data: cards,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCards(10, orderBy, keyword || '');
  const router = useRouter();

  useEffect(() => {
    if (query.orderBy) {
      setorderBy(query.orderBy as string);
    } else {
      setorderBy('recent');
    }
  }, [query.orderBy]);

  const handleDetalCard = (id: number) => {
    router.push(`article/${id}`);
  };

  const handleSelect = (value: string) => {
    setorderBy(value);
    router.push({
      pathname: router.pathname,
      query: { ...query, orderBy: value },
    });
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <UserNotFound />;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg-bold md:text-xl-bold">게시글</h2>
        <ArrayDropdown onSelect={handleSelect} />
      </div>

      {cards?.pages.map((page) => {
        const pageKey = page.map((pageCard: Card) => pageCard.id).join('-');
        return (
          <div className="mb-4" key={pageKey}>
            <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {page.map((card: Card) => (
                <li key={card.id}>
                  <motion.div whileHover={{ scale: 1.017 }}>
                    <article className=" h-[178px] w-full rounded-xl border border-background-tertiary bg-background-secondary">
                      <div
                        className="mx-4 mb-4 mt-6 cursor-pointer"
                        onClick={() => handleDetalCard(card.id)}
                      >
                        <div className=" mb-10 flex justify-between">
                          <div className="flex-1 overflow-hidden pr-4">
                            <h3 className="mb-3 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-md-medium md:text-2lg-medium">
                              {card.title}
                            </h3>
                            <span className="text-xs-regular text-slate-400 md:text-md-medium">
                              {dayjs(card.createdAt).format('YYYY.MM.DD')}
                            </span>
                          </div>
                          <div className="h-16 w-16 flex-none overflow-hidden rounded-lg">
                            <Image
                              src={card.image}
                              width={64}
                              height={64}
                              alt="게시글 이미지"
                              className="rounded-lg"
                            />
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
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div className="overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2, // 회전 애니메이션이 완료되는 시간 (초 단위)
            repeat: Infinity, // 무한 반복
            repeatType: 'loop', // 루프 형태로 반복
            ease: 'linear', // 일정한 속도로 회전
          }}
          ref={ref}
          className={clsx({
            hidden: hasNextPage === false,
            'my-10 flex justify-center': hasNextPage === true,
          })}
        >
          <ArticleLoadingSpinner />
        </motion.div>
      </div>
    </>
  );
}
