import NavBar from '@components/@shared/NavBar';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DateProvider } from '@/src/contexts/DateContext';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DateProvider>
        <NavBar />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </DateProvider>
    </QueryClientProvider>
  );
}
