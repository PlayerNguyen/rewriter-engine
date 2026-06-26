import clsx from 'clsx';
import { forwardRef } from 'react';

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

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: string | number;
  rows?: string;
  gap?: SpacingToken;
  columnGap?: SpacingToken;
  rowGap?: SpacingToken;
  minChildWidth?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'stretch';
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: number | string;
  rowSpan?: number | string;
  colStart?: number | string;
  rowStart?: number | string;
  colEnd?: number | string;
  rowEnd?: number | string;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns,
      rows,
      gap,
      columnGap,
      rowGap,
      minChildWidth,
      align = 'stretch',
      justify = 'stretch',
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const gridStyle: Record<string, string> = {};

    if (typeof columns === 'number') {
      gridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    } else if (typeof columns === 'string') {
      gridStyle.gridTemplateColumns = columns;
    } else if (minChildWidth) {
      gridStyle.gridTemplateColumns = `repeat(auto-fill, minmax(${minChildWidth}, 1fr))`;
    }

    if (rows) gridStyle.gridTemplateRows = rows;
    if (gap) gridStyle.gap = gapMap[gap] || gap;
    if (columnGap) gridStyle.columnGap = gapMap[columnGap] || columnGap;
    if (rowGap) gridStyle.rowGap = gapMap[rowGap] || rowGap;

    const alignMap = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };
    const justifyMap = {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
    };

    return (
      <div
        ref={ref}
        className={clsx('grid', alignMap[align], justifyMap[justify], className)}
        style={{ ...gridStyle, ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (
    { colSpan, rowSpan, colStart, rowStart, colEnd, rowEnd, className, style, children, ...rest },
    ref,
  ) => {
    const itemStyle: Record<string, string | number> = {};
    if (colSpan) itemStyle.gridColumn = `span ${colSpan}`;
    if (rowSpan) itemStyle.gridRow = `span ${rowSpan}`;
    if (colStart) itemStyle.gridColumnStart = colStart;
    if (rowStart) itemStyle.gridRowStart = rowStart;
    if (colEnd) itemStyle.gridColumnEnd = colEnd;
    if (rowEnd) itemStyle.gridRowEnd = rowEnd;

    return (
      <div ref={ref} className={className} style={{ ...itemStyle, ...style }} {...rest}>
        {children}
      </div>
    );
  },
);

GridItem.displayName = 'GridItem';
