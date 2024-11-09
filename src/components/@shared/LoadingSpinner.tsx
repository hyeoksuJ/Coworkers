import Image from 'next/image';
import styles from '@styles/waves.module.css';

export default function LoadingSpinner() {
  return (
    <div className="relative mt-[200px]">
      <p className="text-center text-[30px] text-brand-tertiary">Loading...</p>
      <div className="mx-auto mt-[30px] flex w-[80%] xl:w-[600px]">
        <div className={`relative h-full w-full ${styles.bounce}`}>
          <Image
            alt="도넛1"
            src="/images/choco.png"
            width={500}
            height={500}
            quality={100}
            className="object-contain"
          />
        </div>
        <div
          className={`relative h-full w-full ${styles.bounce} ${styles.bounceDelay1}`}
        >
          <Image
            alt="도넛2"
            src="/images/strawberry2.png"
            quality={100}
            width={500}
            height={500}
          />
        </div>
        <div
          className={`relative h-full w-full ${styles.bounce} ${styles.bounceDelay2}`}
        >
          <Image
            alt="도넛3"
            src="/images/soda.png"
            quality={100}
            width={500}
            height={500}
          />
        </div>
        <div
          className={`relative h-full w-full ${styles.bounce} ${styles.bounceDelay3}`}
        >
          <Image
            alt="도넛4"
            src="/images/pistachio.png"
            quality={100}
            width={500}
            height={500}
          />
        </div>
        <div
          className={`relative h-full w-full ${styles.bounce} ${styles.bounceDelay4}`}
        >
          <Image
            alt="도넛5"
            src="/images/strawberry.png"
            quality={100}
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
