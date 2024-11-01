import { useEffect } from 'react';
import Image from 'next/image';
import CalenderIcon from '@icons/calendar_large.svg';
import UserProfileIcon from '@icons/profile_small.svg';
import RepeatIcon from '@icons/repeat.svg';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useTaskListStore } from '@/src/stores/taskListStore';
import { useDate } from '@/src/contexts/DateContext';
import { toKSTISOString } from '@utils/toKSTISOString';
import { getTask, patchTask, TaskUrlParams } from '@/src/api/tasks/taskAPI';
import {
  formatTaskCardDate,
  formatTaskWriterDate,
} from '@utils/getFormattedDate';
import type { TaskRequestBody } from '@/src/types/tasks/taskDto';

import SideBar from '@components/@shared/SideBar';
import { TaskComments } from './TaskComments';

interface TaskSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskSideBar({ isOpen, onClose }: TaskSideBarProps) {
  const router = useRouter();
  const { taskId } = router.query;
  const { date } = useDate();
  const {
    taskCompletionStatus,
    setTaskCompletionStatus,
    task,
    setTask,
    setTaskId,
  } = useTaskListStore();

  // GET, task
  const {
    data: taskData,
    isLoading: taskLoading,
    isError: taskError,
  } = useQuery({
    queryKey: ['tasks', taskId, toKSTISOString(date)],
    queryFn: () =>
      getTask({
        taskId: Number(taskId),
        date: toKSTISOString(date),
      }),
    enabled: !!taskId && !!date,
  });

  // store
  useEffect(() => {
    if (taskData) {
      setTask(taskData);
    }
  }, [taskData, setTask]);

  useEffect(() => {
    if (taskId) {
      setTaskId(Number(taskId));
    }
  }, [taskId, setTaskId]);

  // 완료 버튼 클릭 핸들러
  const handleCompleteClick = async () => {
    if (taskId) {
      const currentTaskStatus =
        taskCompletionStatus[Number(taskId)]?.done ?? false;

      const patchData: TaskRequestBody['patch'] = {
        name: taskData.name,
        description: taskData.description ? taskData.description : '',
        done: !currentTaskStatus,
      };

      const params: TaskUrlParams = {
        taskId: Number(taskId),
      };

      setTaskCompletionStatus(
        Number(taskId),
        !currentTaskStatus,
        taskData.name,
        taskData.description
      );

      await patchTask(params, patchData);
    }
  };

  return (
    <SideBar
      position="right"
      isOpen={isOpen}
      onClose={onClose}
      button={
        taskCompletionStatus[Number(taskId)]?.done
          ? 'cancelbutton'
          : 'completebutton'
      }
      clickEvent={handleCompleteClick}
    >
      {taskLoading && <p className="mx-5 mt-14">Loading...</p>}
      {taskError && (
        <p className="mx-5 mt-14">세부 정보를 불러오지 못했습니다.</p>
      )}

      {task ? (
        <>
          <section className="mx-5 flex flex-col gap-4 pt-4">
            <h1 className="text-xl-bold text-text-primary">{task.name}</h1>
            <ul className="flex items-center text-md-medium text-text-primary">
              <li className="flex flex-1 items-center gap-3">
                {task.writer.image ? (
                  <Image
                    alt="유저 프로필 이미지"
                    src={task.writer.image}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserProfileIcon />
                )}
                <span>{task.writer.nickname}</span>
              </li>
              <li className="text-text-secondary">
                {task.recurring?.createdAt
                  ? formatTaskWriterDate(task.recurring.createdAt)
                  : '날짜 없음'}
              </li>
            </ul>
            <ul className="flex items-center gap-[10px] text-xs-regular text-text-default">
              <CalenderIcon />
              <li>{formatTaskCardDate(task.date)}</li>
              <div className="h-3 border-[1px] border-slate-700" />
              <RepeatIcon />
              <li>{task.frequency}</li>
            </ul>
          </section>
          <section className="mx-5 my-4 pb-32 md:pb-48 xl:pb-60">
            <p>{task.description}</p>
          </section>
          <TaskComments />
        </>
      ) : (
        <p className="mx-5 mt-14">세부 정보가 없습니다.</p>
      )}
    </SideBar>
  );
}
