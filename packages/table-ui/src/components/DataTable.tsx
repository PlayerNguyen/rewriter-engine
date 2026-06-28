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
import { DataTablePagination } from './DataTablePagination';

export interface DataTableProps {
  tableId: string;
  columns?: ColumnDef<unknown>[];
  pageSize?: number;
  searchable?: boolean;
  onSortChange?: (sort: SortDto) => void;
}

function deriveColumns(data: unknown[]): ColumnDef<unknown>[] {
  if (data.length === 0) return [];
  const first = data[0];
  if (first == null || typeof first !== 'object') return [];
  return Object.keys(first).map((key) => ({
    accessorKey: key as string,
    header: key.charAt(0).toUpperCase() + key.slice(1),
  }));
}

export function DataTable({
  tableId,
  columns: columnsProp,
  pageSize = 10,
  searchable = false,
  onSortChange,
}: DataTableProps) {
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
    return columnsProp ?? deriveColumns(data);
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
      onSortChange?.(null as unknown as SortDto);
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

  const table = useReactTable({
    data,
    columns,
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
