# Global Error Handling with Pino Logging

## Problem

The server has no `app.onError()` handler. When unhandled errors occur (Prisma errors, unexpected exceptions), Hono returns a plain-text 500 with no logging on the response side. The `@hono/structured-logger` already logs errors via its default `onError` callback, but doesn't control the HTTP response shape.

## Goal

Add a global `app.onError()` handler that:
1. Logs errors via `c.var.logger` (Pino) with structured context
2. Returns proper JSON error responses with appropriate HTTP status codes
3. Maps known error types to status codes: `HTTPException`, Prisma errors, `HandlerNotFoundError`
4. Returns generic `{ error: "Internal Server Error" }` for unknown errors (500)

## Changes

### 1. Re-export `PrismaClientKnownRequestError` from `@rewriter/db`

The generated `Prisma` namespace in `packages/db/src/generated/prisma/index.ts` is a runtime stub (`export const Prisma: Record<string, unknown> = {};`), so `Prisma.PrismaClientKnownRequestError` is `undefined` at runtime. We need to re-export the actual class from the generated runtime.

**Edit `packages/db/src/index.ts`** — add:

```ts
export { PrismaClientKnownRequestError } from './generated/prisma/runtime/client.js';
```

### 2. Create `apps/server/src/middleware/error-handler.ts`

New file — global error handler using `app.onError()`.

```ts
import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { PrismaClientKnownRequestError } from '@rewriter/db';
import { HandlerNotFoundError } from '@rewriter/table-core';
import type { AppEnv } from '../types/env';

export const errorHandler: ErrorHandler<AppEnv> = (err, c) => {
  const logger = c.var.logger;

  if (err instanceof HTTPException) {
    logger.warn({ status: err.status, message: err.message }, 'HTTP exception');
    return err.getResponse();
  }

  if (err instanceof PrismaClientKnownRequestError) {
    const mapped = mapPrismaError(err);
    logger.warn({ prismaCode: err.code, status: mapped.status, message: mapped.message }, 'Prisma error');
    return c.json({ error: mapped.message }, mapped.status);
  }

  if (err instanceof HandlerNotFoundError) {
    logger.warn({ tableId: err.tableId, message: err.message }, 'Handler not found');
    return c.json({ error: err.message }, 404);
  }

  logger.error({ err, message: err.message }, 'Unhandled error');
  return c.json({ error: 'Internal Server Error' }, 500);
};

function mapPrismaError(err: PrismaClientKnownRequestError): { status: number; message: string } {
  switch (err.code) {
    case 'P2025':
      return { status: 404, message: 'Record not found' };
    case 'P2002':
      return { status: 409, message: `Conflict: ${String(err.meta?.target ?? 'duplicate value')}` };
    case 'P2003':
      return { status: 400, message: 'Related record not found' };
    case 'P2014':
      return { status: 400, message: 'Invalid relation' };
    default:
      return { status: 500, message: 'Database error' };
  }
}
```

### 3. Register in `apps/server/src/app.ts`

Import and register after middleware, before routes:

```ts
import { errorHandler } from './middleware/error-handler';
// ...
app.onError(errorHandler);
```

### 4. Remove redundant `HandlerNotFoundError` catch in `packages/table-core/src/table-service.ts`

The global handler now catches `HandlerNotFoundError`. Remove the try-catch in `registerToHono()`:

**Before:**
```ts
let handler: TableHandler;
try {
  handler = this.registry.resolve(request);
} catch (e) {
  if (e instanceof HandlerNotFoundError) {
    return c.json({ error: e.message }, 404);
  }
  throw e;
}
```

**After:**
```ts
const handler = this.registry.resolve(request);
```

## Files to modify

| File | Action |
|------|--------|
| `packages/db/src/index.ts` | **Edit** — re-export `PrismaClientKnownRequestError` |
| `apps/server/src/middleware/error-handler.ts` | **Create** — global error handler |
| `apps/server/src/app.ts` | **Edit** — register `app.onError(errorHandler)` |
| `packages/table-core/src/table-service.ts` | **Edit** — remove redundant try-catch |

## Verification

1. `bun run --filter @rewriter/server typecheck`
2. `bun run --filter @rewriter/table-core typecheck`
3. `bun run --filter @rewriter/db typecheck`
4. `bun run --filter @rewriter/server test` (if tests exist)
5. Manual: hit a non-existent table ID → JSON `{ error: "..." }` with 404
6. Manual: PATCH /settings/nonexistent-key → JSON `{ error: "Record not found" }` with 404
