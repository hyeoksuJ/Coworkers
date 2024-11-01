import { useDetailCard } from '@hooks/article/useCommentAdd';
import { authAxiosInstance } from '@libs/axios/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HeartIcon from 'public/icons/heart.svg';
import HertRedIcon from 'public/icons/heartRed.svg';
import { useEffect, useState } from 'react';

interface HeartProps {
  articleId: number | undefined;
}

export default function Heart({ articleId }: HeartProps) {
  const queryClient = useQueryClient();

  const { data } = useDetailCard({
    articleId: Number(articleId),
  });

  const [likedPost, setLikedPost] = useState(false);

  useEffect(() => {
    if (data?.isLiked !== undefined) {
      setLikedPost(data.isLiked); // 서버 데이터에서 좋아요 상태 가져오기
    }
  }, [data?.isLiked]);

  // 좋아요 등록
  const likeMutation = useMutation({
    mutationFn: () => authAxiosInstance.post(`articles/${articleId}/like`),
    onSuccess: () => {
      setLikedPost(true);
      // 필요시 쿼리 무효화나 업데이트 처리
      queryClient.invalidateQueries({
        queryKey: ['articleCard'],
      });
      queryClient.invalidateQueries({
        queryKey: ['bestcard'],
      });
      queryClient.invalidateQueries({
        queryKey: ['DetailCard'],
      });
    },
  });

  // 좋아요 취소
  const unlikeMutation = useMutation({
    mutationFn: () => authAxiosInstance.delete(`articles/${articleId}/like`),
    onSuccess: () => {
      setLikedPost(false);
      // 필요시 쿼리 무효화나 업데이트 처리
      queryClient.invalidateQueries({
        queryKey: ['articleCard'],
      });
      queryClient.invalidateQueries({
        queryKey: ['bestcard'],
      });
      queryClient.invalidateQueries({
        queryKey: ['DetailCard'],
      });
    },
  });

  const toggleLike = () => {
    if (likedPost) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <button onClick={toggleLike} type="button">
      {likedPost ? <HertRedIcon /> : <HeartIcon />}
    </button>
  );
}
