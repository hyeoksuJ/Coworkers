import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideDownMotionProps {
  children: ReactNode;
  className?: string;
}

function SlideDownMotion({ children, className }: SlideDownMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SlideDownMotion;
