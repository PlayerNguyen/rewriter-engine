import type { SortDto } from '@rewriter/table-core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useDebounce,
} from '@rewriter/ui';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { useTableData } from '../hooks/useTableData';
import { deriveColumns } from '../utils/deriveColumns';
import { DataTablePagination } from './DataTablePagination';

export interface DataTableProps<TData = unknown> {
  /** Table identifier passed to the API (e.g. "sources", "articles"). */
  tableId: string;
  /**
   * Column definitions. If omitted, columns are auto-generated from the
   * first data row's keys.
   */
  columns?: ColumnDef<TData>[];
  /** Results per page. @default 10 */
  pageSize?: number;
  /** Show a debounced search input above the table. */
  searchable?: boolean;
  /** Called when sorting changes (including clearing sort). */
  onSortChange?: (sort: SortDto | null) => void;
}

/**
 * Full-featured data table with built-in server-side pagination, sorting,
 * and optional search.
 *
 * Uses {@link useTableData} for API fetching and TanStack Table v8 for
 * headless rendering. Delegates markup to the generic `Table` components
 * from `@rewriter/ui` (`Table`, `TableHead`, `TableCell`, etc.).
 *
 * @typeParam TData - The shape of each row in the table.
 *
 * @example
 * // Minimal — auto-generated columns from API response
 * <DataTable tableId="sources" />
 *
 * @example
 * // Explicit columns with search and sort callback
 * <DataTable
 *   tableId="articles"
 *   pageSize={20}
 *   searchable
 *   columns={[
 *     { accessorKey: 'title', header: 'Title' },
 *     { accessorKey: 'status', header: 'Status' },
 *   ]}
 *   onSortChange={(sort) => console.log(sort)}
 * />
 */
export function DataTable<TData = unknown>({
  tableId,
  columns: columnsProp,
  pageSize = 10,
  searchable = false,
  onSortChange,
}: DataTableProps<TData>) {
  const {
    data,
    total,
    page,
    limit,
    totalPages,
    isLoading,
    error,
    sort,
    setPage,
    setSort,
    setSearch,
  } = useTableData(tableId, { pageSize });

  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const columns = useMemo(() => {
    return columnsProp ?? (deriveColumns(data) as ColumnDef<TData>[]);
  }, [columnsProp, data]);

  const sorting: SortingState = useMemo(() => {
    if (!sort) return [];
    return [{ id: sort.fieldName, desc: sort.direction === 'desc' }];
  }, [sort]);

  const pagination: PaginationState = useMemo(
    () => ({ pageIndex: page - 1, pageSize: limit }),
    [page, limit],
  );

  const handleSortingChange = (updater: SortingState | ((prev: SortingState) => SortingState)) => {
    const next = typeof updater === 'function' ? updater(sorting) : updater;
    if (next.length === 0) {
      setSort(null);
      onSortChange?.(null);
    } else {
      const s = next[0];
      if (s) {
        const sortDto: SortDto = {
          fieldName: s.id,
          direction: s.desc ? 'desc' : 'asc',
        };
        setSort(sortDto);
        onSortChange?.(sortDto);
      }
    }
  };

  const handlePaginationChange = (
    updater: PaginationState | ((prev: PaginationState) => PaginationState),
  ) => {
    const next = typeof updater === 'function' ? updater(pagination) : updater;
    setPage(next.pageIndex + 1);
  };

  const table = useReactTable<unknown>({
    data,
    columns: columns as ColumnDef<unknown>[],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages || 1,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
  });

  return (
    <div className="rounded-lg border border-hairline">
      {searchable && (
        <div className="px-4 py-3 border-b border-hairline">
          <input
            type="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full max-w-xs px-3 py-1.5 text-sm rounded border border-hairline bg-canvas focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {error && (
        <div className="px-4 py-3 text-sm text-semantic-error bg-semantic-error/10 border-b border-hairline">
          {error}
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const title =
                  typeof header.column.columnDef.header === 'string'
                    ? header.column.columnDef.header
                    : header.id;

                return (
                  <TableHead key={header.id} column={header.column} onSort={setSort}>
                    {title}
                  </TableHead>
                );
              })}
            </tr>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <tr>
              <TableCell colSpan={columns.length || 1} className="text-center py-8 text-ink-muted">
                Loading...
              </TableCell>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <TableCell colSpan={columns.length || 1} className="text-center py-8 text-ink-muted">
                No data
              </TableCell>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DataTablePagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
