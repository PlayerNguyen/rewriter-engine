# Plan: Unit Test Coverage — All Packages & Apps

## Purpose

Establish a comprehensive unit-testing strategy across the monorepo. Backend packages use Bun's built-in test runner (`bun:test`). Frontend packages use Vitest + React Testing Library. Every package gets a `test` script and initial coverage of core logic.

## Test Framework Matrix

| Package / App | Runner | Add-ons | Pattern |
|---|---|---|---|
| `packages/table-core` | `bun:test` | — | `**/*.test.ts` |
| `packages/db` | `bun:test` | — | `**/*.test.ts` |
| `packages/logger` | `bun:test` | — | `**/*.test.ts` |
| `apps/server` | `bun:test` | `@hono/testing`? | `**/*.test.ts` |
| `packages/ui` | `vitest` | `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` | `**/*.test.{ts,tsx}` |
| `packages/table-ui` *(planned)* | `vitest` | `@testing-library/react`, `msw` (for axios) | `**/*.test.{ts,tsx}` |
| `apps/dashboard` | `vitest` | `@testing-library/react` | `**/*.test.{ts,tsx}` |

## Root-Level Scripts

Add to root `package.json`:

```jsonc
{
  "scripts": {
    "test": "bun run --filter '*' test",
    "test:backend": "bun run --filter '@rewriter/table-core' --filter '@rewriter/logger' --filter '@rewriter/db' --filter '@rewriter/server' test",
    "test:frontend": "bun run --filter '@rewriter/ui' --filter '@rewriter/dashboard' test"
  }
}
```

## Implementation Per Package

---

### 1. `packages/table-core` (Bun)

**Script:** `"test": "bun test"`

**Test file layout:**
```
packages/table-core/src/
├── __tests__/
│   ├── models.test.ts           # DefaultTableRequest defaults, SortDto
│   ├── handler.test.ts          # TableHandler isAssociate default + override
│   ├── registry.test.ts         # register, resolve, duplicate, not-found
│   ├── table-service.test.ts    # registerToHono, handle, JSON.parse guard, 400/404
│   └── errors.test.ts           # HandlerNotFoundError name + tableId
```

**Key test cases:**

| File | Tests |
|---|---|
| `models.test.ts` | `DefaultTableRequest` defaults page=1, limit=20; optional fields are undefined; `id` is required |
| `handler.test.ts` | Default `isAssociate` returns true when ids match; false when they differ; custom override for multi-ID |
| `registry.test.ts` | `register()` throws on duplicate; `resolve()` returns correct handler; `resolve()` throws `HandlerNotFoundError` for unknown ID; `tableRegistryFactory.create()` registers all |
| `table-service.test.ts` | `registerToHono()` returns Hono instance; `GET /?id=sources` → 200; missing `id` → 400; invalid JSON `sort` → 400; unknown `id` → 404; `handle()` wraps result with `ctx.json()` |
| `errors.test.ts` | `HandlerNotFoundError` has `name`, `message`, `tableId` properties |

**Mocking Hono Context for table-service tests:**

```typescript
import { test, expect, mock } from "bun:test";

function mockContext(): Context {
  return {
    req: { query: () => ({}) },
    json: mock((data) => new Response(JSON.stringify(data))),
    // minimal Hono Context shape
  } as unknown as Context;
}
```

Bun's `mock()` covers function mocking without extra libraries. For `table-service.test.ts`, we mock `Context` to assert `ctx.json()` is called with the right payload and `req.query()` returns test params.

---

### 2. `packages/logger` (Bun)

**Script:** `"test": "bun test"`

**Test file layout:**
```
packages/logger/src/
└── __tests__/
    └── index.test.ts            # createLogger, createChildLogger, singleton logger
```

**Key test cases:**

| Test | Assertion |
|---|---|
| Singleton `logger` is created | `logger` is not undefined, has `.info`, `.child` methods |
| `createLogger()` returns pino instance | Custom level respected |
| `createChildLogger()` binds fields | Child logger inherits parent + extra bindings |
| Production mode has no transport | Set `NODE_ENV=production`, verify no pretty transport |

