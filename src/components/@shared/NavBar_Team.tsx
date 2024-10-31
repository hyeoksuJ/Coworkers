import ArrowDown from 'public/icons/arrow_down.svg';
import { useModal } from '@hooks/useModal';
import AddTeamModal from '@components/team/AddTeamModal';
import { useRouter } from 'next/router';
import { useTeamStore } from '@/src/stores/teamStore';
import PCLogo from 'public/images/logo_pc.png';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Dropdown, { Option } from '@components/@shared/Dropdown';
import { User } from '@/src/types/mysetting/settingData';
import Menu from 'public/icons/menu.svg';
import Link from 'next/link';
import Button from './Button';
import SideBar from './SideBar';
import TeamItem from './TeamItem';

interface Team {
  id: number;
  name: string;
}

export default function NavBarTeam({ data }: { data: User }) {
  const [selectedTeam, setSelectedTeam] = useState<Option | null>({
    label: '팀 메뉴',
    component: (
      <Button bgColor="transparent" border="white" size="full" height={40}>
        + 팀 추가하기
      </Button>
    ),
  });
  const [isLogoOnlyPage, setIsLogoOnlyPage] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const router = useRouter();
  const { id } = useTeamStore();

  const {
    isOpen: addIsOpen,
    onOpen: addOpenModal,
    onClose: addCloseModal,
  } = useModal();

  const handleTeamSelect = useCallback(
    (groupId: number) => {
      router.push(`/${groupId}`);
      setIsLeftOpen(false);
    },
    [router]
  );

  const [teamArray, setTeamArray] = useState<Team[]>([]);

  useEffect(() => {
    if (data) {
      // teamArray를 data로부터 업데이트
      const updatedTeamArray = data.memberships.map((membership) => ({
        id: membership.groupId,
        name: membership.group.name || '',
        image: membership.group.image,
      }));

      setTeamArray(updatedTeamArray); // 상태 업데이트
    }
  }, [data]); // data가 변경될 때마다 실행

  const teams: Option[] = useMemo(() => {
    return [
      ...(data?.memberships?.map((membership) => ({
        label: membership.group.name || '',
        id: membership.group.id,
        component: (
          <div
            className="flex items-center justify-between overflow-hidden "
            onClick={() => handleTeamSelect(membership.groupId)}
          >
            <div className="flex items-center justify-between gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
              <div className="v relative h-[30px] w-[30px] shrink-0">
                <Image
                  src={membership.group.image}
                  alt="팀 이미지"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                {membership.group.name}
              </p>
            </div>
          </div>
        ),
      })) || []),
      {
        label: '팀 메뉴',
        component: (
          <Button bgColor="transparent" border="white" size="full" height={40}>
            + 팀 추가하기
          </Button>
        ),
      },
    ];
  }, [data, handleTeamSelect]);
  // teams 배열을 useEffect로 설정
  useEffect(() => {
    // 현재 ID에 해당하는 팀을 찾습니다.
    const currentTeam = teams.find((team) => team.id === Number(id));

    // 팀이 존재하면 selectedTeam 상태를 업데이트합니다.
    if (currentTeam) {
      setSelectedTeam(currentTeam);
    }
  }, [id, teams]); // teams 배열이 변할 때마다 effect가 실행됩니다.

  useEffect(() => {
    setIsClient(true);
    const logoOnlyPages = ['/signin', 'signup', 'addteam', '/'];
    // 팀참여하기 페이지, 비밀번호 재설정페이지 추가 필요
    setIsLogoOnlyPage(logoOnlyPages.includes(router.pathname));
  }, [router.pathname]);

  if (!isClient) {
    return null;
  }

  const handleSelectTeam = (option: Option) => {
    if (option.label === '팀 메뉴') {
      addOpenModal();
      return;
    }

    // 현재 팀 ID와 선택한 팀의 ID가 다를 경우에만 상태 업데이트
    if (option.id !== Number(id)) {
      setSelectedTeam(option);
    } else {
      setSelectedTeam({
        label: '팀 메뉴',
        component: (
          <Button bgColor="transparent" border="white" size="full" height={40}>
            + 팀 추가하기
          </Button>
        ),
      });
    }
  };

  const handleAddTeam = () => {
    addOpenModal();
    setIsLeftOpen(false);
  };

  return (
    <>
      <div className="md:hidden">
        <Menu
          type="button"
          className="cursor-pointer text-red-50"
          onClick={() => setIsLeftOpen(true)}
        >
          왼쪽 사이드바 열기
        </Menu>

        <SideBar
          position="left"
          isOpen={isLeftOpen}
          onClose={() => setIsLeftOpen(false)}
        >
          <nav>
            <div className="flex flex-col gap-[5px] px-[10px]">
              {teamArray.map((team) => (
                <TeamItem
                  key={team.id}
                  name={team.name}
                  isActive={team.id === Number(id)}
                  onClick={() => handleTeamSelect(team.id)}
                />
              ))}
              <Button
                bgColor="transparent"
                border="white"
                size="full"
                height={40}
                fontSize="14"
                onClick={handleAddTeam}
                className="mt-[10px]"
              >
                + 팀 추가하기
              </Button>
            </div>
          </nav>
        </SideBar>
      </div>
      <Link href="/">
        <div className="block max-xl:hidden">
          <Image src={PCLogo} alt="로고" width={158} height={32} />
        </div>
        <div className="hidden max-xl:block">
          <Image src={PCLogo} alt="로고" width={102} height={20} />
        </div>
      </Link>
      {!isLogoOnlyPage && (
        <>
          <div className="max-md:hidden">
            <Dropdown
              initialOption={teams[0]}
              options={teams}
              selected={selectedTeam}
              onSelect={handleSelectTeam}
              triggerClass="flex gap-[12px] items-center text-text-primary"
              triggerIcon={<ArrowDown />}
              optionsWrapClass="mt-[30px] flex p-[16px] rounded-[12px]"
              optionClass="px[8px] py-[7px] rounded-[8px] w-[186px] h-[46px] hover:bg-background-tertiary"
            />
            <AddTeamModal isOpen={addIsOpen} onClose={addCloseModal} />
          </div>
          <Link href="/article">
            <span className="max-md:hidden">자유게시판</span>
          </Link>
        </>
      )}
    </>
  );
}
