import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideItemsMotionProps {
  children: ReactNode;
  className?: string;
  index: number;
}

function SlideItemsMotion({
  children,
  className,
  index,
}: SlideItemsMotionProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: index * 0.15 }}
      className={className}
    >
      {children}
    </motion.li>
  );
}

export default SlideItemsMotion;
