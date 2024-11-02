import ProfileEditIcon from 'public/icons/profile_edit.svg';
import { useEffect, useRef, useState } from 'react';
import { useUserData } from '@hooks/mysetting/useUserData';
import { useProfileChange } from '@hooks/mysetting/useProfileChange';
import { useImageURL } from '@hooks/mysetting/useImageURL';
import { useNicknameChange } from '@hooks/mysetting/useNicknameChange';
import { Input } from '@components/@shared/Input';
import Button from '@components/@shared/Button';
import Image from 'next/image';
import { useModal } from '@hooks/useModal';
import PasswordInput from './PasswordInput';
import ShareModal from './ShareModal';

export default function InputTask() {
  const [profileNickname, setProfileNickname] = useState<string>('');
  const [ProfileImage, setProfileImage] = useState<string | JSX.Element>(
    <ProfileEditIcon />
  );

  const {
    isOpen: NicknameCompleteIsOpen,
    onOpen: NicknameCompleteOnOpen,
    onClose: NicknameCompleteOnClose,
  } = useModal();

  const {
    isOpen: ProfileCompleteIsOpen,
    onOpen: ProfileCompleteOnOpen,
    onClose: ProfileCompleteOnClose,
  } = useModal();

  const fileInput = useRef<HTMLInputElement | null>(null);

  const { data } = useUserData();
  const mutation = useProfileChange();
  const nicknameMutation = useNicknameChange();

  const mutationImage = useImageURL();

  // 프로필 업데이트 하는 핸들러 (PETCH)
  const handelImageChange = (imageURL: string) => {
    if (imageURL) {
      mutation.mutate({ image: imageURL });
      ProfileCompleteOnOpen();
    }
  };

  const handelNicknameChangeSubmit = () => {
    if (profileNickname) {
      nicknameMutation.mutate({ nickname: profileNickname });
      NicknameCompleteOnOpen();
    }
  };

  // 이미지 파일을 업로드하고 URL을 받는 핸들러 (POST)
  const handelImageUpload = (file: File) => {
    const formData = new FormData();
    formData.append('image', file); // 이미지 파일 추가

    mutationImage.mutate(
      { image: file },
      {
        onSuccess: (response) => {
          if (response.url) {
            handelImageChange(response.url);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (data && data.image) {
      setProfileImage(
        <Image
          width={64}
          height={64}
          src={data.image}
          alt="프로필 이미지"
          className="h-16 w-16 rounded-full object-cover"
        />
      );
    } else {
      setProfileImage(<ProfileEditIcon />);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setProfileNickname(data.nickname);
    }
  }, [data]);

  const handleNicknameChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProfileNickname(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 이미지 미리보기 설정
      setProfileImage(
        <Image
          src={URL.createObjectURL(file)} // 파일을 직접 미리보기
          alt="프로필이미지"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
      );

      // 파일을 서버로 전송
      handelImageUpload(file);
    } else {
      setProfileImage(<ProfileEditIcon />);
    }
  };

  return (
    <main className="mx-6 flex max-w-[792px] flex-col gap-6">
      <div>
        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click();
            }
          }}
          className="relative rounded-full"
        >
          {ProfileImage}
          <div className="absolute bottom-[-2px] right-[-2px] h-[25px] w-[25px]">
            <Image src="/icons/button_edit.svg" alt="수정 버튼 아이콘" fill />
          </div>
        </button>
      </div>
      <div className="relative flex w-full flex-col">
        <Input
          label="이름"
          inputProps={{
            onChange: handleNicknameChang,
            value: profileNickname,
          }}
        />
        <div className="absolute bottom-[13px] right-3">
          <Button
            onClick={handelNicknameChangeSubmit}
            fontSize="14"
            width={70}
            height={20}
          >
            변경하기
          </Button>
        </div>
      </div>

      <PasswordInput />
      <ShareModal
        isOpen={NicknameCompleteIsOpen}
        onClose={NicknameCompleteOnClose}
        ModalTaitle="닉네임 변경 완료"
      />
      <ShareModal
        isOpen={ProfileCompleteIsOpen}
        onClose={ProfileCompleteOnClose}
        ModalTaitle="프로필 변경 완료"
      />
    </main>
  );
}
