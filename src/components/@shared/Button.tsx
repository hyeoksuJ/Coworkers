import clsx from 'clsx';

type ButtonProps = {
  bgColor?: 'green' | 'red' | 'white' | 'transparent' | 'gradient';
  fontColor?: 'white' | 'gray' | 'green';
  size?: 'full';
  shape?: 'square' | 'round';
  fontSize?: '16' | '14';
  width?: number;
  height?: number;
  border?: 'none' | 'green' | 'white' | 'gray';
  disabledBgColor?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  bgColor = 'green',
  size,
  fontColor = 'white',
  fontSize = '16',
  shape = 'square',
  border = 'none',
  children,
  width = 136,
  height = 48,
  disabledBgColor = '#B0BEC5',
  className,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    'base-class',
    {
      'bg-brand-primary hover:bg-interaction-hover active:bg-interaction-pressed':
        !disabled && bgColor === 'green',
      'bg-status-danger hover:bg-[#FF4C4C] active:bg-[#c83a3a]':
        !disabled && bgColor === 'red',
      'bg-background-inverse hover:text-black active:brightness-90':
        !disabled && bgColor === 'white',
      'bg-transparent hover:bg-[#ffffff10] active:bg-transparent':
        !disabled && bgColor === 'transparent',
      'bg-brand-gradient transition duration-150 hover:brightness-110 active:brightness-95':
        !disabled && bgColor === 'gradient',
      'border border-brand-primary': border === 'green',
      'border border-text-secondary': border === 'gray',
      'border border-text-inverse': border === 'white',
      'rounded-[12px]': shape === 'square',
      'rounded-[40px]': shape === 'round',
      'text-text-primary': fontColor === 'white',
      'text-[#000000]': fontColor === 'gray',
      'text-brand-primary': fontColor === 'green',
      'text-lg-semibold': fontSize === '16',
      'text-md-semibold': fontSize === '14',
      'w-full': size === 'full',
    },
    className
  );

  const buttonStyle = {
    ...(size === 'full'
      ? { height: `${height}px` }
      : { width: `${width}px`, height: `${height}px` }),
    backgroundColor: disabled ? disabledBgColor : undefined,
    color: disabled ? '#ffffff' : undefined,
    ...style,
  };

  return (
    <button
      type="button"
      className={buttonClass}
      style={buttonStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
