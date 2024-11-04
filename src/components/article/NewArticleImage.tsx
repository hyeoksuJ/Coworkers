import { Article } from '@/src/types/article/ArticleType';
import { useImageURL } from '@hooks/mysetting/useImageURL';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ArticleImageInputProps {
  onUploadSuccess: (response: any) => void; // 성공 시 부모 컴포넌트로 값을 전달하는 콜백 함수
  data?: Article;
}

export default function ArticleImageInput({
  onUploadSuccess,
  data,
}: ArticleImageInputProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const mutationImage = useImageURL();

  useEffect(() => {
    if (data) {
      setProfileImage(data.image);
    }
  }, [data]);

  const handelImageUpload = (file: File) => {
    const formData = new FormData();
    formData.append('image', file); // 이미지 파일 추가

    mutationImage.mutate(
      { image: file },
      {
        onSuccess: (response) => {
          onUploadSuccess(response.url);
        },
      }
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 이미지 미리보기 URL 설정
      setProfileImage(URL.createObjectURL(file));

      // 파일을 서버로 전송
      handelImageUpload(file);
    }
  };

  return (
    <main className="flex max-w-[792px] flex-col">
      <div className="relative inline-block">
        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={onChange}
          accept="image/jpg, image/jpeg, image/png, image/gif, image/svg+xml"
        />
        <button
          type="button"
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click();
            }
          }}
          className="flex h-[160px] w-[160px] flex-col items-center justify-center gap-4 rounded-xl bg-background-secondary md:h-[240px] md:w-[240px]"
        >
          {profileImage ? (
            <div className="relative h-full w-full">
              <div className="absolute z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
                <Image
                  src="/icons/x_white.svg"
                  width={36}
                  height={36}
                  alt="게시글 이미지"
                />
              </div>
              <Image
                src={profileImage}
                alt="프로필 이미지"
                layout="fill"
                className="absolute z-10 h-full w-full rounded-lg object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src="/icons/plus.svg"
                width={24}
                height={24}
                alt="이미지 등록"
              />
              <span>이미지 등록</span>
            </div>
          )}
        </button>
      </div>
    </main>
  );
}
