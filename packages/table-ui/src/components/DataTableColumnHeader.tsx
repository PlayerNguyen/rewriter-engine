import type { SortDto } from '@rewriter/table-core';
import type { Column } from '@tanstack/react-table';

export interface DataTableColumnHeaderProps {
  column: Column<unknown>;
  title: string;
  sort: SortDto | null;
  onSort: (sort: SortDto | null) => void;
}

export function DataTableColumnHeader({ column, title, sort, onSort }: DataTableColumnHeaderProps) {
  const fieldName = column.id;
  const isActive = sort?.fieldName === fieldName;
  const direction = isActive ? (sort?.direction ?? null) : null;

  const handleClick = () => {
    if (!isActive) {
      onSort({ fieldName, direction: 'asc' });
    } else if (direction === 'asc') {
      onSort({ fieldName, direction: 'desc' });
    } else {
      onSort(null);
    }
  };

  const arrow = direction === 'asc' ? ' ▲' : direction === 'desc' ? ' ▼' : '';

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1 font-medium text-left cursor-pointer hover:text-foreground transition-colors"
    >
      {title}
      <span className="text-muted-foreground text-xs w-4">{arrow}</span>
    </button>
  );
}
