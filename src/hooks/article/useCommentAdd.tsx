import {
  fetchCardDetail,
  fetchCommentadd,
} from '@/src/api/article/articlecardAPI';
import { Article } from '@/src/types/article/ArticleType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface FetchCardDetailProps {
  articleId: number;
  content?: string;
}

export const useDetailCard = ({ articleId }: FetchCardDetailProps) => {
  return useQuery<Article>({
    queryKey: ['DetailCard', articleId],
    queryFn: () => fetchCardDetail({ articleId }),
    enabled: !!articleId,
  });
};

export const useCommentAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      content,
    }: {
      articleId: number;
      content: string;
    }) => fetchCommentadd({ articleId, content }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['CommentCards'] });
      queryClient.invalidateQueries({ queryKey: ['DetailCard'] });
    },
  });
};
