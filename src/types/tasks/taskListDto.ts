// Response
export interface UserDto {
  image: string;
  nickname: string;
  id: number;
}

export interface TaskDto {
  doneBy: {
    user: UserDto;
  };
  writer: UserDto;
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  updatedAt: string;
  doneAt: string | null;
  date: string;
  description: string;
  name: string;
  id: number;
}

export interface TaskListDto {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: TaskDto[];
}

// Request
export interface TaskRequestDto {
  name: string;
  description: string | null;
  startDate: string;
  frequency: string;
  weekDays?: number[];
  monthDay?: number;
}
