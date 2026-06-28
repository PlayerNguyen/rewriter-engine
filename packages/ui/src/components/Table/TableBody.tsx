import clsx from 'clsx';
import { forwardRef } from 'react';

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Apply zebra striping — even rows get bg-surface-1. @default false */
  striped?: boolean;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, striped = false, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={clsx(striped && '[&>tr:nth-child(even)]:bg-surface-1', className)}
      {...props}
    >
      {children}
    </tbody>
  ),
);

TableBody.displayName = 'TableBody';
