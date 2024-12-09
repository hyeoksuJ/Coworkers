import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { inviteMember } from '@/src/api/team/memberAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTeamStore } from '@/src/stores/useTeamStore';
import Snackbar from '@components/article/Snackbar';
import SuccessIcon from 'public/icons/successicon.svg';
import FailIcon from 'public/icons/failIcon.svg';
import { useState } from 'react';
import { Input } from '@components/@shared/Input';
import useClipboardCopy from '@hooks/useClipBoardCopy';
import { postAcceptInvitation } from '@/src/api/addteam/participateTeamAPI';

interface EmailInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailInvitationModal({
  isOpen,
  onClose,
}: EmailInvitationModalProps) {
  const { showSnackbar, isSnackBarOpen, snackBarMessage, snackBarType } =
    useClipboardCopy();
  const [emailValue, setEmailValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [icon, SetIcon] = useState(<SuccessIcon />);
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();

  const { id, members } = useTeamStore();

  const { data: teamToken } = useQuery({
    queryKey: ['inviteMember', id],
    queryFn: () => inviteMember(Number(id)),
  });

  // 그룹 내에 존재하는 팀원인지 판별
  const isAlreadyMember =
    members && members.find((member) => member.userEmail === emailValue);

  // 그룹 수정 Mutation
  const inviteMemberByEmail = useMutation({
    mutationFn: ({ userEmail, token }: { userEmail: string; token: string }) =>
      postAcceptInvitation(userEmail, token),
    onSuccess: () => {
      onClose();
      setEmailValue('');
      SetIcon(<SuccessIcon />);
      showSnackbar('멤버 초대 성공!', 'success');
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: (error: any) => {
      if (error.response?.data?.message === '유저가 존재하지 않습니다.') {
        setIsError(true);
        setErrorMessage('존재하지 않는 유저입니다.');
        SetIcon(<FailIcon />);
        showSnackbar('멤버 초대 실패', 'error');
      } else {
        SetIcon(<FailIcon />);
        showSnackbar('멤버 초대 실패', 'error');
        setEmailValue('');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsError(false);
    setEmailValue(value);
  };

  const handleInviteClick = () => {
    if (isAlreadyMember) {
      setIsError(true);
      setErrorMessage('이미 그룹에 소속된 유저입니다.');
      SetIcon(<FailIcon />);
      showSnackbar('멤버 초대 실패', 'error');
    }
    if (teamToken && emailValue !== '') {
      inviteMemberByEmail.mutate({ userEmail: emailValue, token: teamToken });
    }
  };

  const handleClose = () => {
    onClose();
    setEmailValue('');
    setIsError(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        isXButton
        onClose={handleClose}
        array="column"
        padding="default"
        bgColor="primary"
        fontSize="16"
        fontArray="center"
        gap="40"
      >
        <Modal.Wrapper array="column">
          <Modal.Header fontColor="primary">멤버 초대</Modal.Header>
          <Modal.Content fontColor="secondary" fontSize="14" fontArray="center">
            <p className="mt-[20px]">이메일을 입력해 멤버를 초대합니다.</p>
            <Input
              placeholder="이메일을 입력해주세요."
              onChange={handleChange}
              errorMessage={errorMessage}
              isError={isError}
              className="mt-[20px]"
            />
          </Modal.Content>
        </Modal.Wrapper>
        <Button
          className="mt-[-20px]"
          size="full"
          onClick={handleInviteClick}
          disabled={emailValue === ''}
        >
          초대하기
        </Button>
      </Modal>
      {isSnackBarOpen && (
        <Snackbar icon={icon} message={snackBarMessage} type={snackBarType} />
      )}
    </>
  );
}
