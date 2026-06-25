import clsx from 'clsx';
import { forwardRef, type ReactNode, type SVGAttributes } from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export interface IconProps extends SVGAttributes<SVGElement> {
  children: ReactNode;
  size?: IconSize;
  color?: string;
  decorative?: boolean;
  label?: string;
  spin?: boolean;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ children, size = 'md', color, decorative, label, spin, className, ...rest }, ref) => {
    const isDecorative = decorative ?? !label;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx('inline-flex shrink-0', sizeMap[size], spin && 'animate-spin', className)}
        style={color ? { color } : undefined}
        aria-hidden={isDecorative ? 'true' : undefined}
        aria-label={!isDecorative ? label : undefined}
        role={!isDecorative ? 'img' : undefined}
        {...rest}
      >
        {children}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';
