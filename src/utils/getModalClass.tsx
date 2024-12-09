import clsx from 'clsx';

export interface ModalClassProps {
  className?: string;
  isXButton?: boolean;
  array?: 'column' | 'row';
  padding?: 'default' | 'datePicker';
  bgColor?: 'primary' | 'secondary';
  fontColor?: 'primary' | 'secondary';
  fontSize?: '16' | '14' | '12';
  fontArray?: 'center' | 'left' | 'right';
  gap?: '8' | '24' | '32' | '40';
  width?: '375' | '500';
}

export const getModalClass = ({
  isXButton,
  array,
  padding,
  gap,
  width = '375',
  bgColor,
  fontColor,
  fontSize,
  fontArray,
  className,
}: ModalClassProps) => {
  return clsx(className, {
    'pt-12': isXButton,
    'px-11 pb-8 pt-10': padding === 'default',
    'px-4 pb-8': padding === 'datePicker',
    'flex flex-col': array === 'column',
    'flex flex-row': array === 'row',
    'gap-2': gap === '8',
    'gap-6': gap === '24',
    'gap-8': gap === '32',
    'gap-10': gap === '40',
    'bg-background-primary': bgColor === 'primary',
    'bg-background-secondary': bgColor === 'secondary',
    'text-text-primary': fontColor === 'primary',
    'text-text-secondary': fontColor === 'secondary',
    'text-lg-medium': fontSize === '16',
    'text-md-medium': fontSize === '14',
    'text-xs-regular': fontSize === '12',
    'text-center': fontArray === 'center',
    'text-left': fontArray === 'left',
    'text-right': fontArray === 'right',
    'md:w-[500px] xl:w-[500px]': width === '500',
  });
};
