import clsx from 'clsx';
import { forwardRef } from 'react';

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={clsx('bg-surface-1 border-t border-hairline', className)}
      {...props}
    >
      {children}
    </tfoot>
  ),
);

TableFooter.displayName = 'TableFooter';
