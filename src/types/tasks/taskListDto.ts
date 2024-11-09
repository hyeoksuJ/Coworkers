import type { TaskDto } from './taskDto';

// Request
export interface TaskListRequestBody {
  post: {
    name: string;
  };
  patch: {
    name: string;
  };
  patchOrder: {
    displayIndex: number;
  };
}

// Response
export interface TaskListDto {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number | undefined;
  tasks: TaskDto[];
}
