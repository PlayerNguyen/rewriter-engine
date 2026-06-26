import clsx from 'clsx';
import { type ElementType, forwardRef } from 'react';

type SpacingToken = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'section' | 'auto' | 0;
type RadiusToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'pill' | 'full';

const spacingMap: Record<string, string> = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  section: '96px',
  auto: 'auto',
  '0': '0',
};

const radiusMap: Record<string, string> = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  pill: '9999px',
  full: '9999px',
};

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  p?: SpacingToken;
  px?: SpacingToken;
  py?: SpacingToken;
  pt?: SpacingToken;
  pb?: SpacingToken;
  pl?: SpacingToken;
  pr?: SpacingToken;
  m?: SpacingToken;
  mx?: SpacingToken;
  my?: SpacingToken;
  mt?: SpacingToken;
  mb?: SpacingToken;
  ml?: SpacingToken;
  mr?: SpacingToken;
  bg?: string;
  border?: string;
  rounded?: RadiusToken;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  display?:
    | 'block'
    | 'inline'
    | 'inline-block'
    | 'flex'
    | 'inline-flex'
    | 'grid'
    | 'inline-grid'
    | 'none';
  width?: string;
  height?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Component = 'div',
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      bg,
      border,
      rounded,
      shadow,
      display,
      width,
      height,
      overflow,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const spacingStyle: Record<string, string> = {};

    if (p !== undefined) spacingStyle.padding = spacingMap[p] || String(p);
    if (px !== undefined) {
      spacingStyle.paddingLeft = spacingMap[px] || String(px);
      spacingStyle.paddingRight = spacingMap[px] || String(px);
    }
    if (py !== undefined) {
      spacingStyle.paddingTop = spacingMap[py] || String(py);
      spacingStyle.paddingBottom = spacingMap[py] || String(py);
    }
    if (pt !== undefined) spacingStyle.paddingTop = spacingMap[pt] || String(pt);
    if (pb !== undefined) spacingStyle.paddingBottom = spacingMap[pb] || String(pb);
    if (pl !== undefined) spacingStyle.paddingLeft = spacingMap[pl] || String(pl);
    if (pr !== undefined) spacingStyle.paddingRight = spacingMap[pr] || String(pr);

    if (m !== undefined) spacingStyle.margin = spacingMap[m] || String(m);
    if (mx !== undefined) {
      spacingStyle.marginLeft = spacingMap[mx] || String(mx);
      spacingStyle.marginRight = spacingMap[mx] || String(mx);
    }
    if (my !== undefined) {
      spacingStyle.marginTop = spacingMap[my] || String(my);
      spacingStyle.marginBottom = spacingMap[my] || String(my);
    }
    if (mt !== undefined) spacingStyle.marginTop = spacingMap[mt] || String(mt);
    if (mb !== undefined) spacingStyle.marginBottom = spacingMap[mb] || String(mb);
    if (ml !== undefined) spacingStyle.marginLeft = spacingMap[ml] || String(ml);
    if (mr !== undefined) spacingStyle.marginRight = spacingMap[mr] || String(mr);

    if (bg) spacingStyle.backgroundColor = bg;
    if (border) spacingStyle.border = `1px solid ${border}`;
    if (rounded) spacingStyle.borderRadius = radiusMap[rounded] || rounded;
    if (width) spacingStyle.width = width;
    if (height) spacingStyle.height = height;
    if (overflow) spacingStyle.overflow = overflow;

    return (
      <Component
        ref={ref}
        className={clsx(
          display,
          shadow === 'sm' && 'shadow-sm',
          shadow === 'md' && 'shadow-md',
          shadow === 'lg' && 'shadow-lg',
          shadow === 'none' && 'shadow-none',
          className,
        )}
        style={{ ...spacingStyle, ...style }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Box.displayName = 'Box';
