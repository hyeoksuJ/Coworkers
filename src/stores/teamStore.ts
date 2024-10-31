// store.ts
import { create } from 'zustand';

export interface MemberProps {
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface DoneBy {
  user: User | null;
}

export interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

export interface TaskProps {
  id: number;
  name: string;
  description: string;
  date: string; // ISO 8601 형식
  doneAt: string | null; // ISO 8601 형식
  updatedAt: string; // ISO 8601 형식
  user: User | null; // 태스크에 할당된 사용자
  recurringId: number;
  deletedAt: string | null; // 삭제된 날짜, null일 경우 삭제되지 않음
  displayIndex: number; // 표시 순서
  writer: Writer; // 태스크 작성자
  doneBy: DoneBy; // 완료한 사용자
  commentCount: number; // 댓글 수
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE'; // 반복 주기 ('ONCE' 등)
}

export interface TaskListProps {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: TaskProps[];
}

export interface TeamDataProps {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: MemberProps[];
  taskLists: TaskListProps[];
}

export interface TeamStore {
  id: string;
  teamName: string;
  imageUrl: string;
  members: MemberProps[];
  taskLists: TaskListProps[];
  setTeamData: (data: TeamDataProps) => void;
  setTeamName: (name: string) => void;
  setImageUrl: (url: string) => void;
  setMembers: (members: MemberProps[]) => void;
  setTaskLists: (taskLists: TaskListProps[]) => void;
  clearTeamData: () => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  id: '0',
  teamName: '',
  imageUrl: '',
  members: [],
  taskLists: [],
  setTeamData: (data) =>
    set({
      id: data.id.toString(),
      teamName: data.name,
      imageUrl: data.image,
      members: data.members,
      taskLists: data.taskLists,
    }),
  setTeamName: (name) => set({ teamName: name }),
  setImageUrl: (url) => set({ imageUrl: url }),
  setMembers: (members) => set({ members }),
  setTaskLists: (taskLists) => set({ taskLists }),
  clearTeamData: () =>
    set({
      id: '0',
      teamName: '',
      imageUrl: '',
      members: [],
      taskLists: [],
    }),
}));
