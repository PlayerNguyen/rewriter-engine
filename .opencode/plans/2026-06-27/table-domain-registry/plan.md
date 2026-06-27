# Plan: Table Domain Registry

## Purpose

An internal reusable table system that allows all `apps/` in the monorepo to share a single standard for table data retrieval without re-implementing the same logic. Each app registers its table handlers into a `TableRegistry`, and a single Hono endpoint dispatches to the correct handler by table ID.

## Scope

| In scope | Out of scope |
|---|---|
| `packages/table/` — all contracts, registry, service, models | Table handlers (sources, articles, etc.) |
| Hono `registerToHono()` auto-mount | `apps/server/configs/configTable.ts` bootstrap |
| TypeScript doc comments on all public API | Mounting in `apps/server/src/app.ts` |

Handlers will be implemented in a follow-up task.

## Architecture

```
Frontend:  GET /api/v1/table?id=sources&page=1&limit=20&sort={fieldName,direction}
               │
               ▼
┌─────────────────────────────────────────────────────┐
│  TableService.registerToHono() → Hono sub-app       │
│    - parses query params → DefaultTableRequest       │
│    - guards JSON.parse with try/catch → 400 on error │
│    - resolves handler, delegates, serializes result  │
└──────────────────────────┬──────────────────────────┘
                           │
               ┌───────────▼───────────┐
               │   TableRegistry       │
               │   resolve(request)     │  ← iterates handlers, calls
               └───────────┬───────────┘    isAssociate(request)
                           │
               ┌───────────▼───────────┐
               │   TableHandler         │
               │ → TableResponse<T>    │
               └───────────────────────┘
```

### Response flow

1. `TableService` parses query → `DefaultTableRequest`
2. `TableRegistry.resolve(request)` iterates handlers, calls `isAssociate(request)` on each → first match wins
3. `TableHandler.handle()` returns a **structured `TableResponse<T>`** (plain data, no Hono knowledge)
4. `TableService.handle()` wraps it with `ctx.json()` — centralizes serialization
5. Handlers never touch `Response` or `ctx.json()` — eliminates boilerplate

### `isAssociate` matching

- **Default**: `request.id === this.tableId` — single-ID handler
- **Override** for multi-ID: `return ['sources', 'articles'].includes(req.id)` — one handler class serves multiple logical tables
- **Override** for custom logic: any predicate on `TableRequest` fields

## File Plan

### New: `packages/table/` (shared package)

```
packages/table/
├── package.json               # "@rewriter/table" v0.0.1, private, type: module
├── tsconfig.json              # Match packages/db/tsconfig.json
└── src/
    ├── models.ts              # TableRequest, DefaultTableRequest, SortDto
    ├── handler.ts             # TableHandler interface
    ├── registry.ts            # TableRegistry class + tableRegistryFactory
    ├── table-service.ts       # TableService (handle + registerToHono)
    ├── errors.ts              # HandlerNotFoundError
    └── index.ts               # Barrel exports
```

### Modified files

| File | Change |
|---|---|
| root `tsconfig.json` | Add `@rewriter/table` path alias |

## Key Types

### `SortDto`

```typescript
/** Sort direction for table queries. */
export type SortDirection = 'asc' | 'desc';

/**
 * Describes a single sort field and its direction.
 * Example: `{ fieldName: 'createdAt', direction: 'desc' }`
 */
export interface SortDto {
  fieldName: string;
  direction: SortDirection;
}
```

### `TableResponse<T>`

```typescript
/**
 * Structured payload returned by every {@link TableHandler}.
 * TableService centralizes JSON serialization so handlers never
 * deal with Hono's Response API directly.
 *
 * @typeParam T - The entity type for each row in `data`.
 */
export interface TableResponse<T = unknown> {
  /** Array of entity rows for the current page. */
  data: T[];
  /** Total number of records matching the query (across all pages). */
  total: number;
  /** Current page number (1-based). */
  page: number;
  /** Results per page. */
  limit: number;
  /** Total number of pages. */
  totalPages: number;
}
```

### `TableRequest`

```typescript
/**
 * Generic request contract for table queries.
 * The `id` field identifies which registered table handler to invoke.
 */
export interface TableRequest {
  /** Table identifier — matches a handler's `tableId` (e.g. "sources", "articles"). */
  id: string;
  /** Page number (1-based). Defaults to 1. */
  page?: number;
  /** Results per page. Defaults to 20. */
  limit?: number;
  /** Sort by a single field and direction. */
  sort?: SortDto;
  /** Full-text search term applied at the handler's discretion. */
  search?: string;
  /** Arbitrary key-value filters applied at the handler's discretion. */
  filters?: Record<string, string>;
}
```

