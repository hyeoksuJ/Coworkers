import { motion } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';

interface ScrollDonutBounceMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const greetings = [
  '안녕?😗',
  'Hello!',
  'Hi!',
  '반가워~🖐️',
  '시작해봐!',
  'XD',
  '🍩👍',
];

export default function ScrollDonutBounceMotion({
  children,
  className,
  delay,
}: ScrollDonutBounceMotionProps) {
  const [greeting, setGreeting] = useState('Hi!');
  const [isVisible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const handleScroll = () => {
    const rect = document
      .getElementById('bounce-section')
      ?.getBoundingClientRect();
    if (rect && rect.top < window.innerHeight && rect.bottom >= 0) {
      setVisible(true);
    }
  };

  const handleClick = () => {
    if (!showBubble) {
      const randomGreeting =
        greetings[Math.floor(Math.random() * greetings.length)];
      setGreeting(randomGreeting);
      setShowBubble(true);
      setTimeout(() => {
        setShowBubble(false);
      }, 2000);
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
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 3,
        duration: 1.7,
        delay,
      },
    },
  };

  return (
    <motion.div
      id="bounce-section"
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      className={`${className} cursor-pointer`}
      whileHover={{
        scale: 1.1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 10,
        },
      }}
      onClick={handleClick}
    >
      {children}
      {showBubble && (
        <motion.div
          className="absolute left-1/3 rounded-md border-[2px] border-text-secondary bg-background-primary px-2 py-2 text-xl-semibold text-xs-medium text-text-primary shadow-md md:px-4 md:text-md-medium xl:text-xl-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {greeting}
        </motion.div>
      )}
    </motion.div>
  );
}
