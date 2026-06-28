import clsx from 'clsx';
import { forwardRef } from 'react';

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={clsx('bg-surface-1', className)} {...props}>
      {children}
    </thead>
  ),
);

TableHeader.displayName = 'TableHeader';
