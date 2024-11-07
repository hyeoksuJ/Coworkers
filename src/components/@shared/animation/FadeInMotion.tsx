import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInMotionProps {
  children: ReactNode;
  className?: string;
}

function FadeInMotion({ children, className }: FadeInMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }} // 초기 상태: 투명
      animate={{ opacity: 1 }} // 애니메이션 상태: 불투명
      exit={{ opacity: 0 }} // 종료 상태: 다시 투명
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeInMotion;
