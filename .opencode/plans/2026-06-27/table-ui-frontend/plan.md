# Plan: Table UI Package & Frontend Components

## Purpose

Build `@rewriter/table-ui` — a React component library that renders paginated, sortable, searchable data tables driven by the `GET /api/v1/table` endpoint. Uses TanStack Table (`@tanstack/react-table`) for headless table logic and the Orval-generated API client from `@rewriter/rest-client`.

## Architecture

```
Dashboard (apps/dashboard)
  │
  ├─ imports <DataTable tableId="sources" />
  │
  ▼
┌─────────────────────────────────────────┐
│  packages/table-ui/                     │
│                                         │
│  components/DataTable                   │
│    ├── useTableData(tableId, opts)       │  ← React hook
│    │     └── getApiV1Table(params)       │  ← Orval-generated fetch (from @rewriter/rest-client)
│    ├── @tanstack/react-table            │  ← headless table logic
│    ├── DataTablePagination (pageSize=10) │
│    └── DataTableColumnHeader (sortable)  │
│                                         │
│  imports functions & types from:        │
│    @rewriter/rest-client                │
│      (getApiV1Table, GetApiV1Table200,  │
│       GetApiV1TableParams)              │
│    @rewriter/table-core                 │
│      (SortDto — internal UI type)       │
└─────────────────────────────────────────┘
  │
  ▼
GET /api/v1/table?id=sources&page=1&limit=10&sort={"fieldName":"createdAt","direction":"desc"}
  │
  ▼
@rewriter/server → TableService → TableRegistry → TableHandler
```

## File Plan

### New: `packages/table-ui/`

```
packages/table-ui/
├── package.json                        # "@rewriter/table-ui" v0.0.1
├── tsconfig.json                       # React/JSX-aware (extends dashboard pattern)
└── src/
    ├── index.ts                        # Barrel exports
    ├── hooks/
    │   └── use-table-data.ts          # useTableData React hook
    └── components/
        ├── data-table.tsx              # DataTable — main component
        ├── data-table-column-header.tsx # Sortable column header
        └── data-table-pagination.tsx   # Page nav, page size selector
```

### Modified files

| File | Change |
|---|---|
| `apps/dashboard/package.json` | Add `@rewriter/table-ui: workspace:*` dependency |
| root `tsconfig.json` | Add `@rewriter/table-ui` path alias |

## Key Interfaces & Types

### API Client (`@rewriter/rest-client`)

The table API is called via the Orval-generated `getApiV1Table` function from `@rewriter/rest-client`. No custom axios wrapper is needed.

```typescript
import { getApiV1Table } from "@rewriter/rest-client";
import type { GetApiV1TableParams, GetApiV1Table200 } from "@rewriter/rest-client";

// The generated function accepts typed params and returns the typed response:
const result: GetApiV1Table200 = await getApiV1Table({
  id: "sources",
  page: 1,
  limit: 10,
  sort: JSON.stringify({ fieldName: "createdAt", direction: "desc" }),
  search: "keyword",
});
```

Key behaviors (handled by `customFetchInstance` mutator):
- **Base URL**: resolved from `VITE_API_URL` > `API_URL` env vars > `http://localhost:3001` fallback
- **Auth**: auto-injects `Authorization: Bearer <token>` from `localStorage` (browser only)
- **Error normalization**: non-2xx responses throw `{ status, body }` object
- **Cancellation**: accepts `signal?: AbortSignal` for request aborting

### `useTableData` hook (`src/hooks/use-table-data.ts`)

