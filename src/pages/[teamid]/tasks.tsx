import { useEffect } from 'react';
import { useDate } from '@/src/contexts/DateContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTaskListStore } from '@/src/stores/taskListStore';
import { getTaskLists, getTaskList } from '@/src/api/tasks/taskListAPI';
import TaskDate from '@components/tasks/TaskDate';
import TaskList from '@components/tasks/TaskList';
import AddTaskButton from '@components/tasks/UI/button/AddTaskButton';
import LoadingSpinner from '@components/@shared/LoadingSpinner';
import UserNotFound from '@components/@shared/UserNotFound';
import { toKSTISOString } from '@utils/toKSTISOString';

export default function TasksPage() {
  const { date } = useDate();
  const router = useRouter();
  const { query } = router;
  const { teamid } = query;
  const {
    groupId,
    taskListId,
    setTasks,
    setGroupId,
    setTaskLists,
    setTaskListId,
  } = useTaskListStore();

  // GET, taskList 및 tasks[]
  const { data: taskListData, isError: taskListError } = useQuery({
    queryKey: ['tasks', taskListId, toKSTISOString(date)],
    queryFn: () =>
      getTaskList({
        id: taskListId,
        date: toKSTISOString(date),
      }),
    enabled: !!taskListId && !!date,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  // store, taskListData
  useEffect(() => {
    if (taskListData) {
      setGroupId(taskListData.groupId);
      setTaskListId(taskListData.id);
      setTasks(taskListData.tasks);
    }
  }, [taskListData, setGroupId, setTaskListId, setTasks]);

  // GET, group의 taskLists
  const {
    data: taskListsData,
    isLoading: taskListsLoading,
    isError: taskListsError,
  } = useQuery({
    queryKey: ['tasks', groupId, teamid],
    queryFn: () => getTaskLists({ groupId }),
    enabled: !!groupId,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  // store, taskListsData
  useEffect(() => {
    if (taskListsData) {
      setTaskLists(taskListsData.taskLists);
    }
  }, [taskListsData, setTaskLists]);

  const isError = taskListError || taskListsError;

  if (taskListsLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <UserNotFound />;
  }

  return (
    <main className="flex flex-col gap-6 px-4 py-6 text-left md:px-6 xl:mx-auto xl:max-w-[1200px] xl:px-0 xl:pt-10">
      <TaskDate />
      <TaskList />
      <AddTaskButton />
    </main>
  );
}
