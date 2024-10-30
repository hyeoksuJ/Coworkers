/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', // 기존 허용할 외부 도메인
        port: '', // 특정 포트를 허용하려면 설정
        pathname: '/**', // 모든 경로를 허용
      },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com', // 추가할 S3 도메인
        port: '', // 특정 포트를 허용하려면 설정
        pathname: '/**', // 모든 경로를 허용
      },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**', // 하위 경로의 모든 이미지 허용
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // 구글 프로필 이미지 도메인 추가
        port: '', // 특정 포트를 허용하려면 설정
        pathname: '/**', // 모든 경로를 허용
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net', // 카카오 프로필 이미지 도메인 추가
        port: '', // 특정 포트를 허용하려면 설정
        pathname: '/**', // 모든 경로를 허용
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