### `DefaultTableRequest`

```typescript
/**
 * Concrete request class with sensible defaults.
 * - `page` defaults to `1`
 * - `limit` defaults to `20`
 *
 * @example
 * new DefaultTableRequest({ id: 'sources', page: 2, sort: { fieldName: 'createdAt', direction: 'desc' } })
 */
export class DefaultTableRequest implements TableRequest {
  readonly id: string;
  readonly page: number;
  readonly limit: number;
  readonly sort?: SortDto;
  readonly search?: string;
  readonly filters?: Record<string, string>;

  constructor(params: { id: string; page?: number; limit?: number; sort?: SortDto; search?: string; filters?: Record<string, string> }) {
    this.id = params.id;
    this.page = params.page ?? 1;
    this.limit = params.limit ?? 20;
    this.sort = params.sort;
    this.search = params.search;
    this.filters = params.filters;
  }
}
```

### `TableHandler`

```typescript
import type { Context } from 'hono';

/**
 * Contract for a table handler.
 * Each handler processes requests for one logical table
 * and is registered into a {@link TableRegistry} keyed by its `tableId`.
 *
 * Handlers return a structured {@link TableResponse} — they never
 * touch Hono's `Response` or `ctx.json()`. The {@link TableService}
 * handles serialization centrally.
 *
 * @typeParam T - The entity type returned in `data` rows (defaults to `unknown`).
 *
 * @example
 * class SourcesTableHandler implements TableHandler<Source> {
 *   readonly tableId = 'sources';
 *   async handle(request, ctx) {
 *     const [data, total] = await Promise.all([...]);
 *     return { data, total, page: request.page, limit: request.limit, totalPages: ... };
 *   }
 * }
 */
export interface TableHandler<T = unknown> {
  /** Unique identifier matching the `id` field in {@link TableRequest}. */
  readonly tableId: string;

  /**
   * Process a table request and return a structured data payload.
   * @param request - The parsed and validated table request.
   * @param ctx     - The Hono request context (for logging, headers, etc.).
   * @returns A {@link TableResponse} containing the paginated result set.
   */
  handle(request: DefaultTableRequest, ctx: Context): Promise<TableResponse<T>>;
}
```

### `HandlerNotFoundError`

```typescript
/**
 * Thrown when a {@link TableRegistry} cannot resolve a table ID
 * to a registered {@link TableHandler}.
 */
export class HandlerNotFoundError extends Error {
  readonly tableId: string;
  constructor(tableId: string) {
    super(`No table handler registered for '${tableId}'`);
    this.name = 'HandlerNotFoundError';
    this.tableId = tableId;
  }
}
```

### `TableRegistry`

```typescript
/**
 * Per-app registry that maps table IDs to {@link TableHandler} instances.
 *
 * Handlers are registered once during app bootstrap via
 * {@link tableRegistryFactory.create}.
 *
 * @example
 * const registry = tableRegistryFactory.create([
 *   new SourcesTableHandler(),
 * ]);
 */
export class TableRegistry {
  private handlers: Map<string, TableHandler>;

  constructor() {
    this.handlers = new Map();
  }

  /**
   * Register a handler.
   * @throws If a handler with the same `tableId` is already registered.
   */
  register(handler: TableHandler): void;

  /**
   * Retrieve a handler by table ID.
   * @throws {HandlerNotFoundError} If no handler is registered for the given ID.
   */
  getHandler(id: string): TableHandler;
}
```

### `tableRegistryFactory`

```typescript
/**
 * Factory for building a {@link TableRegistry} from an array of handlers.
 * Validates that no duplicate `tableId` values exist across the provided handlers.
 *
 * @example
 * const registry = tableRegistryFactory.create([
 *   new SourcesTableHandler(),
 *   new ArticlesTableHandler(),
 * ]);
 */
export const tableRegistryFactory: {
  /**
   * @param handlers - Array of handler instances to register.
   * @returns A fully configured TableRegistry.
   * @throws If two handlers share the same `tableId`.
   */
  create(handlers: TableHandler[]): TableRegistry;
};
```

### `TableService`

