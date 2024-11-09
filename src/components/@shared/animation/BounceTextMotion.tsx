import { motion } from 'framer-motion';

interface BounceTextMotionProps {
  text: string;
  className?: string;
}

const bounceVariants = {
  hidden: {
    opacity: 1,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
};

function BounceTextMotion({ text, className }: BounceTextMotionProps) {
  return (
    <motion.div initial="hidden" animate="visible" className={className}>
      <motion.span
        variants={bounceVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline-block' }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

export default BounceTextMotion;
