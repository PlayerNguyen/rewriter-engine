# Global Error Handling with Pino Logging

## Summary

Added a global `app.onError()` handler to the Hono server that logs errors via Pino and returns structured JSON error responses. Previously, unhandled errors resulted in Hono's default plain-text 500 response with no logging on the response side.

## Changes

| File | Action |
|------|--------|
| `packages/db/src/index.ts` | Re-exported `PrismaClientKnownRequestError` from generated runtime |
| `apps/server/src/middleware/error-handler.ts` | **Created** — global error handler |
| `apps/server/src/app.ts` | Registered `app.onError(errorHandler)` |
| `packages/table-core/src/table-service.ts` | Removed redundant `HandlerNotFoundError` try-catch |

## Error Mapping

| Error Type | Status | Response |
|------------|--------|----------|
| `HTTPException` | Original status | `err.getResponse()` |
| `PrismaClientKnownRequestError` P2025 | 404 | `{ error: "Record not found" }` |
| `PrismaClientKnownRequestError` P2002 | 409 | `{ error: "Conflict: ..." }` |
| `PrismaClientKnownRequestError` P2003 | 400 | `{ error: "Related record not found" }` |
| `PrismaClientKnownRequestError` P2014 | 400 | `{ error: "Invalid relation" }` |
| `PrismaClientKnownRequestError` (other) | 500 | `{ error: "Database error" }` |
| `HandlerNotFoundError` | 404 | `{ error: "No table handler registered for '...'" }` |
| Unexpected errors | 500 | `{ error: "Internal Server Error" }` |

## Decisions

1. **Re-exported `PrismaClientKnownRequestError` from `@rewriter/db`** — The generated `Prisma` namespace is a runtime stub (`export const Prisma: Record<string, unknown> = {};`), so `instanceof Prisma.PrismaClientKnownRequestError` doesn't work at runtime. Re-exporting the class directly from the generated runtime solves this.

2. **Removed local `HandlerNotFoundError` catch in `table-service.ts`** — The global error handler now catches this, reducing code duplication.

3. **`@hono/structured-logger` already logs errors** via its default `onError` callback — the global `app.onError()` focuses on controlling the HTTP response shape.

## Verification

- `tsc --noEmit` passes for `@rewriter/db`, `@rewriter/table-core`, `@rewriter/server`
- All 7 e2e tests pass
- No regressions in existing health endpoint behavior