```typescript
import { useState, useEffect, useCallback } from "react";
import type { SortDto } from "@rewriter/table-core";
import { getApiV1Table } from "@rewriter/rest-client";
import type { GetApiV1Table200 } from "@rewriter/rest-client";

interface UseTableDataOptions {
  pageSize?: number;           // default: 10
  initialSort?: SortDto;
}

interface UseTableDataResult {
  data: unknown[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setSort: (sort: SortDto) => void;
  setSearch: (search: string) => void;
  setFilters: (filters: Record<string, string>) => void;
}

/**
 * React hook that fetches table data and manages pagination/sort/search/filter state.
 *
 * Internally calls getApiV1Table from @rewriter/rest-client,
 * JSON-stringifying sort/filters before passing to the API.
 *
 * Catches the { status, body } thrown by customFetchInstance on non-2xx
 * and surfaces `body.error` (or `status`) as a string in `error`.
 * Uses AbortController to cancel in-flight requests on unmount or re-fetch.
 *
 * @param tableId  - Table identifier (e.g. "sources", "articles").
 * @param options  - Page size (default 10), initial sort.
 */
export function useTableData(
  tableId: string,
  options: UseTableDataOptions = {},
): UseTableDataResult;
```

The hook maps its internal state to `GetApiV1TableParams`:

```typescript
const controller = new AbortController();

const params: GetApiV1TableParams = {
  id: tableId,
  page,
  limit: pageSize,
  ...(sort && { sort: JSON.stringify(sort) }),
  ...(search && { search }),
  ...(filters && { filters: JSON.stringify(filters) }),
};

try {
  const result: GetApiV1Table200 = await getApiV1Table(params);
  // ... update state with result
} catch (err) {
  // customFetchInstance throws { status: number, body: unknown }
  const e = err as { status: number; body?: { error?: string } };
  setError(e.body?.error ?? `Request failed (${e.status})`);
}

// Cleanup on unmount / re-fetch
return () => controller.abort();
```

### `DataTable` component (`src/components/data-table.tsx`)

```tsx
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useTableData } from "../hooks/use-table-data";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { SortDto } from "@rewriter/table-core";

interface DataTableProps {
  /** Table identifier passed to the API (e.g. "sources", "articles"). */
  tableId: string;
  /** Column definitions. If omitted, columns are auto-generated from the first data row. */
  columns?: ColumnDef<unknown>[];
  /** Override page size (default 10). */
  pageSize?: number;
  /** Show a search input above the table. */
  searchable?: boolean;
  /** Callback when sorting changes. */
  onSortChange?: (sort: SortDto) => void;
}

/**
 * Full-featured data table with built-in pagination, sorting, and optional search.
 *
 * Wraps @tanstack/react-table for headless logic and uses useTableData for API calls.
 *
 * @example
 * <DataTable tableId="sources" pageSize={10} searchable />
 *
 * @example
 * <DataTable
 *   tableId="articles"
 *   columns={[
 *     { accessorKey: "title", header: "Title" },
 *     { accessorKey: "status", header: "Status" },
 *   ]}
 * />
 */
export function DataTable(props: DataTableProps): JSX.Element;
```

### `DataTablePagination` (`src/components/data-table-pagination.tsx`)

```tsx
interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination controls with prev/next, page numbers, and total count display.
 * Default page size is 10.
 */
export function DataTablePagination(props: DataTablePaginationProps): JSX.Element;
```

### `DataTableColumnHeader` (`src/components/data-table-column-header.tsx`)

```tsx
import type { Column } from "@tanstack/react-table";
import type { SortDto } from "@rewriter/table-core";

interface DataTableColumnHeaderProps {
  column: Column<unknown>;
  title: string;
  /** Current sort state (null = unsorted). */
  sort: SortDto | null;
  onSort: (sort: SortDto) => void;
}

/**
 * Sortable column header that toggles asc/desc on click.
 * Displays an arrow indicator for the active sort direction.
 */
export function DataTableColumnHeader(props: DataTableColumnHeaderProps): JSX.Element;
```

## Component Tree

```
<DataTable tableId="sources" pageSize={10} searchable>
  │
  ├── <input type="search" />           ← if searchable=true
  │
  ├── <table>                           ← TanStack Table rendering
  │     ├── <thead>
  │     │     └── <DataTableColumnHeader />  ← sortable columns
  │     └── <tbody>
  │           └── rows via flexRender()
  │
  └── <DataTablePagination              ← page nav + "1-10 of 50"
        page={1}
        totalPages={5}
        total={50}
        pageSize={10}
      />
```

## Usage in Dashboard

