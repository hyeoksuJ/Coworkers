import { motion } from 'framer-motion';
import ArticleCardSkeletonCard from './ArticleCardSkeletonCard';

export default function ArticleSkeletonUI() {
  return (
    <div>
      <div className="navbar" />
      <motion.div
        className="relative mb-6 h-[24px] w-[51.8px] rounded-xl bg-background-tertiary"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <ul className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {Array.from({ length: 10 }).map(() => (
          <ArticleCardSkeletonCard key={Math.random()} />
        ))}
      </ul>
    </div>
  );
}