Mock `process.env` per test via `beforeEach`/`afterEach`.

---

### 3. `packages/db` (Bun)

**Script:** `"test": "bun test"`

**Constraint:** Needs a running Postgres instance + generated Prisma client. For unit tests, we test the singletons and module structure rather than live queries.

**Test file layout:**
```
packages/db/src/
└── __tests__/
    └── client.test.ts           # Singleton caching, exports shape
```

**Key test cases:**

| Test | Assertion |
|---|---|
| `db` is exported | Module exports a `db` property |
| Singleton cached in dev | Same instance on multiple imports (globalThis check) |
| Type exports present | `export type * from '@prisma/client'` re-exports exist |

For full integration tests (live DB queries), a separate `db.integration.test.ts` can be added later with Dockerized Postgres.

---

### 4. `apps/server` (Bun)

**Script:** `"test": "bun test"`

**Test file layout:**
```
apps/server/src/
├── __tests__/
│   ├── health.test.ts           # GET /health → 200
│   └── tables/
│       ├── sources.test.ts      # SourcesTableHandler queries
│       ├── articles.test.ts     # ArticlesTableHandler queries
│       └── ...
```

**Key test cases:**

| File | Tests |
|---|---|
| `health.test.ts` | `GET /health` returns `{ status: "ok", timestamp: ... }` with 200 |
| `sources.test.ts` | `SourcesTableHandler.handle()` returns `TableResponse` shape; search filter passed to Prisma; sort defaults to `createdAt:desc`; invalid sort field falls back to default |

**Testing Hono routes with `bun:test`:**

```typescript
import { test, expect } from "bun:test";
import { createApp } from "../app";

test("GET /health returns ok", async () => {
  const app = createApp();
  const res = await app.request("/api/v1/health");
  expect(res.status).toBe(200);
  const body = await res.json();
  expect(body.status).toBe("ok");
});
```

Hono's `app.request()` creates a full HTTP request in-process — no server needed.

For table handler tests, mock `db` from `@rewriter/db`:

```typescript
import { mock } from "bun:test";
import { db } from "@rewriter/db";

mock.module("@rewriter/db", () => ({
  db: {
    source: {
      findMany: mock(() => Promise.resolve([])),
      count: mock(() => Promise.resolve(0)),
    },
  },
}));
```

---

### 5. `packages/ui` (Vitest)

**Script:** `"test": "vitest run"`  
**Additional scripts:** `"test:watch": "vitest"`

**New dependencies (dev):**
```json
{
  "vitest": "^3",
  "@testing-library/react": "^16",
  "@testing-library/jest-dom": "^6",
  "jsdom": "^26"
}
```

**Config (`vitest.config.ts`):**
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
});
```

**Setup (`vitest.setup.ts`):**
```typescript
import "@testing-library/jest-dom/vitest";
```

**Test file layout:**
```
packages/ui/src/
├── __tests__/
│   ├── components/
│   │   ├── Button.test.tsx      # renders, click handler, disabled state
│   │   ├── Modal.test.tsx       # open/close, backdrop click, ESC key
│   │   ├── TextInput.test.tsx   # value, onChange, placeholder
│   │   └── ...
│   ├── hooks/
│   │   ├── useClickOutside.test.ts
│   │   └── useFocusTrap.test.ts
│   └── utils/
│       ├── cn.test.ts           # clsx merging, conditional classes
│       └── mergeRefs.test.ts    # multi-ref merging
```

**Key test cases (per component):**

| Component | Tests |
|---|---|
| `Button` | Renders children; fires `onClick`; applies variant class; disabled state prevents click |
| `Modal` | Opens when `isOpen=true`; closes on backdrop click; closes on ESC; renders title/children |
| `TextInput` | Controlled value via `onChange`; placeholder renders; disabled state |
| `Checkbox` | Toggles checked state; label click toggles |
| `Select` | Options render; `onChange` fires with correct value |
| `Sidebar` | Collapsed/expanded state; nav items render |
| `Tooltip` | Shows on hover; hides on mouse leave |

**Existing Storybook stories** (`*.stories.tsx`) can inform what visual states to test.

---

### 6. `packages/table-ui` (Vitest — planned, implement after package created)

**Script:** `"test": "vitest run"`

**Config:** Same pattern as `packages/ui` with `jsdom` + React plugins. Additionally needs `msw` for mocking the axios API calls.

**Test file layout:**
```
packages/table-ui/src/
├── __tests__/
│   ├── api/
│   │   └── table-api.test.ts    # TableApiClient.fetch builds correct URL/params
│   ├── hooks/
│   │   └── use-table-data.test.ts # Loading state, data, error, pagination
│   └── components/
│       ├── data-table.test.tsx    # Renders rows, search input
│       └── data-table-pagination.test.tsx  # Page buttons, disabled states
```

---

### 7. `apps/dashboard` (Vitest)

**Script:** `"test": "vitest run"`

**Config:** Extends existing Vite config; add `vitest` section mirroring `packages/ui`.

**Test file layout:**
```
apps/dashboard/src/
└── __tests__/
    └── components/
        ├── LanguageModal.test.tsx
        └── SettingsMenu.test.tsx
