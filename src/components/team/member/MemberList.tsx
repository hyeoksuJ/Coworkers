import { useModal } from '@hooks/useModal';
import { useTeamStore } from '@/src/stores/teamStore';
import MemberBox from './MemberBox';
import InvitationModal from './InvitationModal';
import styles from '../../../styles/scroll.module.css';

export default function MemberList() {
  const { isOpen, onOpen, onClose } = useModal();
  const { members } = useTeamStore();

  const memberCount = members.length;
  return (
    <div>
      <div className="my-[20px]">
        <div className="flex justify-between">
          <div className="flex gap-[10px]">
            <p className="text-lg-medium">멤버</p>
            <p className="text-lg-regular text-text-default">
              ({memberCount}명)
            </p>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="cursor-pointer text-md-regular text-brand-primary"
          >
            +새로운 멤버 초대하기
          </button>
          <InvitationModal isOpen={isOpen} onClose={onClose} />
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
