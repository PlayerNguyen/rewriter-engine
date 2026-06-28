# @rewriter/table-ui — React Data Table Component Library

Paginated, sortable, searchable data table components driven by the `GET /api/v1/table` endpoint. Uses TanStack Table (`@tanstack/react-table`) for headless table logic and the Orval-generated API client from `@rewriter/rest-client`.

## Quick Start

```tsx
import { DataTable } from '@rewriter/table-ui';

function SourcesPage() {
  return (
    <div>
      <h1>Content Sources</h1>
      <DataTable tableId="sources" pageSize={10} searchable />
    </div>
  );
}
```

```tsx
import { DataTable } from '@rewriter/table-ui';

<DataTable
  tableId="articles"
  pageSize={10}
  searchable
  columns={[
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'status', header: 'Status' },
  ]}
  onSortChange={(sort) => console.log('Sort changed:', sort)}
/>
```

## Architecture

```
packages/table-ui/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                           # Barrel exports
    ├── hooks/
    │   └── useTableData.ts                # React hook — API fetch + state management
    └── components/
        ├── DataTable.tsx                  # Main component — TanStack Table wrapper
        ├── DataTableColumnHeader.tsx      # Sortable column header (asc/desc toggle)
        └── DataTablePagination.tsx         # Page nav, "X–Y of Z" display
```

### Data Flow

```
<DataTable tableId="sources" pageSize={10} searchable>
  │
  ├── useTableData hook
  │     └── getApiV1Table({ id, page, limit, sort, search, filters })
  │           └── customFetchInstance (base URL, auth, error handling)
  │
  ├── @tanstack/react-table (useReactTable)
  │     └── Manual pagination + sorting (server-side)
  │
  ├── <DataTableColumnHeader /> per column
  │     └── Click → setSort → re-fetch
  │
  └── <DataTablePagination />
        └── setPage → re-fetch
```

## Exports

| Export | Kind | Description |
|--------|------|-------------|
| `DataTable` | component | Full-featured table with pagination, sorting, optional search |
| `DataTableProps` | type | `tableId`, `columns?`, `pageSize?`, `searchable?`, `onSortChange?` |
| `DataTableColumnHeader` | component | Sortable `<th>` with asc/desc arrow indicator |
| `DataTableColumnHeaderProps` | type | `column`, `title`, `sort`, `onSort` |
| `DataTablePagination` | component | Prev/next, numbered pages, "X–Y of Z" count |
| `DataTablePaginationProps` | type | `page`, `totalPages`, `total`, `pageSize`, `onPageChange` |
| `useTableData` | hook | React hook — fetches table data, manages pagination/sort/search/filter state |
| `UseTableDataOptions` | type | `pageSize?` (default 10), `initialSort?` |
| `UseTableDataResult` | type | `data`, `total`, `page`, `limit`, `totalPages`, `isLoading`, `error`, `sort`, `search`, `setPage`, `setSort`, `setSearch`, `setFilters` |

## Patterns

### Auto-Generated Columns

When no `columns` prop is provided, columns are derived from the first data row's keys:

```tsx
<DataTable tableId="sources" />
// Columns auto-generated from response data
```

### Explicit Columns

```tsx
<DataTable
  tableId="articles"
  columns={[
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'createdAt', header: 'Created' },
  ]}
/>
```

### Searchable Tables

```tsx
<DataTable tableId="sources" searchable />
// Renders a debounced search input above the table
```

### Standalone Hook Usage

```tsx
import { useTableData } from '@rewriter/table-ui';

function CustomView() {
  const { data, isLoading, error, setSort, setPage } = useTableData('sources', {
    pageSize: 20,
    initialSort: { fieldName: 'createdAt', direction: 'desc' },
  });

  if (isLoading) return <Spinner />;
  if (error) return <Alert>{error}</Alert>;

  return data.map((row) => <Card key={row.id} {...row} />);
}
```

### Sorting

Column headers toggle: none → asc → desc → none. The hook passes `sort` as a JSON-stringified `SortDto` to the API:

```typescript
// API call:
getApiV1Table({
  id: 'sources',
  sort: JSON.stringify({ fieldName: 'createdAt', direction: 'desc' }),
});
```

### Error Handling

API errors (non-2xx) thrown by `customFetchInstance` as `{ status, body }` are caught by `useTableData` and surfaced as `error: string | null`. The `DataTable` component renders an error banner above the table.

## Dependencies

| Package | Purpose |
|---------|---------|
| `@rewriter/rest-client` (workspace) | `getApiV1Table` — typed API fetch with base URL, auth, error handling |
| `@rewriter/table-core` (workspace) | `SortDto` type for UI-side sort state |
| `@tanstack/react-table` ^8 | Headless table logic (pagination, sorting, column defs) |
| `react` ^18 \|\| ^19 (peer) | Component framework |
| `react-dom` ^18 \|\| ^19 (peer) | DOM rendering |

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| TanStack Table v8 (headless) | Separates table logic from rendering — full control over markup |
| `@rewriter/rest-client` for API calls | Orval-generated from OpenAPI spec — auto-typed params/responses, no hand-written HTTP client |
| Default page size 10 | Smaller pages for faster dashboard load; user adjustable via `pageSize` prop |
| `useTableData` hook encapsulates fetch + state | Keeps components pure; hook manages loading/error/pagination/sort/search in one place |
| Auto-generated columns from first data row | Zero-config for quick dashboards; explicit `columns` prop for custom formatting |
| `DataTable` wraps everything | One import for a full table with pagination + sorting + optional search |
| `SortDto` from `@rewriter/table-core` for UI sort state | Server-side canonical sort shape; JSON-stringified when passed to API |
| Manual pagination/sorting | Server-side data operations — TanStack Table manages state, not data |

## Commands

```bash
bun run --filter @rewriter/table-ui typecheck    # Type-check this package
bun run --filter @rewriter/table-ui test          # Run tests
bun run typecheck                                 # Type-check all workspaces
```
