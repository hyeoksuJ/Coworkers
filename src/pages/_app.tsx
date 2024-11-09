import NavBar from '@components/@shared/NavBar';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DateProvider } from '@/src/contexts/DateContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('userStorage');
      if (!storedUser) {
        router.push('/signin');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="팀워크로 빚은 아이디어의 도넛" />
        <meta property="og:title" content="DO'NUT" />
        <meta
          property="og:description"
          content="팀워크로 빚은 아이디어의 도넛"
        />
        <meta property="og:image" content="/images/thumbnail.png" />
        <meta
          property="og:url"
          content="https://dev-coworkers-seven.vercel.app/"
        />
        <title>DO&apos;NUT</title>
      </Head>
      <DateProvider>
        <NavBar />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </DateProvider>
    </QueryClientProvider>
  );
}
