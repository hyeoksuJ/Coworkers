import KakaoIcon from '@icons/kakaotalk.svg';

export default function KaKaoOauthButton() {
  const handleClick = () => {
    const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoOauthUrl;
  };

  return (
    <button type="button" onClick={handleClick}>
      <KakaoIcon />
    </button>
  );
}
