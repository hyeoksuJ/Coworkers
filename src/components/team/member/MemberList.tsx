import { useModal } from '@hooks/useModal';
import { useTeamStore } from '@/src/stores/teamStore';
import { Option } from '@components/@shared/Dropdown';
import MemberBox from './MemberBox';
import InvitationModal from './InvitationModal';
import styles from '../../../styles/scroll.module.css';
import OptionDropdown from '../OptionDropdown';
import EmailInvitationModal from './EmailInvitationModal';

export default function MemberList() {
  const {
    isOpen: tokenIsOpen,
    onOpen: tokenOpenModal,
    onClose: tokenCloseModal,
  } = useModal();

  const {
    isOpen: emailIsOpen,
    onOpen: emailOpenModal,
    onClose: emailCloseModal,
  } = useModal();
  const { members } = useTeamStore();

  const memberCount = members.length;

  // 드롭다운에서 선택된 옵션을 처리하는 함수
  const handleSelect = (option: Option) => {
    if (option.label === 'token') {
      tokenOpenModal(); // '수정하기'를 선택했을 때
    } else {
      emailOpenModal();
    } // '삭제하기'를 선택했을 때
  };

  const InviteButton = (
    <button
      type="button"
      className="cursor-pointer rounded-lg p-1 text-md-regular text-brand-primary hover:bg-[#eeeeee12]"
    >
      +새로운 멤버 초대하기
    </button>
  );

  return (
    <div>
      <div className="my-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px]">
            <p className="text-lg-medium">멤버</p>
            <p className="text-lg-regular text-text-default">
              ({memberCount}명)
            </p>
          </div>
          <OptionDropdown triggerIcon={InviteButton} onSelect={handleSelect} />
          <InvitationModal isOpen={tokenIsOpen} onClose={tokenCloseModal} />
          <EmailInvitationModal
            isOpen={emailIsOpen}
            onClose={emailCloseModal}
          />
        </div>
      </div>
      <div className={`max-h-[320px] overflow-y-auto ${styles.taskListScroll}`}>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[20px]">
          {members.map((member) => (
            <MemberBox
              key={member.userId}
              userId={member.userId}
              userName={member.userName}
              userEmail={member.userEmail}
              userImage={member.userImage}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
