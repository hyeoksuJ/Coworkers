import ProfileEditIcon from 'public/icons/profile_edit.svg';
import { useEffect, useRef, useState } from 'react';
import { useUserData } from '@hooks/mysetting/useUserData';
import { useProfileChange } from '@hooks/mysetting/useProfileChange';
import { useImageURL } from '@hooks/mysetting/useImageURL';
import { useNicknameChange } from '@hooks/mysetting/useNicknameChange';
import { Input } from '@components/@shared/Input';
import clsx from 'clsx';
import Button from '@components/@shared/Button';
import getRandomDonut from '@utils/getRandomDonut';
import Image from 'next/image';
import Dropdown, { Option } from '@components/@shared/Dropdown';
import Snackbar from '@components/article/Snackbar';
import SuccessIcon from 'public/icons/successicon.svg';
import ErrorIcon from 'public/icons/erroricon.svg';
import PasswordInput from './PasswordInput';

export default function InputTask() {
  const [imageSnackBar, setImageSnackbar] = useState(false);
  const [nickNameSnackBar, setNickNameSnackbar] = useState(false);
  const [nickNameErrorSnackBar, setNickNameErrorSnackBar] = useState(false);
  const [profileNickname, setProfileNickname] = useState<string>('');
  const [ProfileImage, setProfileImage] = useState<string | JSX.Element>(
    <ProfileEditIcon />
  );
  const [isError, setIsError] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const { data } = useUserData();
  const mutation = useProfileChange();
  const nicknameMutation = useNicknameChange();

  const mutationImage = useImageURL();

  const handleImageClickSnackbar = () => {
    setImageSnackbar(true);
    setTimeout(() => {
      setImageSnackbar(false);
    }, 2000);
  };

  const handleNicknameErrorSnackbar = () => {
    setNickNameErrorSnackBar(true);
    setTimeout(() => {
      setNickNameErrorSnackBar(false);
    }, 2000);
  };

  // 프로필 업데이트 하는 핸들러 (PATCH)
  const handelImageChange = (imageURL: string) => {
    if (imageURL) {
      mutation.mutate({ image: imageURL });
      handleImageClickSnackbar();
    }
  };

  const handleDefaultImageChange = (Default: string | null) => {
    mutation.mutate({ image: Default });
  };

  const handleClickSnackbar = () => {
    setNickNameSnackbar(true);
    setTimeout(() => {
      setNickNameSnackbar(false);
    }, 2000);
  };

  const handelNicknameChangeSubmit = () => {
    if (profileNickname) {
      nicknameMutation.mutate({ nickname: profileNickname });
      handleClickSnackbar();
    }
    if (data?.nickname === profileNickname) {
      handleNicknameErrorSnackbar();
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

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProfileNickname(value);
    setIsError(value.length > 10);
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

  const resetToDefaultImage = () => {
    if (fileInput.current) {
      fileInput.current.value = ''; // 파일 입력 필드 값 초기화
    }
    handleDefaultImageChange(getRandomDonut()); // 기본 이미지로 설정
    handleImageClickSnackbar();
  };

  const basic: Option[] = [
    {
      label: '프로필 이미지 변경',
      component: (
        <div
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click();
            }
          }}
        >
          프로필 변경
        </div>
      ),
    },
    {
      label: '기본 이미지 변경',
      component: (
        <div
          onClick={() => {
            if (fileInput.current) {
              resetToDefaultImage();
            }
          }}
        >
          기본 이미지
        </div>
      ),
    },
  ];

  return (
    <main className="mx-6 flex max-w-[792px] flex-col gap-6">
      <div>
        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <div className="relative inline-block rounded-full">
          <Dropdown
            options={basic}
            triggerIcon={ProfileImage}
            optionsWrapClass="mt-2 right-0 rounded-[12px] border border-background-tertiary"
            optionClass="rounded-[12px] md:w-[135px] md:h-[47px] w-[120px] h-[40px] justify-center text-md-regular md:text-lg-regular text-center hover:bg-background-tertiary"
          />

          <div className="absolute bottom-[-2px] right-[-2px] mb-[6.5px] h-[25px] w-[25px]">
            <Image src="/icons/button_edit.svg" alt="수정 버튼 아이콘" fill />
          </div>
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Input
          label="이름"
          inputProps={{
            onChange: handleNicknameChange,
            value: profileNickname,
          }}
          isError={isError}
          errorMessage="이름은 10글자 내외입니다."
        />
        <div
          className={clsx('absolute bottom-[16px] right-3', {
            hidden: isError === true,
            block: isError === false,
          })}
        >
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
      {nickNameSnackBar && (
        <Snackbar
          icon={<SuccessIcon />}
          message="닉네임 변경 완료"
          type="success"
        />
      )}
      {imageSnackBar && (
        <Snackbar
          icon={<SuccessIcon />}
          message="프로필 변경 완료"
          type="success"
        />
      )}
      {nickNameErrorSnackBar && (
        <Snackbar
          icon={<ErrorIcon />}
          message="동일한 이름입니다."
          type="error"
        />
      )}
    </main>
  );
}
