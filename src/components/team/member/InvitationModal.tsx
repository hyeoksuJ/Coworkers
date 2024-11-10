import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import { inviteMember } from '@/src/api/team/memberAPI';
import { useQuery } from '@tanstack/react-query';
import { useTeamStore } from '@/src/stores/teamStore';
import Snackbar from '@components/article/Snackbar';
import SuccessIcon from 'public/icons/successicon.svg';
import useClipboardCopy from '@hooks/useClipBoardCopy';
import { useModal } from '@hooks/useModal';
import Image from 'next/image';
import HowToModal from './HowToModal';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvitationModal({
  isOpen,
  onClose,
}: InvitationModalProps) {
  const {
    isOpen: IsHowToModalOpen,
    onClose: HowToModalClose,
    onOpen: HowToModalOpen,
  } = useModal();

  const { isSnackBarOpen, snackBarMessage, snackBarType, handleCopyClick } =
    useClipboardCopy();

  const { id } = useTeamStore();

  const { data: token } = useQuery({
    queryKey: ['inviteMember', id],
    queryFn: () => inviteMember(Number(id)),
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        isXButton
        onClose={onClose}
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
            <p className="mt-[20px]">
              그룹에 참여할 수 있는 링크를 복사합니다.
            </p>
            <button
              type="button"
              onClick={HowToModalOpen}
              className="mt-[25px] w-fit cursor-pointer rounded-lg px-2 text-sm-semibold text-brand-primary underline hover:bg-[#eeeeee12]"
            >
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/question.svg"
                  alt="물음표 아이콘"
                  width={13}
                  height={13}
                  quality={100}
                  className="rounded-[16px] object-contain"
                />
                어떻게 사용하나요?
              </div>
            </button>
            <HowToModal isOpen={IsHowToModalOpen} onClose={HowToModalClose} />
          </Modal.Content>
        </Modal.Wrapper>
        <Button
          className="mt-[-20px]"
          size="full"
          onClick={() => handleCopyClick(token, onClose)}
        >
          링크 복사하기
        </Button>
      </Modal>
      {isSnackBarOpen && (
        <Snackbar
          icon={<SuccessIcon />}
          message={snackBarMessage}
          type={snackBarType}
        />
      )}
    </>
  );
}
