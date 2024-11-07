import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTask, TaskUrlParams } from '@/src/api/tasks/taskAPI';
import ActiveCheckBoxIcon from '@icons/checkbox_active.svg';
import InActiveCheckBoxIcon from '@icons/checkbox_inactive.svg';
import { useTaskListStore } from '@/src/stores/taskListStore';
import type { TaskRequestBody } from '@/src/types/tasks/taskDto';
import ClickMotion from '@components/@shared/animation/ClickMotion';

interface CheckBoxProps {
  taskId: number;
  taskName: string;
  taskDescription: string;
  doneAt: string | null;
}

export default function CheckBox({
  taskName,
  taskDescription,
  taskId,
  doneAt,
}: CheckBoxProps) {
  const queryClient = useQueryClient();
  const { taskCompletionStatus, setTaskCompletionStatus } = useTaskListStore();

  const isChecked = taskCompletionStatus[taskId]?.done ?? doneAt !== null;

  // PATCH, task의 완료 상태
  const { mutate: patchTaskDone } = useMutation({
    mutationFn: async ({
      params,
      data,
    }: {
      params: TaskUrlParams;
      data: TaskRequestBody['patch'];
    }) => {
      return patchTask(params, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
    onError: (error) => {
      console.error('patchTaskDone 실패:', error);
    },
  });

  const handleClick = async () => {
    const newCheckedState = !isChecked;

    setTaskCompletionStatus(taskId, newCheckedState, taskName, taskDescription);

    const params: TaskUrlParams = { taskId };

    const data: TaskRequestBody['patch'] = {
      done: newCheckedState,
      name: taskName,
      description: taskDescription || '',
    };

    await patchTaskDone({ params, data });
  };

  return (
    <ClickMotion className="flex items-center">
      <button type="button" onClick={handleClick}>
        {isChecked ? <ActiveCheckBoxIcon /> : <InActiveCheckBoxIcon />}
      </button>
    </ClickMotion>
  );
}
