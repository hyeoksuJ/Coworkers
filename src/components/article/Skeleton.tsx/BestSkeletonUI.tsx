import { motion } from 'framer-motion';
import BestCardSkeletonCard from './BestCardSkeletonCard';

export default function BestSkeletonUI() {
  return (
    <div>
      <div className="navbar" />
      <motion.div
        className="relative mb-6 h-[24px] w-[108.33px] rounded-xl bg-background-tertiary"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <BestCardSkeletonCard />
        <div className="max-md:hidden">
          <BestCardSkeletonCard />
        </div>
        <div className="max-xl:hidden">
          <BestCardSkeletonCard />
        </div>
      </ul>
    </div>
  );
}
