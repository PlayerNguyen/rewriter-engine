# Plan: Table UI Package & Frontend Components

## Purpose

Build `@rewriter/table-ui` — a React component library that renders paginated, sortable, searchable data tables driven by the `GET /api/v1/table` endpoint. Uses TanStack Table (`@tanstack/react-table`) for headless table logic and an axios-based API caller that consumes types from `@rewriter/table-core`.

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
│    │     └── tableApi.fetch(req)         │  ← axios caller
│    ├── @tanstack/react-table            │  ← headless table logic
│    ├── DataTablePagination (pageSize=10) │
│    └── DataTableColumnHeader (sortable)  │
│                                         │
│  imports types from:                    │
│    @rewriter/table-core (TableResponse,  │
│      TableRequest, SortDto, etc.)        │
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
    ├── api/
    │   └── table-api.ts               # Axios-based TableApiClient
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

### `TableApiClient` (`src/api/table-api.ts`)

```typescript
import axios, { type AxiosInstance } from "axios";
import type { TableRequest, TableResponse } from "@rewriter/table-core";

/**
 * Axios-based client for the table API endpoint.
 * Created once per app with the API base URL.
 */
export class TableApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  /**
   * Fetch a paginated, sorted, searchable table result.
   * @param request - Table identifier + query parameters.
   * @returns A structured TableResponse with rows, total count, and pagination info.
   */
  async fetch(request: TableRequest): Promise<TableResponse> {
    const response = await this.client.get<TableResponse>("/api/v1/table", {
      params: {
        id: request.id,
        page: request.page,
        limit: request.limit,
        sort: request.sort ? JSON.stringify(request.sort) : undefined,
        search: request.search,
        filters: request.filters ? JSON.stringify(request.filters) : undefined,
      },
    });
    return response.data;
  }
}

/** Singleton convenience — set base URL once in app bootstrap. */
export const tableApi = new TableApiClient("http://localhost:3001");
```

### `useTableData` hook (`src/hooks/use-table-data.ts`)

```typescript
import { useState, useEffect, useCallback } from "react";
import type { SortDto, TableResponse } from "@rewriter/table-core";
import { tableApi } from "../api/table-api";

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
  error: Error | null;
  setPage: (page: number) => void;
  setSort: (sort: SortDto) => void;
  setSearch: (search: string) => void;
}

/**
 * React hook that fetches table data and manages pagination/sort/search state.
 *
 * @param tableId  - Table identifier (e.g. "sources", "articles").
 * @param options  - Page size (default 10), initial sort.
 */
export function useTableData(
  tableId: string,
  options: UseTableDataOptions = {},
): UseTableDataResult;
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
| `@rewriter/table-core` | `workspace:*` | Types: `TableResponse`, `TableRequest`, `SortDto` |
| `@tanstack/react-table` | `^8` | Headless table logic (sorting, pagination, column defs) |
| `axios` | `^1` | HTTP client for the table API |
| `react` | `^19` (peer) | Component framework |
| `react-dom` | `^19` (peer) | DOM rendering |

TanStack Table v8 is the currently stable version. If the project already uses `@tanstack/react-router` v1 (which bundles TanStack Table v9 internally), we may use v9 instead — to be verified at implementation time.

## Design Decisions

| Decision | Rationale |
|---|---|
| `@tanstack/react-table` (headless) | Separates table logic (sorting, pagination state) from rendering — full control over markup |
| Axios for API calls | Widespread, interceptor support, familiar API. Singleton `TableApiClient` per app. |
| Default page size 10 | Smaller pages = faster initial load for dashboards; user can adjust |
| `useTableData` hook encapsulates fetch + state | Keeps components pure; hook manages loading/error/pagination/sort/search in one place |
| Auto-generated columns from first data row | Zero-config for quick dashboards; explicit `columns` prop for custom formatting |
| `DataTable` wraps everything | One import for a full table with pagination + sorting + optional search |
| Types imported from `@rewriter/table-core` | Single source of truth for `TableRequest`/`TableResponse`/`SortDto` — no duplication |

## API Caller Collaboration Notes

The axios caller is bundled into `table-ui` for immediate use. If the need arises for a standalone API client package (shared across multiple frontends, with interceptor config, auth tokens, etc.), it can be extracted to `packages/table-api/` later. For now, keeping it in `table-ui` avoids over-engineering.

Key considerations for the axios caller:
- **Base URL** — configured once, typically `http://localhost:3001` in dev
- **Error handling** — `TableService` returns 400/404 as JSON; `useTableData` surfaces errors to the UI
- **Query param serialization** — `sort` and `filters` are JSON-stringified before sending via `params`
- **Request cancellation** — `useTableData` should abort in-flight requests on unmount/re-fetch (AbortController)

## Execution Order

1. Create `packages/table-ui/package.json` (peer deps: react, react-dom; deps: @tanstack/react-table, axios, @rewriter/table-core)
2. Create `packages/table-ui/tsconfig.json` (React/JSX-aware, extends root)
3. Add `@rewriter/table-ui` path alias to root `tsconfig.json`
4. Implement `src/api/table-api.ts` — `TableApiClient` + singleton `tableApi`
5. Implement `src/hooks/use-table-data.ts` — fetch hook with pagination/sort/search state
6. Implement `src/components/data-table-column-header.tsx` — sortable column header
7. Implement `src/components/data-table-pagination.tsx` — page navigation
8. Implement `src/components/data-table.tsx` — main DataTable component
9. Implement `src/index.ts` — barrel exports
10. Run `bun install` to link workspace + install dependencies
11. Run `bun run --filter @rewriter/table-ui typecheck`
12. Add `@rewriter/table-ui` to `apps/dashboard/package.json` dependencies
13. Smoke test: render `<DataTable tableId="sources" />` in a dashboard route

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
