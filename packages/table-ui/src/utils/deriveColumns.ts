import type { ColumnDef } from '@tanstack/react-table';

/**
 * Derives TanStack Table column definitions from the first data row's keys.
 * Falls back to an empty array if data is empty or the first row is not an object.
 *
 * @typeParam TData - The row type (defaults to `unknown` for runtime-derived data).
 * @param data - The data array from which to derive columns.
 * @returns An array of column definitions with accessor keys and title-case headers.
 */
export function deriveColumns<TData = unknown>(data: TData[]): ColumnDef<TData>[] {
  if (data.length === 0) return [];
  const first = data[0];
  if (first == null || typeof first !== 'object') return [];
  return Object.keys(first).map((key) => ({
    accessorKey: key as keyof TData & string,
    header: key.charAt(0).toUpperCase() + key.slice(1),
  }));
}
