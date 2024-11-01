import { authAxiosInstance } from '@libs/axios/axiosInstance';

interface NewArticleProps {
  image: string;
  content: string;
  title: string;
  articleId: string | string[] | undefined;
}

export const fetchEditArticle = async ({
  articleId,
  image,
  content,
  title,
}: NewArticleProps) => {
  const response = await authAxiosInstance.patch(`articles/${articleId}`, {
    image,
    content,
    title,
  });
  return response.data;
};
