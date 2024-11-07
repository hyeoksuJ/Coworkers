import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardMotionProps {
  children: ReactNode;
  className?: string;
  index: number;
}

function CardMotion({ children, className, index }: CardMotionProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ marginLeft: '12px' }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={className}
    >
      {children}
    </motion.li>
  );
}

export default CardMotion;
