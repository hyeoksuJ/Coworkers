import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function SlideInMotion({ children, className, delay }: SlideInMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -70 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SlideInMotion;
