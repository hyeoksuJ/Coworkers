import LargeKebabIcon from 'public/icons/kebab_large.svg';
import CommentIcon from 'public/icons/comment.svg';
import { useDetailCard } from '@hooks/article/useArticleDetail';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Image from 'next/image';
import NetworkError from '@components/@shared/NetworkError';
import Dropdown, { Option } from '@components/@shared/Dropdown';
import { useModal } from '@hooks/useModal';
import CommentForm from './CommentForm';
import CardDeleteModal from './CommentCardDeletModal';
import Heart from './Heart';

export default function DetailCard() {
  const router = useRouter();
  const { articleId } = router.query;
  const {
    isOpen: DeleteIsOpen,
    onOpen: DeleteOpenModal,
    onClose: DeleteCloseModal,
  } = useModal();

  const { data, isLoading, isError } = useDetailCard({
    articleId: Number(articleId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>
        <NetworkError />
      </p>
    );

  const handleSelect = (option: Option) => {
    if (option.label === '삭제하기') {
      DeleteOpenModal();
    } else {
      router.push('/article/newarticle');
    }
  };

  const basic: Option[] = [
    {
      label: '수정하기',
      component: (
        <div
          onClick={() => handleSelect({ label: '수정하기', component: null })}
        >
          수정하기
        </div>
      ),
    },
    {
      label: '삭제하기',
      component: (
        <div
          onClick={() => handleSelect({ label: '삭제하기', component: null })}
        >
          삭제하기
        </div>
      ),
    },
  ];

  return (
    <>
      <header className="mb-12 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-lg-medium md:text-2lg-medium">
            {data?.title}
          </span>
          <Dropdown
            options={basic}
            triggerIcon={<LargeKebabIcon />}
            optionsWrapClass="mt-2 right-0 rounded-[12px] border border-background-tertiary"
            optionClass="rounded-[12px] md:w-[135px] md:h-[47px] w-[120px] h-[40px] justify-center text-md-regular md:text-lg-regular text-center hover:bg-background-tertiary"
          />
        </div>
        <hr className="my-4 opacity-10" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={data?.image || '/icons/profile_large.svg'}
              width={32}
              height={32}
              alt="게시글 이미지"
              className="rounded-lg"
            />

            <span className="ml-[6px] mr-2 border-r-[1px] border-slate-700/60 pr-2  text-xs-medium text-text-primary md:text-md-medium ">
              {data?.writer.nickname}
            </span>
            <span className="text-xs-medium text-slate-400 md:text-md-medium">
              {dayjs(data?.createdAt).format('YYYY.MM.DD')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CommentIcon />
              <span className="text-xs-regular text-slate-400 md:text-md-medium">
                {data?.commentCount}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Heart articleId={data?.id} />
              <span className="text-xs-regular text-slate-400 md:text-md-medium">
                {data?.likeCount}
              </span>
            </div>
          </div>
        </div>
      </header>
      <p className="break-words text-md-medium text-text-secondary md:text-lg-medium">
        {data?.content}
      </p>
      <div className="flex flex-col justify-between">
        <CommentForm articleId={Number(articleId)} />
      </div>
      <CardDeleteModal
        isOpen={DeleteIsOpen}
        onClose={DeleteCloseModal}
        articleId={articleId}
      />
    </>
  );
}
