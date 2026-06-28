import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';

/**
 * A type-safe factory for rendering typed TanStack Table rows without
 * manually mapping over data arrays. Eliminates repetitive `<TableRow>` /
 * `<TableCell>` boilerplate in stories and simple table consumers.
 *
 * @typeParam TData - The row type (must be an object).
 *
 * @example
 * type User = { id: number; name: string; email: string };
 *
 * const factory = new TableFactory<User>(users, [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 * ]);
 *
 * return (
 *   <Table bordered>
 *     {factory.renderHeader()}
 *     {factory.renderBody()}
 *   </Table>
 * );
 */
export class TableFactory<TData extends Record<string, unknown>> {
  constructor(
    private data: TData[],
    private columns: ColumnDef<TData>[],
  ) {}

  /** Renders the `<TableHeader>` with `<TableHead>` cells from column definitions. */
  renderHeader(): ReactNode {
    return (
      <TableHeader>
        <tr>
          {this.columns.map((col) => (
            <TableHead key={String((col as { accessorKey?: string }).accessorKey ?? col.id)}>
              {typeof col.header === 'string' ? col.header : String(col.id ?? '')}
            </TableHead>
          ))}
        </tr>
      </TableHeader>
    );
  }

  /** Renders `<TableBody>` with typed rows, using `accessorKey` for cell values. */
  renderBody(): ReactNode {
    return (
      <TableBody>
        {this.data.map((row, ri) => (
          <TableRow key={ri}>
            {this.columns.map((col) => {
              const key = (col as { accessorKey?: string }).accessorKey;
              const value = key ? String(row[key] ?? '') : '';

              return <TableCell key={String(key ?? col.id)}>{value}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}
