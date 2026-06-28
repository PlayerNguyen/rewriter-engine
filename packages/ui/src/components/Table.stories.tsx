import type { Meta, StoryObj } from '@storybook/react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

const meta: Meta<typeof Table> = {
  title: 'Layout/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
];

export const Default: Story = {
  args: {
    bordered: true,
  },
  render: ({ bordered }) => (
    <Table bordered={bordered}>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Borderless: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  args: {
    bordered: true,
  },
  render: ({ bordered }) => (
    <Table bordered={bordered}>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        <tr>
          <TableCell colSpan={4} className="text-center py-8 text-ink-muted">
            No data
          </TableCell>
        </tr>
      </TableBody>
    </Table>
  ),
};

export const SingleRow: Story = {
  args: {
    bordered: true,
  },
  render: ({ bordered }) => (
    <Table bordered={bordered}>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const ManyColumns: Story = {
  args: {
    bordered: true,
  },
  render: ({ bordered }) => (
    <Table bordered={bordered}>
      <TableHeader>
        <tr>
          {['ID', 'Name', 'Email', 'Role', 'Status', 'Created', 'Last Login', 'Actions'].map(
            (header) => (
              <TableHead key={header}>{header}</TableHead>
            ),
          )}
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow>
          {[
            '1',
            'John Doe',
            'john@example.com',
            'Admin',
            'Active',
            '2024-01-15',
            '2026-06-28',
            'Edit',
          ].map((cell) => (
            <TableCell key={cell}>{cell}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          {[
            '2',
            'Jane Smith',
            'jane@example.com',
            'Editor',
            'Active',
            '2024-02-20',
            '2026-06-27',
            'Edit',
          ].map((cell) => (
            <TableCell key={cell}>{cell}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  args: {
    bordered: true,
  },
  render: ({ bordered }) => (
    <Table bordered={bordered}>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </tr>
      </TableHeader>
      <TableBody striped>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const StripedBorderless: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </tr>
      </TableHeader>
      <TableBody striped>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithCustomCell: Story = {
  args: {
    bordered: true,
  },
  render: ({ bordered }) => (
    <Table bordered={bordered}>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {sampleData.slice(0, 3).map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  row.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {row.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <button type="button" className="text-sm text-primary hover:underline">
                Edit
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

function SortableTableExample() {
  const columns = useMemo<ColumnDef<(typeof sampleData)[number]>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
    ],
    [],
  );

  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table bordered>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} column={header.column}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </tr>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const Sortable: Story = {
  render: () => <SortableTableExample />,
};

export const WithAlignment: Story = {
  render: () => (
    <Table bordered>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {[
          { name: 'Lavender theme', qty: 1, price: '$29.00' },
          { name: 'Dark mode plugin', qty: 3, price: '$49.00' },
          { name: 'API credits', qty: 500, price: '$99.00' },
        ].map((item, i) => (
          <TableRow key={i}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-center">{item.qty}</TableCell>
            <TableCell className="text-right font-mono">{item.price}</TableCell>
            <TableCell className="text-right">
              <button type="button" className="text-sm text-primary hover:underline">
                Edit
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table bordered>
      <TableHeader>
        <tr>
          <TableHead>Item</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead className="text-right">Unit</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {[
          { item: 'Lavender theme', qty: 1, unit: '$29.00', total: '$29.00' },
          { item: 'Dark mode plugin', qty: 3, unit: '$49.00', total: '$147.00' },
          { item: 'API credits', qty: 500, unit: '$0.20', total: '$100.00' },
        ].map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.item}</TableCell>
            <TableCell className="text-center">{row.qty}</TableCell>
            <TableCell className="text-right">{row.unit}</TableCell>
            <TableCell className="text-right font-mono">{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <tr>
          <TableCell colSpan={3} className="font-semibold">
            Grand Total
          </TableCell>
          <TableCell className="text-right font-semibold font-mono">$276.00</TableCell>
        </tr>
      </TableFooter>
    </Table>
  ),
};

export const FooterCustom: Story = {
  render: () => (
    <Table bordered>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {[
          { name: 'John Doe', status: 'Active' },
          { name: 'Jane Smith', status: 'Active' },
        ].map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell className="text-right">
              <button type="button" className="text-sm text-primary hover:underline">
                Edit
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <tr>
          <TableCell colSpan={3}>
            <div className="flex items-center justify-center gap-4 py-2">
              <button
                type="button"
                className="px-4 py-1.5 text-sm rounded border border-hairline hover:bg-surface-2 transition-colors"
              >
                Load more
              </button>
              <span className="text-sm text-ink-muted">2 of 42 rows</span>
            </div>
          </TableCell>
        </tr>
      </TableFooter>
    </Table>
  ),
};
