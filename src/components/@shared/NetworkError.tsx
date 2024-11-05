import Image from 'next/image';
import networkErrorIcon from 'public/icons/networkErrorIcon.png';
import Button from './Button';

const handleReload = () => {
  window.location.reload();
};

export default function NetworkError() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={networkErrorIcon}
        alt="네트워크 에러 아이콘"
        width={100}
        height={100}
      />
      <span className="text-2xl-bold">네트워크 에러</span>
      <Button onClick={handleReload} className="mt-4 bg-brand-tertiary">
        재시도
      </Button>
    </div>
  );
}
