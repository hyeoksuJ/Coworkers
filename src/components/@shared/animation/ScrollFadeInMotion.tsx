import { motion } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';

interface ScrollFadeInMotionProps {
  children: ReactNode;
  className?: string;
  startDirection: 'left' | 'right';
  delay?: number;
}

export default function ScrollFadeInMotion({
  children,
  className,
  startDirection,
  delay,
}: ScrollFadeInMotionProps) {
  const [isVisible, setVisible] = useState(false);

  const handleScroll = () => {
    const rect = document
      .getElementById('fade-in-section')
      ?.getBoundingClientRect();
    if (rect && rect.top < window.innerHeight && rect.bottom >= 0) {
      setVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      x: startDirection === 'left' ? '-100%' : '100%',
    },
    visible: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 1.5,
        delay,
      },
    },
  };

  return (
    <motion.div
      id="fade-in-section"
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      className={`${className} `}
    >
      {children}
    </motion.div>
  );
}
