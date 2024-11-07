import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextButtonMotionProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}
export default function TextButtonMotion({
  children,
  className,
  disabled = false,
}: TextButtonMotionProps) {
  return (
    <motion.div
      whileHover={
        !disabled ? { WebkitBackgroundClip: 'text', scale: 1.05 } : {}
      }
      whileTap={{
        scale: 0.92,
        transition: {
          duration: 0.1,
        },
      }}
      transition={{ duration: 0.2 }}
      className={`${className} ${disabled ? 'cursor-not-allowed opacity-30' : ''}`}
    >
      {children}
    </motion.div>
  );
}
