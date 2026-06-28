import clsx from 'clsx';
import { forwardRef } from 'react';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Wrap the table in a rounded border container. @default false */
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
