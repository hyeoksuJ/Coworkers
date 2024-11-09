import { postSignInKakao } from '@/src/api/auth/authAPI';
import { useUserStore } from '@/src/stores/useUserStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function KakaoOauth() {
  const router = useRouter();
  const { setTokens, updateUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOauthCallback = async () => {
      const { code } = router.query;

      if (typeof code === 'string') {
        try {
          const signInWithKakao = async (token: string): Promise<void> => {
            try {
              const redirectUri =
                process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '';
              const postSignInKakaoResponse = await postSignInKakao(
                redirectUri,
                token
              );

              console.log('카카오 간편 로그인 성공', postSignInKakaoResponse);
              const { accessToken, refreshToken, user } =
                postSignInKakaoResponse;

              setTokens(accessToken, refreshToken);
              updateUser(user);
              /**
               * 간편 로그인 api 호출 응답에 신규 사용자 구분이 없기 때문에
               * 닉네임 길이로 신규 사용자인지 아닌지 분별
               * 처음 간편 로그인 시 구글에서 주는 닉네임이 10자 이상의 숫자값이기 때문
               */
              if (user.nickname.length > 10) {
                router.push('/oauth/signup/kakao');
              } else {
                router.push('/myteam');
              }
            } catch (signInError) {
              console.error('카카오 간편 로그인 API 호출 에러:', signInError);
            }
          };

          await signInWithKakao(code); // Kakao 인가 코드를 가지고 간편 로그인
        } catch (error) {
          console.error('로그인 처리 중 에러 발생:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleOauthCallback();
  }, [router, setTokens, updateUser]);

  if (isLoading) {
    return null;
  }
}
