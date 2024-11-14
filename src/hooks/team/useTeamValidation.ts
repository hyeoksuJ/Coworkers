// useTeamValidation.ts

import { UserData } from '@components/team/member/ExileUserModal';
import { useValidation } from '@hooks/useValidation';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useTeamValidation = (initialTeamName: string) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserData>(['user']);
  const { errors, setError, clearError, validateValueOnSubmit } =
    useValidation();
  const [localTeamName, setLocalTeamName] = useState(initialTeamName);

  // 팀 이름 변경 핸들러
  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 30) {
      setLocalTeamName(value);
      clearError('teamName');
    } else {
      setError('teamName', true, '30자 이하로 입력해주세요.');
    }
  };

  // 기존 팀 이름 목록 가져오기
  const existingTeamNames =
    userData?.memberships.map((membership) => membership.group.name) || [];

  // 팀 이름 중복 체크
  const validateTeamName = () => {
    if (!validateValueOnSubmit('teamName', existingTeamNames, localTeamName)) {
      setError('teamName', true, '이미 존재하는 이름입니다.');
      return false;
    }
    return true;
  };

  return {
    localTeamName,
    setLocalTeamName,
    handleTeamNameChange,
    validateTeamName,
    errors,
  };
};
