import Image from 'next/image';
import ProfileEditIcon from 'public/icons/profile_edit.svg';
import { useEffect, useRef, useState } from 'react';

interface ProfileImageInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (file: File | null) => void;
  initialFile?: string | null;
}

export default function ProfileImageInput({
  onFileChange,
  initialFile = null,
}: ProfileImageInputProps) {
  const [profileImage, setProfileImage] = useState(initialFile);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && reader.result) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);

      // 부모 컴포넌트에 파일 전달
      onFileChange(file);
    } else {
      // 파일이 없으면 이미지 제거
      setProfileImage(null);
      onFileChange(null);
    }
  };

  useEffect(() => {
    setProfileImage(initialFile);
  }, [initialFile]);

  // 컴포넌트 언마운트 시 이미지 메모리에서 제거
  useEffect(() => {
    return () => {
      setProfileImage(null);
    };
  }, []);

  return (
    <main className="flex max-w-[792px] flex-col">
      <div className="relative inline-block">
        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click();
            }
          }}
          className="relative rounded-[50%]"
          style={{ border: profileImage ? '3px solid #64748B' : undefined }}
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt="프로필 이미지"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <ProfileEditIcon />
          )}

          <div className="absolute bottom-[-2px] right-[-2px] h-[25px] w-[25px]">
            <Image src="/icons/button_edit.svg" alt="수정 버튼 아이콘" fill />
          </div>
        </button>
      </div>
    </main>
  );
}
