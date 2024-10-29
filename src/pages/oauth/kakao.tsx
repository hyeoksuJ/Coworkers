import { postSignInKakao } from '@/src/api/auth/authAPI';
import { useUserStore } from '@/src/stores/useUserStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function KakaoSignUp() {
  const router = useRouter();
  const { setTokens, updateUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
              router.push('/myteam');
            } catch (signInError) {
              console.error('카카오 간편 로그인 API 호출 에러:', signInError);
              setErrorMessage('카카오 간편 로그인 중 오류가 발생했습니다.');
            }
          };

          await signInWithKakao(code); // Kakao 인가 코드를 가지고 간편 로그인
        } catch (error) {
          setErrorMessage('로그인 중 오류 발생');
          console.error('로그인 처리 중 에러 발생:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    handleOauthCallback();
  }, [router, setTokens, updateUser]);

  return (
    <div>
      {loading && <div>카카오 로그인 중</div>}
      {errorMessage && <div className="text-status-danger">{errorMessage}</div>}
    </div>
  );
}