```

Dashboard tests are lighter — most UI logic lives in `packages/ui`. Focus on route-level integration (rendering the right page for a URL) and app-specific components.

---

## Directory Convention

All test files live in `__tests__/` directories mirroring the source structure:

```
src/
├── models.ts
├── __tests__/
│   └── models.test.ts           ← tests for models.ts
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx       ← tests for Button.tsx
```

This keeps tests close to the code they cover while avoiding clutter with `.test.ts` files scattered among source files.

## Root-Level Test Scripts

Add to root `package.json`:

```json
{
  "scripts": {
    "test": "bun test && bun run --filter '@rewriter/ui' --filter '@rewriter/dashboard' test",
    "test:backend": "bun test",
    "test:frontend": "bun run --filter '@rewriter/ui' --filter '@rewriter/dashboard' test"
  }
}
```

Note: `bun test` automatically discovers `*.test.ts` files across the monorepo (respecting `workspaces` config). It skips Vitest packages since they use a different runner. The `test:frontend` script explicitly runs Vitest for frontend packages.

Alternatively, we can keep all test runs filter-based for clarity:

```json
{
  "scripts": {
    "test": "bun run --filter '*' test",
    "test:backend": "bun run --filter '@rewriter/table-core' --filter '@rewriter/logger' --filter '@rewriter/db' --filter '@rewriter/server' test",
    "test:frontend": "bun run --filter '@rewriter/ui' --filter '@rewriter/dashboard' test"
  }
}
```

## Execution Order

| Step | Package | What |
|---|---|---|
| 1 | `packages/table-core` | Add `"test": "bun test"` script, write `__tests__/` |
| 2 | `packages/logger` | Add `"test": "bun test"` script, write `__tests__/index.test.ts` |
| 3 | `packages/db` | Add `"test": "bun test"` script, write `__tests__/client.test.ts` |
| 4 | `apps/server` | Add `"test": "bun test"` script, write `__tests__/health.test.ts`, `__tests__/tables/` |
| 5 | `packages/ui` | Add Vitest deps, `vitest.config.ts`, `vitest.setup.ts`, `__tests__/components/` |
| 6 | `apps/dashboard` | Add Vitest + test scripts, `__tests__/components/` |
| 7 | Root `package.json` | Add `test`, `test:backend`, `test:frontend` scripts |
| 8 | CI (future) | Optional `.github/workflows/test.yml` |

## Verification

```bash
# Backend (Bun)
bun test                                          # discovers all *.test.ts in workspaces
bun run --filter @rewriter/table-core test
bun run --filter @rewriter/logger test
bun run --filter @rewriter/server test

# Frontend (Vitest)
bun run --filter @rewriter/ui test
bun run --filter @rewriter/dashboard test

# All together
bun run test
```
