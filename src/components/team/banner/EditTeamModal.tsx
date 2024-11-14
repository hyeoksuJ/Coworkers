import { postImage } from '@/src/api/imageAPI';
import { patchGroupById } from '@/src/api/team/teamAPI';
import { useTeamStore } from '@/src/stores/useTeamStore';
import Image from 'next/image';
import Button from '@components/@shared/Button';
import { Input } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import ProfileImageInput from '@components/@shared/ProfileImageInput';
import { useValidation } from '@hooks/useValidation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { UserData } from '../member/ExileUserModal';

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTeamModal({ isOpen, onClose }: EditTeamModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { id, teamName, imageUrl, setTeamName } = useTeamStore();
  // 모달 내부에서 관리할 임시 상태
  const [localTeamName, setLocalTeamName] = useState(teamName);
  const queryClient = useQueryClient();
  const {
    errors,
    setError,
    validateOnBlur,
    validateValueOnSubmit,
    clearError,
  } = useValidation();

  // 입력값을 로컬 상태로 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 30) {
      setLocalTeamName(value);
      clearError('teamName');
    } else {
      setError('teamName', true, '30자 이하로 입력해주세요.');
    }
  };

  const handleFileChange = (imgFile: File | null) => {
    setImageFile(imgFile);
  };
  const userData = queryClient.getQueryData<UserData>(['user']);
  const TeamNames =
    userData?.memberships.map((membership) => membership.group.name) || [];

  // 팀 관리자만 삭제 가능
  const isAdmin =
    userData &&
    userData.memberships.find((m) => m.groupId === Number(id))?.role ===
      'ADMIN';

  // 그룹 수정 Mutation
  const { mutate: editGroup } = useMutation({
    mutationFn: ({
      groupId,
      image,
      name,
    }: {
      groupId: string;
      image: string;
      name: string;
    }) => patchGroupById(groupId, image, name),
    onSuccess: () => {
      onClose();
      console.log(`${teamName} 팀 정보가 성공적으로 수정되었습니다.`);
    },

    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['group', id] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('그룹 생성 실패:', error);
      setLocalTeamName(teamName);
    },
  });

  // 이미지 업로드 Mutation
  const uploadImageMutate = useMutation({
    mutationFn: (file: File) => postImage(file),
    onSuccess: (imgUrl: string) => {
      // 이미지 URL을 성공적으로 받으면 그룹 수정 요청
      if (
        validateValueOnSubmit('teamName', TeamNames, localTeamName, teamName)
      ) {
        editGroup({ groupId: id, image: imgUrl, name: localTeamName });
        setTeamName(localTeamName); // 최종적으로 store에 반영
      }
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });

  const handlePatchClick = () => {
    // 팀 관리자만 수정 가능
    if (!isAdmin) {
      return;
    }

    if (validateValueOnSubmit('teamName', TeamNames, localTeamName, teamName)) {
      if (imageFile) {
        // 새로 선택된 파일이 있으면 업로드
        uploadImageMutate.mutate(imageFile);
      } else {
        // 파일이 없으면 기존 URL로 그룹 수정
        editGroup({ groupId: id, image: imageUrl, name: localTeamName });
        setTeamName(localTeamName); // 최종적으로 store에 반영
      }
    }
  };

  const handleModalClose = () => {
    clearError('teamName');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setLocalTeamName(teamName);
    }
  }, [isOpen, teamName]);

  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={handleModalClose}
      array="column"
      padding="default"
      bgColor="primary"
    >
      {isAdmin ? (
        <>
          <p className="mb-[40px] text-center text-2xl-semibold">팀 수정하기</p>
          <p className="mb-[15px] text-lg-medium">팀 프로필</p>
          <ProfileImageInput
            onFileChange={handleFileChange}
            initialFile={imageUrl}
          />
          <p className="mt-[20px] text-lg-medium">팀 이름</p>
          <Input
            placeholder="팀 이름을 입력해주세요."
            onBlur={() => validateOnBlur('teamName', teamName)}
            inputProps={{
              value: localTeamName,
              onChange: handleChange,
            }}
            className="mb-[30px] mt-[15px]"
            errorMessage={errors.teamName?.message}
            isError={errors.teamName?.isError}
          />
        </>
      ) : (
        <Modal.Header
          fontColor="primary"
          className="flex flex-col items-center gap-[16px]"
        >
          <Image
            src="/icons/alert.svg"
            alt="경고 아이콘"
            width={24}
            height={24}
          />
          권한 없음
        </Modal.Header>
      )}
      <Modal.Content fontColor="secondary" fontSize="14" fontArray="center">
        {!isAdmin && <p className="my-[20px]">관리자만 수정할 수 있습니다.</p>}
      </Modal.Content>
      <Modal.Footer>
        {isAdmin && (
          <Button
            size="full"
            onClick={handlePatchClick}
            disabled={localTeamName === ''}
          >
            수정하기
          </Button>
        )}
        {!isAdmin && (
          <Button
            size="full"
            bgColor="white"
            fontColor="gray"
            onClick={onClose}
          >
            취소
          </Button>
        )}{' '}
      </Modal.Footer>
    </Modal>
  );
}
