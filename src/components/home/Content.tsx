import Image from 'next/image';

import { useUserStore } from '@/src/stores/useUserStore';
import { useRouter } from 'next/router';

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
    <section className="mx-4 flex flex-col gap-8 text-2lg-medium text-white md:mx-6 xl:mx-auto xl:w-[996px] xl:text-2xl-medium">
      <div className="-mt-8 mb-6 flex w-full justify-center md:mb-14 md:mt-32 xl:mb-20 xl:mt-48">
        <div className="w-64 rounded-[30px] border-[2px] border-background-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] md:w-80">
          <Button
            bgColor="gradient"
            shape="round"
            size="full"
            height={54}
            onClick={handleRedirect}
          >
            지금 시작하기
          </Button>
        </div>
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
              그룹으로 <span> 할 일을 관리해요 </span>
            </h2>
          </div>
          <Image
            alt="팀 관리 기능 랜딩이미지"
            src={IMAGE_PATHS.LANDING_TEAM}
            width={291}
            height={338}
            quality={100}
            className=" md:relative md:bottom-[-300px] md:order-1 md:pt-[81px]"
          />
        </div>
      </ScrollFadeInMotion>
      <ScrollFadeInMotion
        startDirection="right"
        delay={1}
        className="relative flex h-[500px] w-full overflow-hidden rounded-40 border-[1px] border-[rgba(248,250,252,0.1)] bg-background-secondary px-[54px] shadow-[0_0_12px_2px_rgba(0,0,0,100)]  hover:shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] md:h-[400px] md:px-[81px] xl:px-[174px]"
      >
        <div className="mx-auto flex flex-col md:w-full md:flex-row md:justify-around">
          <div className="relative top-[-50%] h-[740px] w-[280px]">
            <Image
              alt="멤버 초대 기능 랜딩이미지"
              src={IMAGE_PATHS.LANDING_INVITE}
              width={291}
              height={756}
              quality={100}
              className="mx-auto object-cover shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] md:top-[-10%] md:order-2"
            />
          </div>
          <div className="flex-start relative bottom-[40%] flex w-full flex-col gap-4 md:static md:order-1 md:my-auto md:w-40 md:items-end xl:w-52 ">
            <Image
              alt="이메일 랜딩아이콘"
              src={ICON_PATHS.LANDING_EMAIL}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
              quality={100}
            />
            <h2 className="flex flex-col gap-1 md:text-end">
              간단하게 멤버들을 <span> 초대해요 </span>
            </h2>
          </div>
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
              alt="이메일 체크아이콘"
              src={ICON_PATHS.LANDING_CHECK}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
              quality={100}
            />
            <h2 className="flex flex-col gap-1">
              할 일도 간편하게 <span> 체크해요 </span>
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
