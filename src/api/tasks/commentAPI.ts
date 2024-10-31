import type { CommentRequestBody } from '@/src/types/tasks/commentDto';
import { apiCall } from '@utils/apiCall';

export interface CommentUrlParams {
  taskId?: number;
  commentId?: number;
  updatedComment?: string;
  comment?: string;
}

// 공통 경로
const getCommentPath = (taskId: number | undefined, commentId?: number) => {
  let path = `tasks/${taskId}/comments`;
  if (commentId) {
    path += `/${commentId}`;
  }
  return path;
};

// 요청
export const getComments = async (params: CommentUrlParams) => {
  const { taskId } = params;
  return apiCall('get', getCommentPath(taskId));
};

export const postComment = async (
  params: CommentUrlParams,
  data: CommentRequestBody['post']
) => {
  const { taskId } = params;
  return apiCall('post', getCommentPath(taskId), data);
};

export const patchComment = async (
  params: CommentUrlParams,
  data: CommentRequestBody['patch']
) => {
  const { taskId, commentId } = params;
  return apiCall('patch', getCommentPath(taskId, commentId), data);
};

export const deleteComment = async (params: CommentUrlParams) => {
  const { taskId, commentId } = params;
  return apiCall('delete', getCommentPath(taskId, commentId));
};
