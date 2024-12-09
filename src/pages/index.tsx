import Banner from '@components/home/Banner';
import Content from '@components/home/Content';
import Footer from '@components/home/Footer';

export default function Home() {
  return (
    <>
      <main style={{ overflowX: 'hidden' }}>
        <Banner />
        <Content />
      </main>
      <Footer />
    </>
  );
}
