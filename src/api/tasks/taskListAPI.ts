import type { TaskListRequestBody } from '@/src/types/tasks/taskListDto';
import { apiCall } from '@utils/apiCall';

/**
 * @파라미터
 * - TaskList URL에 groupId가 파라미터로 작성되어 있지만, 받지 않는 경우가 있습니다.
 * - get, delete의 경우 필요하지 않습니다.
 */

export interface TaskListUrlParams {
  groupId?: number; // group 식별자
  id?: number; // taskList 식별자
  listId?: string;
  date?: string;
  name?: string;
  displayIndex?: number;
}

// 공통 경로
const getTaskListPath = (groupId?: number | null) =>
  `groups/${groupId === undefined ? 'groupId' : groupId}/task-lists`;

// 요청: groupId X
export const getTaskList = async (params: TaskListUrlParams) => {
  const { id, date } = params;
  return apiCall('get', `${getTaskListPath(undefined)}/${id}`, {
    params: { date },
  });
};

export const deleteTaskList = async (params: TaskListUrlParams) => {
  const { listId } = params;
  return apiCall('delete', `${getTaskListPath(undefined)}/${listId}`);
};

// 요청: groupId O
export const getTaskLists = async (params: TaskListUrlParams) => {
  const { groupId } = params;
  return apiCall('get', `groups/${groupId}`);
};

export const postTaskList = async (
  params: TaskListUrlParams,
  data: TaskListRequestBody['post']
) => {
  const { groupId } = params;
  return apiCall('post', getTaskListPath(groupId), data);
};

export const patchTaskList = async (
  params: TaskListUrlParams,
  data: TaskListRequestBody['patch']
) => {
  const { groupId, listId } = params;
  return apiCall('patch', `${getTaskListPath(groupId)}/${listId}`, data);
};

export const patchTaskListOrder = async (
  params: TaskListUrlParams,
  data: TaskListRequestBody['patchOrder']
) => {
  const { groupId, id } = params;
  return apiCall('patch', `${getTaskListPath(groupId)}/${id}/order`, data);
};
