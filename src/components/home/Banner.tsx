import Image from 'next/image';
import { motion } from 'framer-motion';

import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import useResponsiveImageDetails from '@hooks/useResponsiveImageDetails';
import IMAGE_PATHS from '@constants/imagePaths';

export default function Banner() {
  const { src, width, height } = useResponsiveImageDetails({
    mobile: {
      src: IMAGE_PATHS.LADNING_TRAIN_MB,
      width: 640,
      height: 480,
    },
    tablet: {
      src: IMAGE_PATHS.LADNING_TRAIN_TB,
      width: 980,
      height: 760,
    },
    pc: {
      src: IMAGE_PATHS.LADNING_TRAIN_PC,
      width: 1120,
      height: 760,
    },
  });

  // 애니메이션 설정
  const trainVariants = {
    hidden: { x: '-250%', opacity: 0 },
    forward: {
      x: '10%',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 30,
        duration: 1,
      },
    },
    back: {
      x: '0%',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 30,
        duration: 2,
      },
    },
  };

  return (
    <section className="border-b-4 border-brand-secondary shadow-[0_8px_32px_2px_rgba(255,85,128,1)] hover:border-brand-secondary hover:shadow-brand-secondary">
      <div className="bg-brw-full relative -mt-24 h-[600px] md:-mt-10 md:h-[600px] xl:mx-auto xl:mt-0 xl:w-[1200px]">
        <div className="mt-[100px] flex h-full flex-col items-center justify-evenly md:top-[100px] md:gap-2 xl:top-[84px] xl:gap-5">
          <SlideInMotion
            delay={0.4}
            className="flex flex-col items-center md:mt-20"
          >
            <div className="relative mx-auto h-[36px] w-[300px] md:h-[56px] md:w-[500px]">
              <Image
                alt="배너 메인 멘트"
                src="/images/landing_ment.png"
                fill
                quality={100}
              />
            </div>
            <div className="relative mt-[10px] h-[36px] w-[120px] md:h-[56px] md:w-[200px]">
              <Image
                alt="배너 로고"
                src="/images/landing_banner_logo.png"
                fill
              />
            </div>
          </SlideInMotion>
          <motion.div
            initial="hidden"
            animate={['forward', 'back']}
            variants={trainVariants}
            className="mt-10 xl:mt-0"
          >
            <Image
              src={src}
              alt="상단 배너 기차이미지"
              width={width}
              height={height}
              quality={100}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
