import type { SortDto } from '@rewriter/table-core';
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
import { DataTableColumnHeader } from './DataTableColumnHeader';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

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
    <div className="rounded-lg border">
      {searchable && (
        <div className="px-4 py-3 border-b">
          <input
            type="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full max-w-xs px-3 py-1.5 text-sm rounded border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}

      {error && (
        <div className="px-4 py-3 text-sm text-destructive bg-destructive/10 border-b">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground border-b"
                  >
                    {header.column.getCanSort() ? (
                      <DataTableColumnHeader
                        column={header.column}
                        title={
                          typeof header.column.columnDef.header === 'string'
                            ? header.column.columnDef.header
                            : header.id
                        }
                        sort={sort}
                        onSort={setSort}
                      />
                    ) : (
                      <span>
                        {typeof header.column.columnDef.header === 'string'
                          ? header.column.columnDef.header
                          : header.id}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No data
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 hover:bg-accent/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
