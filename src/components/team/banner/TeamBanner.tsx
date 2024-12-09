import { useModal } from '@hooks/useModal';
import { Option } from '@components/@shared/Dropdown';
import { useTeamStore } from '@/src/stores/useTeamStore';
import Image from 'next/image';
import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import EditDropdown from '../EditDropdown';
import EditTeamModal from './EditTeamModal';
import DeleteTeamModal from './DeleteTeamModal';
import ProfileImageModal from '../member/ProfileImageModal';

export default function TeamBanner() {
  const { teamName, imageUrl } = useTeamStore();

  const {
    isOpen: editIsOpen,
    onOpen: editOpenModal,
    onClose: editCloseModal,
  } = useModal();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOpenModal,
    onClose: deleteCloseModal,
  } = useModal();

  const {
    isOpen: IsProfileModalOpen,
    onClose: ProfileModalClose,
    onOpen: ProfileModalOpen,
  } = useModal();

  const gearIcon = (
    <Image width={24} height={24} src="/icons/gear.svg" alt="톱니바퀴 아이콘" />
  );
  // 드롭다운에서 선택된 옵션을 처리하는 함수
  const handleSelect = (option: Option) => {
    if (option.label === 'edit') {
      editOpenModal(); // '수정하기'를 선택했을 때
    } else {
      deleteOpenModal();
    } // '삭제하기'를 선택했을 때
  };
  return (
    <SlideInMotion className="flex items-center justify-between rounded-[12px] border border-border-primary border-opacity-10 bg-background-secondary bg-[url('/images/thumbnail_team.png')] bg-contain bg-[90%] bg-no-repeat px-[24px] py-[15px]">
      <div className="flex items-center gap-[15px]">
        <div
          className="relative h-[45px] w-[45px] shrink-0 cursor-pointer rounded-[16px] bg-border-primary"
          onClick={ProfileModalOpen}
        >
          <Image
            src={imageUrl || '/icons/profile_default.png'}
            alt="팀 프로필 이미지"
            fill
            className="rounded-[16px] object-cover"
          />
        </div>
        <p className="break-words break-all text-xl-bold">{teamName}</p>
      </div>

      <EditDropdown triggerIcon={gearIcon} onSelect={handleSelect} />
      <EditTeamModal isOpen={editIsOpen} onClose={editCloseModal} />
      <DeleteTeamModal isOpen={deleteIsOpen} onClose={deleteCloseModal} />
      <ProfileImageModal
        isOpen={IsProfileModalOpen}
        onClose={ProfileModalClose}
        img={imageUrl || '/icons/profile_large.svg'}
      />
    </SlideInMotion>
  );
}
