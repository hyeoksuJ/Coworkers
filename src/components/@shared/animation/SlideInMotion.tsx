import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInMotionProps {
  children: ReactNode;
  className?: string;
}

function SlideInMotion({ children, className }: SlideInMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -70 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SlideInMotion;
