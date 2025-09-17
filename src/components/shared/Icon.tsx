import { memo } from 'react';

type IconProps = {
  name: string;
  className?: string;
};

const Icon = ({ name, className = '' }: IconProps) => {
  const iconMap: Record<string, JSX.Element> = {
    arrowDown: (
      <svg
        className={className}
        width='12'
        height='8'
        viewBox='0 0 12 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11 1.5L6 6.5L1 1.5'
          stroke='var(--neutral-400)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  };

  return iconMap[name];
};

export default memo(Icon);
