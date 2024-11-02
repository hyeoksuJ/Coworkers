import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function UserNotFound() {
  return (
    <div className="relative mt-[50px] flex flex-col items-center">
      <div className="relative mx-auto mt-[100px] h-[120px] w-[160px]">
        <Image
          src="/images/user_not_found.png"
          alt="유저 정보 없음"
          fill
          quality={100}
        />
      </div>
      <p className="mt-[20px] text-center text-[20px]">
        유저 정보를 찾을 수 없어요.
      </p>
      <Link href="/signin">
        <Button
          width={200}
          height={48}
          bgColor="transparent"
          border="white"
          fontColor="white"
          fontSize="14"
          className="mx-auto mt-[50px]"
        >
          로그인 하러 가기
        </Button>
      </Link>
    </div>
  );
}
