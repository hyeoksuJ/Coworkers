import { useDetailCard } from '@hooks/article/useCommentAdd';
import { authAxiosInstance } from '@libs/axios/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import HeartIcon from 'public/icons/heart.svg';
import HertRedIcon from 'public/icons/heartRed.svg';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartProps {
  articleId: number | undefined;
}

export default function Heart({ articleId }: HeartProps) {
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const { data } = useDetailCard({
    articleId: Number(articleId),
  });

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
        queryKey: ['DetailCard'],
      });
    },
  });

  const handleAnimation = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  const toggleLike = () => {
    if (likedPost) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
      handleAnimation();
    }
  };

  return (
    <>
      <button onClick={toggleLike} type="button">
        {likedPost ? <HertRedIcon /> : <HeartIcon />}
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-1/2 left-1/2"
          >
            <Image
              alt="하트 클릭 애니메이션"
              src="/icons/heartRed.svg"
              width={200}
              height={200}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
