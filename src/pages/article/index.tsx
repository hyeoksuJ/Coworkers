// 게시글 메인 페이지
import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import Button from '@components/@shared/Button';
import { SearchInput } from '@components/@shared/Input';
import ArticleCard from '@components/article/ArticleCard';
import BestCard from '@components/article/BestCard';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PlusIcon from 'public/icons/plus.svg';
import { useEffect, useState } from 'react';

export default function ArticlePage() {
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handelNewArticle = () => {
    router.push('/article/newarticle');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(value);
      router.push(`/article?q=${value}`);
    }
  };

  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q as string);
      setValue(router.query.q as string); // 검색어 입력 필드도 업데이트
    } else {
      setSearchTerm('');
      setValue('');
    }
  }, [router.query.q]);

  const handleVisibleClick = () => {
    if (isVisible === false) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <div className="mx-4 mt-8 max-w-[1200px] xl:mx-auto">
      <header className="mb-10">
        <h1 className="mb-6 text-2lg-bold text-brand-primary md:text-2xl-bold md:text-text-primary">
          커뮤니티
        </h1>
        <div className="mb-2 flex items-center gap-2">
          <Image
            src="/icons/question.svg"
            alt="물음표 아이콘"
            width={17}
            height={17}
            quality={100}
            onClick={handleVisibleClick}
            className="cursor-pointer rounded-[16px] object-contain hover:scale-110"
          />
          {isVisible && (
            <>
              <p className="hidden text-md-regular text-brand-primary md:block">
                일정을 함께 관리할 팀원을 모집하거나, 자유롭게 글을 작성할 수
                있습니다.
              </p>
              <div className="absolute·left-[110px]·top-[120px]·z-10·w-fit·animate-fadeInDown rounded-[6px] bg-background-tertiary p-2 text-sm-semibold text-brand-primary md:hidden">
                일정을 함께 관리할 팀원을 모집하거나, <br />
                자유롭게 글을 작성할 수 있습니다.
              </div>
            </>
          )}
        </div>
        <SlideInMotion>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            inputProps={{
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              value,
            }}
          />
        </SlideInMotion>
      </header>
      <main>
        <BestCard keyword={searchTerm} />
        <hr className="my-8 opacity-10" />
        <ArticleCard keyword={searchTerm} />
      </main>
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={handelNewArticle}
          shape="round"
          className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600"
        >
          <div className="flex items-center justify-center">
            <PlusIcon />글 작성하기
          </div>
        </Button>
      </div>
    </div>
  );
}
