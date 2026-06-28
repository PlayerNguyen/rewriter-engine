import type { SortDirection } from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { forwardRef } from 'react';

export interface SortableColumn {
  id: string;
  getCanSort: () => boolean;
  getIsSorted: () => false | SortDirection;
  toggleSorting: () => void;
}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  bordered?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, bordered = false, children, ...props }, ref) => {
    const table = (
      <table ref={ref} className={clsx('w-full', className)} {...props}>
        {children}
      </table>
    );

    if (bordered) {
      return <div className="overflow-x-auto rounded-lg border border-hairline">{table}</div>;
    }

    return <div className="overflow-x-auto">{table}</div>;
  },
);

Table.displayName = 'Table';

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={clsx('bg-surface-1', className)} {...props}>
      {children}
    </thead>
  ),
);

TableHeader.displayName = 'TableHeader';

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
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

export type TableSortDirection = 'asc' | 'desc';

export interface TableSortState {
  fieldName: string;
  direction: TableSortDirection;
}

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

    const fieldName = column!.id;
    const direction = isSorted === 'asc' ? 'asc' : isSorted === 'desc' ? 'desc' : null;

    const SortIcon = direction === 'asc' ? ArrowUp : direction === 'desc' ? ArrowDown : ArrowUpDown;

    const handleClick = () => {
      if (!onSort) {
        column!.toggleSorting();
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
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center gap-1 text-sm font-semibold text-ink-muted text-left cursor-pointer hover:text-ink transition-colors"
        >
          {children}
          <span className="text-ink-muted w-4 flex items-center justify-center">
            <SortIcon size={14} />
          </span>
        </button>
      </th>
    );
  },
);

TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td ref={ref} className={clsx('px-4 py-3 text-sm text-left text-ink', className)} {...props}>
      {children}
    </td>
  ),
);

TableCell.displayName = 'TableCell';
