import Divider from '@components/auth/Divider';
import GoogleOauthButton from '@components/auth/GoogleOauthButton';
import KaKaoOauthButton from '@components/auth/KaKaoOauthButton';
import SignUpForm from '@components/auth/SignUpForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStorage = localStorage.getItem('userStorage');
    if (userStorage) {
      router.push('/myteam');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <SignUpForm />
      <div className="mb-20 mt-6 flex w-[343px] flex-col gap-4 md:mt-[50px] md:w-[460px]">
        <Divider />
        <div className="flex items-center justify-between">
          <span className="text-lg-medium text-white">간편 회원가입하기</span>
          <div className="flex gap-4">
            <GoogleOauthButton />
            <KaKaoOauthButton />
          </div>
        </div>
      </div>
    </div>
  );
}
