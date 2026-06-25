import clsx from 'clsx';
import React, { forwardRef, type ReactNode } from 'react';

type SpacingToken = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const gapMap: Record<string, string> = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: SpacingToken;
  wrap?: boolean;
  divider?: ReactNode;
  inline?: boolean;
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      align = 'stretch',
      justify = 'start',
      gap = 'md',
      wrap = false,
      divider,
      inline = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    const childrenWithDividers = divider
      ? childrenArray.reduce<ReactNode[]>((acc, child, i) => {
          acc.push(child);
          if (i < childrenArray.length - 1) {
            acc.push(
              <span key={`divider-${i}`} className="shrink-0" aria-hidden="true">
                {divider}
              </span>,
            );
          }
          return acc;
        }, [])
      : childrenArray;

    return (
      <div
        ref={ref}
        className={clsx(
          inline ? 'inline-flex' : 'flex',
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
          alignMap[align],
          justifyMap[justify],
          wrap && 'flex-wrap',
          className,
        )}
        style={{ gap: gapMap[gap] || gap }}
        {...rest}
      >
        {childrenWithDividers}
      </div>
    );
  },
);

Stack.displayName = 'Stack';
