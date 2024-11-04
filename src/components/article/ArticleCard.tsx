import Image from 'next/image';
import ArrayDropdown from '@components/article/ArrayDropdown';
import { useCards } from '@hooks/article/useArticleCard';
import NetworkError from '@components/@shared/NetworkError';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Heart from './Heart';

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

  if (isError) {
    return (
      <div>
        <NetworkError />
      </div>
    );
  }

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
                  <article className="relative h-[178px] w-full rounded-xl border border-background-tertiary bg-background-secondary">
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
                        <div className="h-16 w-16 flex-none rounded-lg">
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
                          <span className="text-xs-regular text-slate-400 md:text-md-medium">
                            {card.likeCount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-[18px] right-[30px]">
                      <Heart articleId={card.id} />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div
        ref={ref}
        className={clsx({
          hidden: hasNextPage === false,
          'my-10 flex justify-center': hasNextPage === true,
        })}
      >
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-brand-primary text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    </>
  );
}
