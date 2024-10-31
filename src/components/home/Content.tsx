import Image from 'next/image';
import { useUserStore } from '@/src/stores/useUserStore';
import { useRouter } from 'next/router';

import Button from '@components/@shared/Button';
import ICON_PATHS from '@constants/iconPaths';
import IMAGE_PATHS from '@constants/imagePaths';

export default function Content() {
  const { user } = useUserStore();
  const router = useRouter();

  const handleRedirect = () => {
    if (user) {
      if (user.id) {
        router.push('/myteam');
      } else {
        router.push('/addteam');
      }
    } else {
      router.push('/signin');
    }
  };

  return (
    <section className="mx-4 flex flex-col gap-8 text-2lg-medium text-white md:mx-6 xl:mx-auto xl:w-[996px] xl:text-2xl-medium">
      <div className="my-10 mt-20 flex w-full justify-center md:my-20 xl:my-10 xl:mb-32">
        <Button
          bgColor="gradient"
          shape="round"
          width={343}
          height={48}
          onClick={handleRedirect}
        >
          지금 시작하기
        </Button>
      </div>
      <div className="gradient-border flex w-full flex-col rounded-40 px-[54px] shadow-[0_0_12px_2px_rgba(255,255,255,0.5)] md:px-[81px] xl:px-[174px] ">
        <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around">
          <div className="flex-start my-12 flex w-full flex-col gap-4 md:order-2 md:w-40 xl:w-52">
            <Image
              alt="폴더 랜딩아이콘"
              src={ICON_PATHS.LANDING_FOLDER}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
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
            className="md:order-1 md:pt-[81px]"
          />
        </div>
      </div>
      <div className="flex w-full rounded-40 border-[1px] border-[rgba(248,250,252,0.1)] bg-background-secondary px-[54px] md:px-[81px] xl:px-[174px]">
        <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around">
          <Image
            alt="멤버 초대 기능 랜딩이미지"
            src={IMAGE_PATHS.LANDING_INVITE}
            width={291}
            height={338}
            className="md:order-2 md:pb-[81px]"
          />
          <div className="flex-start my-12 flex w-full flex-col gap-4 md:order-1 md:w-40 md:items-end xl:w-52">
            <Image
              alt="이메일 랜딩아이콘"
              src={ICON_PATHS.LANDING_EMAIL}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
            />
            <h2 className="flex flex-col gap-1 md:text-end">
              간단하게 멤버들을 <span> 초대해요 </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex w-full rounded-40 bg-slate-950 px-[54px] md:px-[81px] xl:px-[174px]">
        <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around">
          <Image
            alt="투두 기능 랜딩이미지"
            src={IMAGE_PATHS.LANDING_TODO}
            width={291}
            height={338}
            className="md:pb-[81px]"
          />
          <div className="flex-start my-12 flex w-full flex-col gap-4 md:w-40 xl:w-52">
            <Image
              alt="이메일 체크아이콘"
              src={ICON_PATHS.LANDING_CHECK}
              width={48}
              height={48}
              className="rounded-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
            />
            <h2 className="flex flex-col gap-1">
              할 일도 간편하게 <span> 체크해요 </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
