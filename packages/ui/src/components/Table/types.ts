import type { SortDirection } from '@tanstack/react-table';

/**
 * Minimal subset of TanStack Table's `Column` that `TableHead` needs
 * for sort integration. Any TanStack `Column` satisfies this contract
 * via its `id`, `getCanSort()`, `getIsSorted()`, and `toggleSorting()`.
 */
export interface SortableColumn {
  id: string;
  getCanSort: () => boolean;
  getIsSorted: () => false | SortDirection;
  toggleSorting: () => void;
}

/** Sort direction. */
export type TableSortDirection = 'asc' | 'desc';

/** Describes a single sort field and its direction. */
export interface TableSortState {
  fieldName: string;
  direction: TableSortDirection;
}
