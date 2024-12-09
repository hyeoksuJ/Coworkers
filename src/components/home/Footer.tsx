import Image from 'next/image';
import ScrollDonutBounceMotion from '@components/@shared/animation/ScrollDonutBounceMotion';

import useResponsiveImageDetails from '@hooks/useResponsiveImageDetails';
import IMAGE_PATHS from '@constants/imagePaths';

export default function Footer() {
  const { src } = useResponsiveImageDetails({
    mobile: {
      src: IMAGE_PATHS.LADNING_WORKERS_MB,
    },
    tablet: {
      src: IMAGE_PATHS.LADNING_WORKERS_TB,
    },
    pc: {
      src: IMAGE_PATHS.LADNING_WORKERS_PC,
    },
  });

  return (
    <footer className="relative mx-auto h-[400px] w-full px-8 md:h-[740px]  md:p-6 md:px-[60px] xl:h-[780px] xl:w-[1080px]">
      <div className="mt-24 flex w-full flex-col items-center gap-4 text-center text-text-primary md:mt-40 md:gap-6">
        <h3 className="text-2xl-semibold md:text-4xl-semibold">
          당신의 하루를 <span className="text-brand-primary">달콤</span>하게 !
        </h3>
        <p className="text-lg-medium md:text-2xl-medium">
          귀여운 도넛과 함께하는 달콤한 일상,
          <span className="mt-1 block md:inline">
            팀원들과 <span className="text-brand-primary">목표</span>를 더
            특별하게 관리해보세요.
          </span>
        </p>
      </div>
      <div className="relative mx-auto h-[250px] w-full md:mt-16 xl:mt-24 xl:w-[90%]">
        <Image
          src={src}
          alt="하단 배너 협업이미지"
          fill
          className="object-contain"
          quality={100}
        />
        <div className="absolute top-[140px] flex w-[70%] justify-center md:top-[110px] md:w-[500px] xl:left-10 xl:top-[100px]  xl:w-[600px]">
          <ScrollDonutBounceMotion
            delay={0.4}
            className="relative h-full w-full flex-grow"
          >
            <Image
              alt="도넛1"
              src="/images/landing_donut_1.png"
              width={500}
              height={500}
              className="object-contain"
              quality={100}
            />
          </ScrollDonutBounceMotion>
          <ScrollDonutBounceMotion
            delay={0.7}
            className="relative h-full w-full"
          >
            <Image
              alt="도넛2"
              src="/images/landing_donut_2.png"
              width={500}
              height={500}
              quality={100}
            />
          </ScrollDonutBounceMotion>
          <ScrollDonutBounceMotion delay={1} className="relative h-full w-full">
            <Image
              alt="도넛3"
              src="/images/landing_donut_3.png"
              width={500}
              height={500}
              quality={100}
            />
          </ScrollDonutBounceMotion>
        </div>
      </div>
    </footer>
  );
}
