import clsx from 'clsx';
import { forwardRef } from 'react';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => (
    <tr
      ref={ref}
      className={clsx(
        'border-b border-hairline last:border-b-0 hover:bg-surface-2/50 transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  ),
);

TableRow.displayName = 'TableRow';
