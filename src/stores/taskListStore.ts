import { create } from 'zustand';
import type { TaskListDto } from '../types/tasks/taskListDto';
import type { TaskDto } from '../types/tasks/taskDto';
import type { CommentDto } from '../types/tasks/commentDto';

interface TaskListStore {
  groupId?: number;
  taskListId: number | undefined;
  taskLists: TaskListDto[];
  selectedTaskListName: string;
  tasks: TaskDto[]; // 선택된 taskList의 tasks[] 데이터
  task?: TaskDto; // 선택된 task 데이터
  taskId?: number | undefined; // 선택된 taskID
  isSidebarOpen: boolean; // task의 sidebar 상태
  comments: CommentDto[]; // task의 comments[] 데이터
  commentId: number;
  editingCommentId: number | undefined;
  SelectedCommentId: number;
  taskCompletionStatus: {
    [taskId: number]: {
      done: boolean;
      name: string;
      description: string;
    };
  };

  setGroupId: (groupId: number) => void;
  setTaskLists: (taskLists: any) => void;
  setTaskListId: (id: number | undefined) => void;
  setSelectedTaskListName: (selectedTaskListName: string) => void;
  setTasks: (tasks: TaskDto[]) => void;
  setTask: (task: TaskDto) => void;
  setTaskId: (taskId: number | undefined) => void;
  setTaskCompletionStatus: (
    taskId: number,
    taskDone: boolean,
    taskName: string,
    taskDescription: string
  ) => void; // Task의 완료 상태
  setSidebarOpen: (isOpen: boolean) => void;
  setComments: (comments: CommentDto[]) => void;
  setCommentId: (commentId: number) => void;
  setEditingCommentId: (commentId: number | undefined) => void;
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
    user: {
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
  selectedTaskListName: '',
  tasks: initialSelectedTasks,
  taskId: 0,
  task: initialTask,
  taskCompletionStatus: {
    0: { done: false, name: '', description: '' },
  },
  isSidebarOpen: false,
  comments: initialComments,
  commentId: 0,
  editingCommentId: undefined,
  SelectedCommentId: 0,

  setGroupId: (groupId: number) => set({ groupId }),
  setTaskLists: (taskLists) => set({ taskLists }),
  setTaskListId: (id: number | undefined) => set({ taskListId: id }),
  setSelectedTaskListName: (selectedTaskListName) =>
    set({ selectedTaskListName }),
  setTasks: (tasks: TaskDto[]) => set({ tasks }),
  setTask: (task: TaskDto | undefined) => set({ task }),
  setTaskId: (taskId: number | undefined) => set({ taskId }),
  setTaskCompletionStatus: (
    taskId: number,
    taskDone: boolean,
    taskName: string,
    taskDescription: string
  ) => {
    const updatedTask = {
      done: taskDone,
      name: taskName,
      description: taskDescription,
    };
    set((state) => ({
      taskCompletionStatus: {
        ...state.taskCompletionStatus,
        [taskId]: updatedTask,
      },
    }));
  },
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setComments: (comments: CommentDto[]) => set({ comments }),
  setCommentId: (commentId: number) => set({ commentId }),
  setEditingCommentId: (commentId: number | undefined) =>
    set({ editingCommentId: commentId }),
  setSelectedCommentId: (commentId: number) => set({ taskId: commentId }),
}));
