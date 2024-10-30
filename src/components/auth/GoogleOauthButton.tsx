import GoogleIcon from '@icons/google.svg';

export default function GoogleOauthButton() {
  const handleClick = () => {
    const googleOauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
    window.location.href = googleOauthUrl;
  };

  return (
    <button type="button" onClick={handleClick}>
      <GoogleIcon />
    </button>
  );
}
