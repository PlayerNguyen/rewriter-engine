import clsx from 'clsx';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '../Button';
import type { SortableColumn, TableSortState } from './types';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** TanStack Table Column — enables sort if column is sortable. */
  column?: SortableColumn;
  /** Server-side sort handler. Omit for client-side toggle via TanStack. */
  onSort?: (sort: TableSortState | null) => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, column, onSort, children, ...props }, ref) => {
    const canSort = column?.getCanSort();
    const isSorted = column?.getIsSorted();

    if (!canSort) {
      return (
        <th
          ref={ref}
          className={clsx(
            'px-4 py-3 text-left text-sm font-semibold text-ink-muted border-b border-hairline',
            className,
          )}
          {...props}
        >
          {children}
        </th>
      );
    }

    const c = column!;
    const fieldName = c.id;
    const direction = isSorted === 'asc' ? 'asc' : isSorted === 'desc' ? 'desc' : null;
    const SortIcon = direction === 'asc' ? ArrowUp : direction === 'desc' ? ArrowDown : ArrowUpDown;

    const handleClick = () => {
      if (!onSort) {
        c.toggleSorting();
        return;
      }
      if (!direction) {
        onSort({ fieldName, direction: 'asc' });
      } else if (direction === 'asc') {
        onSort({ fieldName, direction: 'desc' });
      } else {
        onSort(null);
      }
    };

    return (
      <th
        ref={ref}
        className={clsx('px-4 py-3 text-left border-b border-hairline', className)}
        {...props}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClick}
          icon={<SortIcon size={14} />}
          iconPosition="right"
          className="text-ink-muted hover:text-ink"
        >
          {children}
        </Button>
      </th>
    );
  },
);

TableHead.displayName = 'TableHead';
