import clsx from 'clsx';
import { forwardRef } from 'react';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td ref={ref} className={clsx('px-4 py-3 text-sm text-left text-ink', className)} {...props}>
      {children}
    </td>
  ),
);

TableCell.displayName = 'TableCell';
