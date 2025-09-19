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
    english: (
      <svg
        width='16'
        height='17'
        viewBox='0 0 16 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_3168_3865)'>
          <g clipPath='url(#clip1_3168_3865)'>
            <path
              d='M12.5 16.5H3.5C1.567 16.5 0 14.933 0 13V4C0 2.067 1.567 0.5 3.5 0.5H12.5C14.433 0.5 16 2.067 16 4V13C16 14.933 14.433 16.5 12.5 16.5Z'
              fill='#716762'
            />
            <path
              d='M16 12.9992V12.2309L13.5182 10.6048H16V9.7627H9.26318V16.4995H10.1053V11.3889L15.4469 14.8886C15.6361 14.5941 15.7822 14.2692 15.8766 13.9231'
              fill='#F5F5F5'
            />
            <path
              d='M0.235344 14.2634C0.320594 14.4834 0.427281 14.6927 0.553094 14.8886L5.89472 11.3889V16.4995H6.73681V9.7627H0V10.6048H2.48184L0 12.2309V12.9995C0 13.1341 0.007875 13.2668 0.0226563 13.3974'
              fill='#F5F5F5'
            />
            <path
              d='M0 4.11897V4.76869L2.48184 6.39475H0V7.23684H6.73684V0.5H5.89475V5.61062L0.553094 2.11094C0.3455 2.43416 0.189781 2.79381 0.0973125 3.17812'
              fill='#F5F5F5'
            />
            <path
              d='M15.7601 2.72403C15.6756 2.50844 15.5704 2.30322 15.4469 2.11091L10.1053 5.61062V0.5H9.26318V7.23684H16V6.39475H13.5182L16 4.76869V4C16 3.86063 15.9916 3.72319 15.9758 3.58806'
              fill='#F5F5F5'
            />
            <path
              d='M9.26316 0.5H6.73684V7.23684H0V9.76316H6.73684V16.5H9.26316V9.76316H16V7.23684H9.26316V0.5Z'
              fill='#FF4B55'
            />
            <path
              d='M4.32465 10.6055L0.0224609 13.3981C0.0566484 13.7001 0.129148 13.9904 0.23518 14.2641L5.8714 10.6055L4.32465 10.6055Z'
              fill='#FF4B55'
            />
            <path
              d='M10.7646 10.6055L15.8767 13.9238C15.957 13.6295 16.0001 13.3199 16.0001 13.0002V12.9999L12.3114 10.6055L10.7646 10.6055Z'
              fill='#FF4B55'
            />
            <path
              d='M5.05263 6.39436L0.0973125 3.17773C0.0338438 3.44136 0 3.71652 0 3.99961V4.11858L3.50588 6.39436H5.05263Z'
              fill='#FF4B55'
            />
            <path
              d='M11.6522 6.39432L15.9759 3.58763C15.9406 3.28626 15.8672 2.99657 15.7603 2.72363L10.1055 6.39432H11.6522Z'
              fill='#FF4B55'
            />
          </g>
        </g>
        <defs>
          <clipPath id='clip0_3168_3865'>
            <rect
              width='16'
              height='16'
              fill='white'
              transform='translate(0 0.5)'
            />
          </clipPath>
          <clipPath id='clip1_3168_3865'>
            <rect
              width='16'
              height='16'
              fill='white'
              transform='translate(0 0.5)'
            />
          </clipPath>
        </defs>
      </svg>
    ),
  };

  return iconMap[name];
};

export default memo(Icon);
