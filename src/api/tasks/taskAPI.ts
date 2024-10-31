import type { TaskRequestBody } from '@/src/types/tasks/taskDto';
import { apiCall } from '@utils/apiCall';

/**
 * @파라미터
 * - Task URL에 groupId 및 taskListId가 파라미터로 작성되어 있지만, 받지 않는 경우가 있습니다.
 * - get, patch, delete의 경우 필요하지 않습니다.
 */

export interface TaskUrlParams {
  groupId?: number; // group 식별자
  taskListId?: number; // taskList 식별자
  taskId?: number; // task 식별자
  id?: number; // order 식별자
  recurringId?: number; // 반복 설정 식별자
  date?: string;
}

// 공통 경로
const getTaskPath = (
  groupId?: number | undefined,
  taskListId?: number | undefined
) =>
  `groups/${groupId === undefined ? 'groupId' : groupId}/task-lists/${taskListId === undefined ? 'taskListId' : taskListId}/tasks`;

// 요청: groupId, taskListId X
export const getTask = async (params: TaskUrlParams) => {
  const { taskId, date } = params;
  return apiCall('get', `${getTaskPath(undefined, undefined)}/${taskId}`, {
    params: { date },
  });
};

export const patchTask = async (
  params: TaskUrlParams,
  data: TaskRequestBody['patch']
) => {
  const { taskId } = params;
  return apiCall(
    'patch',
    `${getTaskPath(undefined, undefined)}/${taskId}`,
    data
  );
};

export const deleteTask = async (params: TaskUrlParams) => {
  const { taskId } = params;
  return apiCall('delete', `${getTaskPath(undefined, undefined)}/${taskId}`);
};

export const deleteRecurringTask = async (params: TaskUrlParams) => {
  const { recurringId } = params;
  return apiCall(
    'delete',
    `${getTaskPath(undefined, undefined)}/{taskId}/recurring/${recurringId}`
  );
};

// 요청: groupId, taskListId O
export const postTask = async (
  params: TaskUrlParams,
  data: TaskRequestBody['post']
) => {
  const { groupId, taskListId } = params;
  return apiCall('post', `${getTaskPath(groupId, taskListId)}`, data);
};

export const patchTaskOrder = async (
  params: TaskUrlParams,
  data: TaskRequestBody['patchOrder']
) => {
  const { groupId, taskListId, id } = params;
  return apiCall(
    'patch',
    `${getTaskPath(groupId, taskListId)}/tasks/${id}/order`,
    data
  );
};
