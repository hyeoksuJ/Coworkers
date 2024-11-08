import Image from 'next/image';
import IMAGE_PATHS from '@constants/imagePaths';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface PopDonutMotionProps {
  children: ReactNode;
  className?: string;
}

function PopDonutMotion({ children, className }: PopDonutMotionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isHovered ? { scale: 1 } : { scale: 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Image
          alt="딸기 도넛"
          src={IMAGE_PATHS.DONUT_STRAWBERRY2}
          width={24}
          height={24}
          quality={100}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}

export default PopDonutMotion;
