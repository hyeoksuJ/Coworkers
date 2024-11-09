import ArticleLoadingSpinner from 'public/icons/articleLoadingSpinner.svg';
import { motion } from 'framer-motion';

interface DonutLoadingSpinnerProps {
  className?: string;
}

export default function DonutLoadingSpinner({
  className,
}: DonutLoadingSpinnerProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
      className={`flex items-center justify-center overflow-hidden ${className}`}
    >
      <ArticleLoadingSpinner />
    </motion.div>
  );
}
