import Image from 'next/image';

import { useUserStore } from '@/src/stores/useUserStore';
import { useRouter } from 'next/router';

import ClickMotion from '@components/@shared/animation/ClickMotion';
import ScrollFadeInMotion from '@components/@shared/animation/ScrollFadeInMotion';
import Button from '@components/@shared/Button';
import ICON_PATHS from '@constants/iconPaths';
import IMAGE_PATHS from '@constants/imagePaths';

export default function Content() {
  const { user } = useUserStore();
  const router = useRouter();

  const handleRedirect = () => {
    if (user) {
      router.push('/myteam');
    } else {
      router.push('/signin');
    }
  };

  return (
    <section className="mx-5 flex flex-col gap-8 text-2lg-medium text-white md:mx-6 xl:mx-auto xl:w-[996px] xl:text-2xl-medium">
      <div className="mb-6 mt-14 flex w-full justify-center md:mb-14 md:mt-28 xl:mb-20 xl:mt-40">
        <ClickMotion className="w-52 rounded-[30px] border-[2px] border-background-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] md:w-80">
          <Button
            bgColor="gradient"
            shape="round"
            size="full"
            height={48}
            onClick={handleRedirect}
            className="h-14"
          >
            시작하기
          </Button>
        </ClickMotion>
      </div>
      <ScrollFadeInMotion
        startDirection="left"
        className="border-brand flex h-[500px] w-full overflow-hidden rounded-40 border-[1px] border-brand-secondary bg-zinc-950 px-[54px] shadow-[0_0_12px_2px_rgba(0,0,0,100)] transition-shadow duration-300 hover:shadow-md hover:shadow-brand-primary md:h-[400px] md:px-[81px] xl:px-[174px]"
      >
        <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around">
          <div className="my-12 flex w-full flex-col gap-4 md:w-40 xl:w-52">
            <Image
              alt="폴더 랜딩아이콘"
              src={ICON_PATHS.LANDING_FOLDER}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
              quality={100}
            />
            <h2 className="flex flex-col gap-1">
              그룹으로
              <span>
                <span className="text-brand-primary">할 일</span>을 관리해요
              </span>
            </h2>
          </div>
          <Image
            alt="팀 관리 기능 랜딩이미지"
            src={IMAGE_PATHS.LANDING_TEAM}
            width={291}
            height={338}
            quality={100}
            className="rounded-3xl border-[3px] border-zinc-900 md:relative md:bottom-[-350px] md:order-1 "
          />
        </div>
      </ScrollFadeInMotion>
      <ScrollFadeInMotion
        startDirection="right"
        delay={1}
        className="relative flex h-[500px] w-full overflow-hidden rounded-40 border-[1px] border-[rgba(248,250,252,0.1)] bg-background-secondary px-[54px] shadow-[0_0_12px_2px_rgba(0,0,0,100)]  hover:shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] md:h-[400px] md:px-[81px] xl:px-[174px]"
      >
        <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around">
          <div className="my-12 flex w-full flex-col items-end gap-4 md:order-1 md:w-40 md:items-start xl:w-52">
            <Image
              alt="이메일 랜딩아이콘"
              src={ICON_PATHS.LANDING_EMAIL}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] md:pb-0"
              quality={100}
            />
            <h2 className="flex flex-col items-end gap-1 md:items-start">
              <span>
                팀원들을 <span className="text-brand-primary">초대</span>해서
              </span>
              함께 관리해요
            </h2>
          </div>
          <Image
            alt="초대 기능 랜딩이미지"
            src={IMAGE_PATHS.LANDING_INVITE}
            width={291}
            height={338}
            quality={100}
            className="rounded-3xl border-[3px] border-zinc-900 md:relative md:top-[-150px] md:-mt-0"
          />
        </div>
      </ScrollFadeInMotion>
      <ScrollFadeInMotion
        startDirection="left"
        delay={2}
        className="flex h-[500px] w-full overflow-hidden rounded-40 border-[1px]  border-background-tertiary bg-background-primary px-[54px] shadow-[0_0_12px_2px_rgba(0,0,0,100)] transition-shadow duration-300 hover:shadow-md  md:h-[400px] md:px-[81px] xl:px-[174px]"
      >
        <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around">
          <div className="my-12 flex w-full flex-col gap-4 md:w-40 xl:w-52">
            <Image
              alt="체크 랜딩아이콘"
              src={ICON_PATHS.LANDING_CHECK}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
              quality={100}
            />
            <h2 className="flex flex-col gap-1">
              할 일을 간편하게
              <span>
                <span className="text-brand-primary">체크</span>해요{' '}
              </span>
            </h2>
          </div>
          <Image
            alt="투두 기능 랜딩이미지"
            src={IMAGE_PATHS.LANDING_TODO}
            width={291}
            height={338}
            quality={100}
            className=" md:relative md:top-[-150px] md:pb-[81px]"
          />
        </div>
      </ScrollFadeInMotion>
    </section>
  );
}