```tsx
// apps/dashboard/src/routes/sources.tsx
import { DataTable } from "@rewriter/table-ui";

export function SourcesPage() {
  return (
    <div>
      <h1>Content Sources</h1>
      <DataTable tableId="sources" pageSize={10} searchable />
    </div>
  );
}
```

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@rewriter/rest-client` | `workspace:*` | Orval-generated API client (`getApiV1Table`, `GetApiV1TableParams`, `GetApiV1Table200`) |
| `@rewriter/table-core` | `workspace:*` | Types: `SortDto` (internal UI sort type) |
| `@tanstack/react-table` | `^8` | Headless table logic (sorting, pagination, column defs) |
| `react` | `^19` (peer) | Component framework |
| `react-dom` | `^19` (peer) | DOM rendering |

TanStack Table v8 is the currently stable version. If the project already uses `@tanstack/react-router` v1 (which bundles TanStack Table v9 internally), we may use v9 instead — to be verified at implementation time.

## Design Decisions

| Decision | Rationale |
|---|---|
| `@tanstack/react-table` (headless) | Separates table logic (sorting, pagination state) from rendering — full control over markup |
| `@rewriter/rest-client` for API calls | Orval-generated from OpenAPI spec — auto-typed params/responses, no hand-written HTTP client. Handles base URL, auth, errors, cancellation. |
| Default page size 10 | Smaller pages = faster initial load for dashboards; user can adjust |
| `useTableData` hook encapsulates fetch + state | Keeps components pure; hook manages loading/error/pagination/sort/search in one place |
| Auto-generated columns from first data row | Zero-config for quick dashboards; explicit `columns` prop for custom formatting |
| `DataTable` wraps everything | One import for a full table with pagination + sorting + optional search |
| `SortDto` from `@rewriter/table-core` for UI-side sort state | Server-side canonical sort shape; JSON-stringified when passed to `@rewriter/rest-client` which expects `string` params |

## Rest-Client Usage Notes

The API caller is `getApiV1Table` from `@rewriter/rest-client` — an Orval-generated function backed by `customFetchInstance`. No hand-written HTTP client is needed in `table-ui`.

Key behaviors already handled by `@rewriter/rest-client`:
- **Base URL** — resolved from `VITE_API_URL` > `API_URL` > `http://localhost:3001` (dev fallback)
- **Auth** — auto-injects `Authorization: Bearer <token>` from `localStorage` in browser environments
- **Error handling** — non-2xx responses throw `{ status, body }`; `useTableData` surfaces to UI
- **Query param serialization** — `sort` and `filters` are passed as JSON strings (matching `GetApiV1TableParams`)
- **Request cancellation** — `useTableData` passes `AbortController.signal` to `getApiV1Table` via the `signal` param (supported by `customFetchInstance`)

Re-generation: run `bun run --filter @rewriter/rest-client generate` whenever the server OpenAPI spec changes.

## Execution Order

1. Create `packages/table-ui/package.json` (peer deps: react, react-dom; deps: @tanstack/react-table, @rewriter/rest-client, @rewriter/table-core)
2. Create `packages/table-ui/tsconfig.json` (React/JSX-aware, extends root)
3. Add `@rewriter/table-ui` path alias to root `tsconfig.json`
4. Implement `src/hooks/use-table-data.ts` — fetch hook with pagination/sort/search state (calls `getApiV1Table` from `@rewriter/rest-client`)
5. Implement `src/components/data-table-column-header.tsx` — sortable column header
6. Implement `src/components/data-table-pagination.tsx` — page navigation
7. Implement `src/components/data-table.tsx` — main DataTable component
8. Implement `src/index.ts` — barrel exports
9. Run `bun install` to link workspace + install dependencies
10. Run `bun run --filter @rewriter/table-ui typecheck`
11. Add `@rewriter/table-ui` to `apps/dashboard/package.json` dependencies
12. Smoke test: render `<DataTable tableId="sources" />` in a dashboard route

## Verification

```bash
# Type checking
bun run --filter @rewriter/table-ui typecheck
bun run --filter @rewriter/table-core typecheck

# Full workspace
bun run typecheck

# Lint
bun run lint

# Dashboard build (verifies bundler can resolve table-ui)
bun run --filter @rewriter/dashboard build
```
