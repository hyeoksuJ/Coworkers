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
    <footer className="relative mx-auto h-[500px] w-full px-[60px] md:h-[740px] xl:h-[780px] xl:w-[1080px]">
      <div className="mt-40 flex w-full flex-col items-center gap-4 text-center text-text-primary md:gap-6">
        <h3 className="text-2xl-semibold md:text-4xl-semibold">
          지금 바로 시작해보세요
        </h3>
        <p className=" text-lg-medium md:text-2xl-medium">
          팀원 모두와 같은 방향,
          <span className="block md:inline">
            같은 속도로 나아가는 가장 쉬운 방법
          </span>
        </p>
      </div>
      <div className="relative mx-auto h-[400px] w-full xl:w-[90%]">
        <Image
          src={src}
          alt="하단 배너 협업이미지"
          fill
          className="object-contain"
          quality={100}
        />
        <div className="absolute top-[210px] flex w-[70%] justify-center xl:top-[200px] xl:w-[650px]">
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
