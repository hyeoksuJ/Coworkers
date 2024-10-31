// Request
export interface TaskRequestBody {
  post: {
    name: string; // 제목
    description: string | null; // 메모
    startDate: string; // 시작 날짜
    frequencyType: string; // 반복 주기
    weekDays?: number[]; // 주 반복, 요일 값
    monthDay?: number | null; // 월 반복, 월의 날짜 값
  };
  patch: {
    name: string;
    description: string | null;
    done: boolean; // 완료 상태
  };
  patchOrder: {
    displayIndex: number;
  };
}

// Response
export interface UserDto {
  image: string | null;
  nickname: string;
  id: number;
}

export interface RecurringDto {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  frequencyType: string;
  weekDays: number[];
  monthDay: string | null;
  taskListId: number;
  groupId: number;
  writerId: number;
}

export interface TaskDto {
  doneBy: {
    user: null | UserDto;
  };
  writer: UserDto;
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  recurring?: RecurringDto;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
  updatedAt: string;
  doneAt: string | null;
  date: string;
  description: string;
  name: string;
  id: number;
}
