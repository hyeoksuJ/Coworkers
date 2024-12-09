import LargeKebabIcon from 'public/icons/kebab_large.svg';
import CommentIcon from 'public/icons/comment.svg';
import { useDetailCard } from '@hooks/article/useCommentAdd';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Image from 'next/image';
import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import NetworkError from '@components/@shared/NetworkError';
import Dropdown, { Option } from '@components/@shared/Dropdown';
import { useUserData } from '@hooks/mysetting/useUserData';
import { useModal } from '@hooks/useModal';
import clsx from 'clsx';
import CommentForm from './CommentForm';
import CardDeleteModal from './ArticleCardDeletModal';
import Heart from './Heart';
import NoAccessModal from './NoAccessModal';

export default function DetailCard() {
  const router = useRouter();
  const { articleId } = router.query;
  const {
    isOpen: DeleteIsOpen,
    onOpen: DeleteOpenModal,
    onClose: DeleteCloseModal,
  } = useModal();

  const { data: UserData } = useUserData();

  const { data, isLoading, isError } = useDetailCard({
    articleId: Number(articleId),
  });

  const {
    isOpen: NoAccessModalIsOpen,
    onClose: NoAccessModalCloseModa,
    onOpen: NoAccessModalOpenModal,
  } = useModal();

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>
        <NetworkError />
      </p>
    );

  const handleSelect = (option: Option) => {
    if (option.label === '삭제하기') {
      if (UserData?.id === data?.writer.id) {
        DeleteOpenModal();
      } else {
        NoAccessModalOpenModal();
      }
    } else {
      router.push(`/article/edit/${articleId}`);
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
          <SlideInMotion
            className={clsx({
              hidden: data?.writer.id !== UserData?.id,
              block: data?.writer.id === UserData?.id,
            })}
          >
            <Dropdown
              options={basic}
              triggerIcon={<LargeKebabIcon />}
              optionsWrapClass="mt-2 right-0 rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.5)] border border-background-tertiary"
              optionClass="rounded-[12px] md:w-[135px] md:h-[47px] w-[120px] h-[40px] justify-center text-md-regular md:text-lg-regular text-center hover:bg-background-tertiary"
            />
          </SlideInMotion>
        </div>
        <hr className="my-4 opacity-10" />
        <SlideInMotion className="flex items-center justify-between">
          <div className="flex items-center">
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
        </SlideInMotion>
      </header>
      <SlideInMotion className="flex flex-col">
        <div className="mb-4 flex justify-center md:justify-start">
          <div className=" relative h-[200px] w-[200px] md:h-[240px] md:w-[240px] ">
            <Image
              src={data?.image || '/icons/profile_large.svg'}
              layout="fill"
              alt="게시글 이미지"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="w-full break-all text-md-medium text-text-secondary md:text-lg-medium">
            {data?.content}
          </p>
        </div>
      </SlideInMotion>
      <div className="flex flex-col justify-between">
        <CommentForm articleId={Number(articleId)} />
      </div>
      <CardDeleteModal
        isOpen={DeleteIsOpen}
        onClose={DeleteCloseModal}
        articleId={articleId}
      />
      <NoAccessModal
        isOpen={NoAccessModalIsOpen}
        onClose={NoAccessModalCloseModa}
      />
    </>
  );
}
