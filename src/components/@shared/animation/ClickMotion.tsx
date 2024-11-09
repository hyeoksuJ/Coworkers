import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ClickMotionProps {
  children: ReactNode;
  className?: string;
}

export default function ClickMotion({ children, className }: ClickMotionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileTap={{
        scale: 0.85,
        transition: {
          duration: 0.1,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
