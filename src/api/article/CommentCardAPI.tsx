import { authAxiosInstance } from '@libs/axios/axiosInstance';

interface FetchCommentCardProps {
  articleId: string | string[] | undefined;
  limit: number;
  nextCursor: number | null;
}

// 댓글 리스트 가져오는 API 함수
export const fetchCommentCard = async ({
  limit,
  nextCursor = null,
  articleId,
}: FetchCommentCardProps) => {
  const response = await authAxiosInstance.get(
    `articles/${articleId}/comments`,
    {
      params: { limit, cursor: nextCursor },
    }
  );
  return response.data;
};

// 댓글 삭제
export const fetchCommentDelete = async (commentId: string | null) => {
  const response = await authAxiosInstance.delete(`comments/${commentId}`);
  return response.data;
};

interface fetchCommentPatchProps {
  commentId: string;
  content: string;
}

// 댓글 수정
export const fetchCommentPatch = async ({
  commentId,
  content,
}: fetchCommentPatchProps) => {
  const response = await authAxiosInstance.patch(`comments/${commentId}`, {
    content,
  });
  return response.data;
};
