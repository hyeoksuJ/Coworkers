import { create } from 'zustand';
import type { TaskListDto } from '../types/tasks/taskListDto';
import type { TaskDto } from '../types/tasks/taskDto';
import type { CommentDto } from '../types/tasks/commentDto';

interface TaskListStore {
  groupId?: number;
  taskListId: number | undefined;
  taskLists: TaskListDto[];
  tasks: TaskDto[]; // 선택된 taskList의 tasks[] 데이터
  task?: TaskDto; // 선택된 task 데이터
  taskId?: number | undefined; // 선택된 taskID
  isSidebarOpen: boolean; // task의 sidebar 상태
  comments: CommentDto[]; // task의 comments[] 데이터
  commentId: number;
  SelectedCommentId: number;
  taskCompletionStatus: Record<number, boolean>; // 각 작업의 완료 상태

  setGroupId: (groupId: number) => void;
  setTaskLists: (taskLists: any) => void;
  setTaskListId: (id: number | undefined) => void;
  setTasks: (tasks: TaskDto[]) => void;
  setTask: (task: TaskDto) => void;
  setTaskId: (taskId: number | undefined) => void;
  setTaskCompletionStatus: (taskId: number, doneAt: string | null) => void; // Task의 완료 상태 설정
  setSidebarOpen: (isOpen: boolean) => void;
  setComments: (comments: CommentDto[]) => void;
  setCommentId: (commentId: number) => void;
  setSelectedCommentId: (commentId: number) => void;
}

const initialTaskLists: TaskListDto[] = [
  {
    groupId: 0,
    id: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
    displayIndex: 0,
    tasks: [],
  },
];

const initialSelectedTasks: TaskDto[] = [
  {
    id: 0,
    updatedAt: '',
    date: '',
    doneAt: null,
    recurringId: 0,
    name: '',
    description: '',
    frequency: 'ONCE',
    deletedAt: null,
    displayIndex: 0,
    recurring: {
      id: 0,
      name: '',
      description: '',
      createdAt: '',
      updatedAt: '',
      startDate: '',
      frequencyType: 'ONCE',
      weekDays: [],
      monthDay: null,
      taskListId: 0,
      groupId: 0,
      writerId: 0,
    },
    writer: {
      id: 0,
      nickname: '',
      image: null,
    },
    doneBy: {
      user: null,
    },
    commentCount: 0,
  },
];

const initialTask: TaskDto = {
  id: 0,
  updatedAt: '',
  date: '',
  doneAt: null,
  recurringId: 0,
  name: '',
  description: '',
  frequency: 'ONCE',
  deletedAt: null,
  displayIndex: 0,
  recurring: {
    id: 0,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    startDate: '',
    frequencyType: 'ONCE',
    weekDays: [],
    monthDay: null,
    taskListId: 0,
    groupId: 0,
    writerId: 0,
  },
  writer: {
    id: 0,
    nickname: '',
    image: null,
  },
  doneBy: {
    user: null,
  },
  commentCount: 0,
};

const initialComments = [
  {
    id: 0,
    writer: {
      image: null,
      nickname: '',
      id: 0,
    },
    content: '',
    createdAt: '',
    updatedAt: '',
  },
];

export const useTaskListStore = create<TaskListStore>((set) => ({
  groupId: undefined,
  taskLists: initialTaskLists,
  taskListId: undefined,
  tasks: initialSelectedTasks,
  taskId: 0,
  task: initialTask,
  taskCompletionStatus: {},
  isSidebarOpen: false,
  comments: initialComments,
  commentId: 0,
  SelectedCommentId: 0,

  setGroupId: (groupId: number) => set({ groupId }),
  setTaskLists: (taskLists) => set({ taskLists }),
  setTaskListId: (id: number | undefined) => set({ taskListId: id }),
  setTasks: (tasks: TaskDto[]) => set({ tasks }),
  setTask: (task: TaskDto | undefined) => set({ task }),
  setTaskId: (taskId: number | undefined) => set({ taskId }),
  setTaskCompletionStatus: (taskId, doneAt) => {
    const isDone = doneAt !== null;
    set((state) => ({
      tasks: state.tasks.map(
        (task) =>
          task.id === taskId ? { ...task, doneAt, done: isDone } : task // done 값을 업데이트
      ),
      taskCompletionStatus: {
        ...state.taskCompletionStatus,
        [taskId]: isDone,
      },
    }));
  },
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setComments: (comments: CommentDto[]) => set({ comments }),
  setCommentId: (commentId: number) => set({ commentId }),
  setSelectedCommentId: (commentId: number) => set({ taskId: commentId }),
}));
