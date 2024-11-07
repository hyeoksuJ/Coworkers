import { useState } from 'react';
import CalenderIcon from '@icons/calendar.svg';
import IconSparkleMotion from '@components/@shared/animation/IconSparkleMotion';
import Calender from '../Calender';

export default function CalenderButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <IconSparkleMotion>
        <button
          type="button"
          className="h-6 rounded-full bg-background-secondary p-[6px]"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <CalenderIcon />
        </button>
      </IconSparkleMotion>
      {isOpen && (
        <div className="absolute z-10 mt-1">
          <Calender isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
