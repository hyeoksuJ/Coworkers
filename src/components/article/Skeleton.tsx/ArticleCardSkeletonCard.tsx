import { motion } from 'framer-motion';

export default function ArticleCardSkeletonCard() {
  return (
    <motion.div
      className="relative h-[178px] w-full rounded-xl border border-background-tertiary bg-background-secondary"
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="mx-4 mb-4 mt-6">
        <div className="mb-10 flex justify-between">
          <div>
            <motion.div
              className="relative mb-3 h-[21px] w-[140px] rounded-xl bg-background-tertiary"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="relative mb-3 h-[17px] w-[69px] rounded-xl bg-background-tertiary"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <motion.div
            className="relative h-16 w-16 rounded-xl bg-background-tertiary"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="relative mb-3 h-[32px] w-[32px] rounded-xl bg-background-tertiary"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="relative mb-3 h-[17px] w-[80px] rounded-xl bg-background-tertiary"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <motion.div
            className="relative mb-3 h-[17px] w-[35px] rounded-xl bg-background-tertiary"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
