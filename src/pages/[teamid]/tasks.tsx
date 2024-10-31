import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDate } from '@/src/contexts/DateContext';
import { useQuery } from '@tanstack/react-query';
import { useTaskListStore } from '@/src/stores/taskListStore';
import { getTaskLists, getTaskList } from '@/src/api/tasks/taskListAPI';
import TaskDate from '@components/tasks/Layout/TaskDate';
import TaskList from '@components/tasks/Layout/TaskList';
import AddTaskButton from '@components/tasks/UI/AddTaskButton';
import { toKSTISOString } from '@utils/toKSTISOString';

export default function TasksPage() {
  const router = useRouter();
  const { teamid } = router.query;
  const { date } = useDate();
  const taskListId = parseInt(teamid as string, 10) || undefined;

  const { groupId, setTasks, setGroupId, setTaskLists, setTaskListId } =
    useTaskListStore();

  // GET, taskList 및 tasks[]
  const { data: taskListData } = useQuery({
    queryKey: ['tasks', taskListId, toKSTISOString(date)],
    queryFn: () =>
      getTaskList({
        id: taskListId,
        date: toKSTISOString(date),
      }),
    enabled: !!taskListId && !!date,
    refetchOnWindowFocus: true,
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
    queryKey: ['tasks', groupId],
    queryFn: () => getTaskLists({ groupId }),
    enabled: !!groupId,
    refetchOnWindowFocus: true,
  });

  // store, taskListsData
  useEffect(() => {
    if (taskListsData) {
      setTaskLists(taskListsData.taskLists);
    }
  }, [taskListsData, setTaskLists]);

  if (taskListsLoading) return <div>리스트 페이지 로딩 중...</div>;
  if (taskListsError) return <div>리스트 페이지 로딩 에러</div>;

  return (
    <main className="flex flex-col gap-6 px-4 pt-6 text-left md:px-6 xl:mx-auto xl:max-w-[1200px] xl:px-0 xl:pt-10">
      <TaskDate />
      <TaskList />
      <AddTaskButton />
    </main>
  );
}