```typescript
/**
 * Service layer that bridges Hono HTTP requests to the {@link TableRegistry}.
 *
 * Responsibilities:
 * - Parse incoming query params into a {@link DefaultTableRequest}.
 * - Guard JSON.parse with try/catch → 400 on malformed sort/filters.
 * - Resolve the correct {@link TableHandler} from the registry.
 * - Delegate to the handler and wrap the {@link TableResponse} with ctx.json().
 * - Surface {@link HandlerNotFoundError} as a 404 JSON response.
 *
 * @example
 * // Bootstrap
 * const registry = tableRegistryFactory.create([...]);
 * const tableService = new TableService(registry);
 *
 * // Mount in Hono
 * app.route('/api/v1/table', tableService.registerToHono());
 */
export class TableService {
  /**
   * @param registry - The table registry containing all registered handlers.
   */
  constructor(registry: TableRegistry);

  /**
   * Look up the handler matching `request.id`, delegate, and serialize the
   * returned {@link TableResponse} via `ctx.json()`.
   * @throws {HandlerNotFoundError} if no handler is found.
   */
  handle(request: DefaultTableRequest, ctx: Context): Promise<Response>;

  /**
   * Creates a Hono sub-app that handles `GET /` with query parameters:
   *   - `id` (required) — table identifier
   *   - `page`, `limit` — pagination (defaults 1 / 20)
   *   - `sort` — JSON-encoded {@link SortDto}
   *   - `search` — full-text search term
   *   - `filters` — JSON-encoded key-value map
   *
   * Malformed `sort` or `filters` JSON returns a **400 Bad Request**
   * instead of a 500 crash. Missing `id` also returns 400.
   *
   * @returns A Hono instance to be mounted via `app.route(path, ...)`.
   */
  registerToHono(): Hono;
}
```

## Design Decisions

| Decision | Rationale |
|---|---|
| Hono-only | Only server uses Hono; no Express/Next needed |
| Handlers in each app (future) | App-specific logic stays in the app; package provides contracts only |
| Auto-mount via `registerToHono()` | Returns Hono sub-app mounted with `app.route()` — matches existing project pattern |
| Single generic `DefaultTableRequest` | No per-table request subclassing; handlers extract extra params from `ctx.req.query()` if needed |
| `tableRegistryFactory.create()` | Clean bootstrap; prevents duplicate `tableId` registrations at construction time |
| `SortDto` as `{ fieldName, direction }` | Typed contract instead of opaque string — avoids parsing `"field:dir"` in every handler |
| `TableResponse<T>` instead of raw `Response` | Handlers return structured data; `TableService` serializes centrally. Eliminates `ctx.json()` boilerplate in every handler. |
| `isAssociate(request)` instead of ID key | Handlers declare their own matching logic. One handler class can serve multiple table IDs. Registry resolves via linear scan — acceptable for < 20 handlers per app. |
| `try/catch` on `JSON.parse` for `sort`/`filters` | Malformed query params return 400 instead of unhandled 500 crash |
| `hono` in `dependencies` of `packages/table` | Package imports `Context`, `Hono` types — needs the dependency (same pattern as `@rewriter/logger`→`pino`) |
| **TSDoc on all public API** | Every exported class, interface, method, and function must carry JSDoc comments following TypeScript documentation standards |

## Execution Order

1. Create `packages/table/package.json` (match `packages/db/package.json` pattern, `"name": "@rewriter/table"`, include `"hono": "^4"` in `dependencies`)
2. Create `packages/table/tsconfig.json` (match `packages/db/tsconfig.json`)
3. Add `@rewriter/table` path alias to root `tsconfig.json`
4. Add `"typecheck": "tsc --noEmit"` script to `packages/table/package.json`
5. Implement source files with TSDoc:
   - `src/models.ts` — `SortDirection`, `SortDto`, `TableResponse<T>`, `TableRequest`, `DefaultTableRequest`
   - `src/handler.ts` — `TableHandler<T>` (returns `Promise<TableResponse<T>>`)
   - `src/errors.ts` — `HandlerNotFoundError`
   - `src/registry.ts` — `TableRegistry`, `tableRegistryFactory`
   - `src/table-service.ts` — `TableService` (with try/catch on JSON.parse, wraps handler result in ctx.json)
   - `src/index.ts` — barrel exports
6. Run `bun install` to link workspace
7. Run `bun run --filter @rewriter/table typecheck`

## Verification

```bash
# Type checking
bun run --filter @rewriter/table typecheck

# Full workspace check
bun run typecheck
```
