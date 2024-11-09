// 게시글 메인 페이지
import Button from '@components/@shared/Button';
import { SearchInput } from '@components/@shared/Input';
import ArticleCard from '@components/article/ArticleCard';
import BestCard from '@components/article/BestCard';
import { useRouter } from 'next/router';
import PlusIcon from 'public/icons/plus.svg';
import { useEffect, useState } from 'react';

export default function ArticlePage() {
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

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

  return (
    <div className="mx-4 mt-8 max-w-[1200px] xl:mx-auto">
      <header className="mb-6">
        <h1 className="mb-6 text-2lg-bold md:text-2xl-bold">자유 게시판</h1>
        <SearchInput
          placeholder="검색어를 입력해주세요"
          inputProps={{
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            value,
          }}
        />
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
