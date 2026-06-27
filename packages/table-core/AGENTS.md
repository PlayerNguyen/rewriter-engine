# @rewriter/table-core — Backend Table Domain Package

Reusable table handler registry and Hono-integrated service for the rewriter monorepo. Every app registers its table handlers once at bootstrap and exposes them through a single `GET /api/v1/table` endpoint.

## Quick Start

```typescript
import {
  TableHandler,
  TableRegistry,
  tableRegistryFactory,
  TableService,
  DefaultTableRequest,
} from '@rewriter/table-core';
import type { TableRequest, TableResponse, SortDto } from '@rewriter/table-core';
import { db } from '@rewriter/db';

// 1. Define a handler
class SourcesTableHandler extends TableHandler<Source> {
  readonly tableId = 'sources';

  async handle(request: DefaultTableRequest, ctx) {
    const [data, total] = await Promise.all([
      db.source.findMany({ skip: (request.page - 1) * request.limit, take: request.limit, orderBy: this.toOrderBy(request.sort, ['name', 'createdAt']) }),
      db.source.count(),
    ]);
    return { data, total, page: request.page, limit: request.limit, totalPages: Math.ceil(total / request.limit) };
  }
}

// 2. Bootstrap registry + service
const registry = tableRegistryFactory.create([new SourcesTableHandler()]);
const tableService = new TableService(registry);

// 3. Mount in Hono
app.route('/api/v1/table', tableService.registerToHono());
```

## Architecture

```
packages/table-core/
├── src/
│   ├── models.ts          — SortDto, TableResponse<T>, TableRequest, DefaultTableRequest
│   ├── handler.ts         — TableHandler<T> abstract class with isAssociate(), getValidationSchema(), toOrderBy()
│   ├── registry.ts        — TableRegistry (array-based) + tableRegistryFactory
│   ├── table-service.ts   — TableService (Zod parsing, resolution, serialization)
│   ├── schemas.ts         — tableQuerySchema (Zod) + TableQuery type
│   ├── errors.ts          — HandlerNotFoundError
│   └── index.ts           — Barrel re-exports
├── package.json
└── tsconfig.json
```

### Request Flow

```
GET /api/v1/table?id=sources&page=1&limit=20&sort={"fieldName":"createdAt","direction":"desc"}
  → TableService.registerToHono() validates query via Zod (tableQuerySchema) → 400 on invalid
  → TableService constructs DefaultTableRequest from validated data
  → TableRegistry.resolve(request) iterates handlers, calls isAssociate(request)
  → If handler overrides getValidationSchema(), applies extended Zod schema
  → TableHandler.handle(request, ctx) → TableResponse<T>
  → TableService wraps with ctx.json()
```

## Exports

| Export | Kind | Description |
|--------|------|-------------|
| `TableHandler<T>` | abstract class | Base handler with default `isAssociate()`, `getValidationSchema()`, `toOrderBy()` and abstract `handle()` |
| `TableRegistry` | class | Array-based registry; `resolve(request)` iterates handlers via `isAssociate()` |
| `tableRegistryFactory` | object | `create(handlers)` bootstraps a registry, rejects duplicates |
| `TableService` | class | Bridges Hono ↔ registry; Zod validation, delegation, serialization |
| `DefaultTableRequest` | class | Concrete request with defaults (`page=1`, `limit=20`) |
| `HandlerNotFoundError` | class | Thrown when no handler's `isAssociate` returns `true` |
| `tableQuerySchema` | Zod schema | Validates query params: id, page, limit, sort, search, filters. Coerces types, parses JSON. |
| `TableQuery` | type | Output type after successful Zod validation (`z.output<typeof tableQuerySchema>`) |
| `TableRequest` | interface | Request contract — `id`, `page?`, `limit?`, `sort?`, `search?`, `filters?` |
| `TableResponse<T>` | interface | Structured response — `data`, `total`, `page`, `limit`, `totalPages` |
| `SortDto` | interface | `{ fieldName, direction }` |
| `SortDirection` | type | `'asc' \| 'desc'` |

## Patterns

### Single-ID Handler

```typescript
class SourcesTableHandler extends TableHandler<Source> {
  readonly tableId = 'sources';
  // isAssociate defaults to: request.id === this.tableId
  async handle(request, ctx) { ... }
}
```

### Multi-ID Handler

One handler class serves multiple logical tables:

```typescript
class CrudTableHandler extends TableHandler<unknown> {
  readonly tableId = 'crud';

  isAssociate(req: TableRequest): boolean {
    return ['sources', 'articles', 'prompts'].includes(req.id);
  }

  async handle(req, ctx) {
    switch (req.id) {
      case 'sources': /* query db.source */ break;
      case 'articles': /* query db.article */ break;
    }
  }
}
```

### Sorting with toOrderBy()

Use the built-in protected helper to build safe Prisma `orderBy` clauses:

```typescript
const SORTABLE_FIELDS = ['name', 'url', 'createdAt'] as const;

class SourcesTableHandler extends TableHandler {
  async handle(request, ctx) {
    const orderBy = this.toOrderBy(request.sort, SORTABLE_FIELDS);
    // orderBy === { createdAt: 'desc' } by default, or { name: 'asc' } if sort says so
    const rows = await db.source.findMany({ orderBy, ... });
  }
}
```

`toOrderBy` falls back to `{ createdAt: 'desc' }` when `sort` is undefined or the field is not in the allowlist.

### Extending Zod Validation

Override `getValidationSchema()` to add entity-specific constraints:

```typescript
class SourcesTableHandler extends TableHandler {
  getValidationSchema() {
    return super.getValidationSchema().extend({
      filters: z.record(z.enum(['type', 'isActive'])).optional(),
    });
  }
}
```

The `TableService` automatically applies the handler's schema after resolution.

### Error Handling

```typescript
import { HandlerNotFoundError } from '@rewriter/table-core';

try {
  await tableService.handle(request, ctx);
} catch (e) {
  if (e instanceof HandlerNotFoundError) {
    // e.tableId contains the unresolved ID
  }
}
```

`TableService.registerToHono()` already catches `HandlerNotFoundError` and returns 404. All other validation errors return 400.

## Design Decisions

| Decision | Rationale |
|---|---|
| `TableResponse<T>` not raw `Response` | Handlers return structured data; `TableService` serializes centrally via `ctx.json()` |
| `isAssociate()` not ID-keyed map | Handlers declare their own matching logic; one class serves multiple table IDs |
| `resolve()` via linear scan | Acceptable for < 20 handlers per app; enables custom predicates |
| Zod validation via `tableQuerySchema` | Type coercion, positive int check, and JSON parsing in one place; handler-extensible via `getValidationSchema()` |
| `toOrderBy()` on base class | Single implementation avoids duplication; allowlist prevents injection |
| Abstract class not interface | Provides default `isAssociate()`, `toOrderBy()`, `getValidationSchema()`; handlers only override when needed |

## Dependencies

| Package | Purpose |
|---|---|
| `hono` ^4 | Route definitions, Hono Context type |
| `zod` ^3.23 | Query parameter validation, coercion, JSON parse |

## Commands

```bash
bun run --filter @rewriter/table-core typecheck    # Type-check this package
bun run typecheck                                  # Type-check all workspaces
```
