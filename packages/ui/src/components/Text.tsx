import clsx from 'clsx';
import { type ElementType, forwardRef } from 'react';

type TextAs =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'label'
  | 'blockquote'
  | 'code';
type TextSize =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'headline'
  | 'card-title'
  | 'subhead'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'button'
  | 'eyebrow'
  | 'mono';
type TextWeight = 400 | 500 | 600 | 700;
type TextColor =
  | 'ink'
  | 'ink-muted'
  | 'ink-subtle'
  | 'ink-tertiary'
  | 'primary'
  | 'inverse-ink'
  | 'inherit';
type TextAlign = 'left' | 'center' | 'right' | 'justify';

const sizeStyles: Record<TextSize, string> = {
  'display-xl': 'text-5xl font-semibold leading-[1.05] tracking-[-3.0px]',
  'display-lg': 'text-4xl font-semibold leading-[1.10] tracking-[-1.8px]',
  'display-md': 'text-3xl font-semibold leading-[1.15] tracking-[-1.0px]',
  headline: 'text-2xl font-semibold leading-[1.20] tracking-[-0.6px]',
  'card-title': 'text-xl font-medium leading-[1.25] tracking-[-0.4px]',
  subhead: 'text-lg font-normal leading-[1.40] tracking-[-0.2px]',
  'body-lg': 'text-lg font-normal leading-[1.50] tracking-[-0.1px]',
  body: 'text-base font-normal leading-[1.50] tracking-[-0.05px]',
  'body-sm': 'text-sm font-normal leading-[1.50] tracking-normal',
  caption: 'text-xs font-normal leading-[1.40] tracking-normal',
  button: 'text-sm font-medium leading-[1.20] tracking-normal',
  eyebrow: 'text-xs font-medium leading-[1.30] tracking-[0.4px]',
  mono: 'text-xs font-normal leading-[1.50] tracking-normal font-mono',
};

const colorStyles: Record<TextColor, string> = {
  ink: 'text-ink',
  'ink-muted': 'text-ink-muted',
  'ink-subtle': 'text-ink-subtle',
  'ink-tertiary': 'text-ink-tertiary',
  primary: 'text-primary',
  'inverse-ink': 'text-inverse-ink',
  inherit: 'text-inherit',
};

const defaultElements: Record<TextSize, TextAs> = {
  'display-xl': 'h1',
  'display-lg': 'h2',
  'display-md': 'h3',
  headline: 'h4',
  'card-title': 'h5',
  subhead: 'h6',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  button: 'span',
  eyebrow: 'span',
  mono: 'code',
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextAs;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean | number;
  italic?: boolean;
  underline?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as,
      size = 'body',
      weight,
      color = 'ink',
      align,
      truncate,
      italic,
      underline,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const Component = as || defaultElements[size] || 'span';

    return (
      <Component
        ref={ref as any}
        className={clsx(
          sizeStyles[size],
          colorStyles[color],
          weight === 400 && 'font-normal',
          weight === 500 && 'font-medium',
          weight === 600 && 'font-semibold',
          weight === 700 && 'font-bold',
          align === 'left' && 'text-left',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          align === 'justify' && 'text-justify',
          truncate === true && 'truncate',
          typeof truncate === 'number' && 'line-clamp-' + truncate,
          italic && 'italic',
          underline && 'underline',
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';
