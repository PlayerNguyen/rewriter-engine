# Plan: E2E Testing for Apps

## Purpose

End-to-end tests for `apps/*` using Hono's `app.request()` — full request/response cycle through routing, middleware, and handlers without starting a live server. Runner: `bun:test`.

## Pattern

```typescript
import { describe, test, expect } from "bun:test";
import { createApp } from "../app";

describe("GET /api/v1/health", () => {
  test("returns 200 with status ok", async () => {
    const app = createApp();
    const res = await app.request("/api/v1/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      status: "ok",
      timestamp: expect.any(String),
    });
  });
});
```

## Directory Convention

```
apps/server/src/
├── __e2e__/                     ← E2E tests (full request/response)
│   ├── health.e2e.test.ts       ← /health endpoint
│   └── table.e2e.test.ts        ← /table endpoint (after DB is connected)
└── __tests__/                   ← Unit tests (isolated logic)
```

## Scope per App

| App | Initial E2E Tests |
|---|---|
| `apps/server` | `/health` status + timestamp |
| `apps/server` (follow-up) | `/api/v1/table?id=sources` (requires DB) |
| `apps/dashboard` (future) | Playwright or similar browser E2E |

## Scripts

Add to `apps/server/package.json`:

```json
{
  "scripts": {
    "test:e2e": "bun test __e2e__/"
  }
}
```

Root-level convenience:

```json
{
  "scripts": {
    "test:e2e": "bun run --filter '@rewriter/server' test:e2e"
  }
}
```

## Differentiation from Unit Tests

| Aspect | Unit (`__tests__/`) | E2E (`__e2e__/`) |
|---|---|---|
| Scope | Isolated function/class | Full Hono request lifecycle |
| Approach | Direct calls, mocks | `app.request()` |
| Middleware | Mocked or skipped | Runs real middleware (CORS, logging, requestId) |
| Example | `SourcesTableHandler.handle()` | `GET /api/v1/table?id=sources` |
