# @rewriter/table — Shared Table Domain Package

Reusable table handler registry and Hono-integrated service for the rewriter monorepo. Every app registers its table handlers once at bootstrap and exposes them through a single `GET /api/v1/table` endpoint.

## Quick Start

```typescript
import {
  TableHandler,
  TableRegistry,
  tableRegistryFactory,
  TableService,
  DefaultTableRequest,
} from '@rewriter/table';
import type { TableRequest, TableResponse, SortDto } from '@rewriter/table';
import { db } from '@rewriter/db';

// 1. Define a handler
class SourcesTableHandler extends TableHandler<unknown> {
  readonly tableId = 'sources';

  async handle(request: DefaultTableRequest, ctx) {
    const [data, total] = await Promise.all([
      db.source.findMany({ skip: (request.page - 1) * request.limit, take: request.limit }),
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
packages/table/
├── src/
│   ├── models.ts          — SortDto, TableResponse<T>, TableRequest, DefaultTableRequest
│   ├── handler.ts         — TableHandler<T> abstract class with isAssociate()
│   ├── registry.ts        — TableRegistry (array-based) + tableRegistryFactory
│   ├── table-service.ts   — TableService (parsing, resolution, serialization)
│   ├── errors.ts          — HandlerNotFoundError
│   └── index.ts           — Barrel re-exports
├── package.json
└── tsconfig.json
```

### Request Flow

```
GET /api/v1/table?id=sources&page=1&limit=20&sort={"fieldName":"createdAt","direction":"desc"}
  → TableService.registerToHono() parses query → DefaultTableRequest
  → TableRegistry.resolve(request) iterates handlers, calls isAssociate(request)
  → TableHandler.handle(request, ctx) → TableResponse<T>
  → TableService wraps with ctx.json()
```

## Exports

| Export | Kind | Description |
|--------|------|-------------|
| `TableHandler<T>` | abstract class | Base handler with default `isAssociate()` matching and abstract `handle()` |
| `TableRegistry` | class | Array-based registry; `resolve(request)` iterates handlers |
| `tableRegistryFactory` | object | `create(handlers)` bootstraps a registry from an array |
| `TableService` | class | Bridges Hono ↔ registry; parses query params, delegates, serializes |
| `DefaultTableRequest` | class | Concrete request with defaults (`page=1`, `limit=20`) |
| `HandlerNotFoundError` | class | Thrown when no handler's `isAssociate` returns `true` |
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

### Custom Matching

```typescript
isAssociate(req: TableRequest): boolean {
  return req.id.startsWith('admin:') || req.id === 'dashboard';
}
```

### Error Handling

```typescript
import { HandlerNotFoundError } from '@rewriter/table';

try {
  await tableService.handle(request, ctx);
} catch (e) {
  if (e instanceof HandlerNotFoundError) {
    // e.tableId contains the unresolved ID
  }
}
```

`TableService.registerToHono()` already catches `HandlerNotFoundError` and returns 404.

## Design Decisions

| Decision | Rationale |
|---|---|
| `TableResponse<T>` not raw `Response` | Handlers return structured data; `TableService` serializes centrally via `ctx.json()` |
| `isAssociate()` not ID-keyed map | Handlers declare their own matching logic; one class serves multiple table IDs |
| `resolve()` via linear scan | Acceptable for < 20 handlers per app; enables custom predicates |
| JSON query params with `try/catch` | Malformed `sort`/`filters` returns 400 instead of 500 |
| Abstract class not interface | Provides default `isAssociate` implementation; handlers only override when needed |

## Commands

```bash
bun run --filter @rewriter/table typecheck    # Type-check this package
bun run typecheck                             # Type-check all workspaces
```
