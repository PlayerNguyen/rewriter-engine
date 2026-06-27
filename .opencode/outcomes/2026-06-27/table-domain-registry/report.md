# Outcome: Table Domain Registry Package

**Date:** 2026-06-27
**Branch:** `feat/table-domain-registry`
**Plan:** `.opencode/plans/2026-06-27/table-domain-registry/plan.md`

## Summary

Created `@rewriter/table-core` — a shared package providing reusable contracts, a registry pattern with `isAssociate()` matching, Zod validation, and a Hono-integrated `TableService` for a generic table API. All `apps/` in the monorepo can now register table handlers and expose them through a single `GET /api/v1/table` endpoint without re-implementing routing, parameter parsing, or error handling.

## Deliverables

### New Package: `packages/table-core/`

```
packages/table-core/
├── package.json          # "@rewriter/table-core" v0.0.1, depends on hono ^4, zod ^3.23
├── tsconfig.json         # Matches packages/db/tsconfig.json
└── src/
    ├── models.ts         # SortDirection, SortDto, TableResponse<T>, TableRequest, DefaultTableRequest
    ├── handler.ts        # TableHandler<T> abstract class with isAssociate(), getValidationSchema(), toOrderBy()
    ├── schemas.ts        # tableQuerySchema (Zod) + TableQuery type
    ├── registry.ts       # TableRegistry, tableRegistryFactory
    ├── table-service.ts  # TableService (Zod validation, handle + registerToHono)
    ├── errors.ts         # HandlerNotFoundError
    └── index.ts          # Barrel exports
```

### Entity Handlers: `apps/server/src/tables/`

```
apps/server/src/tables/
├── articles.ts           # ArticlesTableHandler (search: title, url)
├── rewritten-articles.ts # RewrittenArticlesTableHandler (search: title, content, llmModel)
├── sources.ts            # SourcesTableHandler (search: name)
└── system-prompts.ts     # SystemPromptsTableHandler (search: name, description)
```

### Config & Mount: `apps/server/`

```
apps/server/src/
├── configs/configTable.ts  # Singleton registry + TableService bootstrap
└── app.ts                  # Mounts /api/v1/table via app.route()
```

### E2E Tests

```
apps/server/src/__e2e__/
└── health.e2e.test.ts    # Health endpoint, CORS headers, 404
```

## Key Decisions Implemented

| Decision | Implementation |
|---|---|
| `TableResponse<T>` instead of raw `Response` | Handlers return `Promise<TableResponse<T>>`; `TableService` wraps with `ctx.json()` |
| `TableHandler` as abstract class with `isAssociate()` | Default `isAssociate` checks `req.id === this.tableId`; override to serve multiple IDs from one handler class. Registry resolves via linear scan through `isAssociate`. |
| `SortDto` as `{ fieldName, direction }` | Typed contract in `models.ts`; parsed from JSON query param by Zod |
| Zod validation (`tableQuerySchema`) | Coerces page/limit to positive integers with defaults; parses sort/filters JSON via `.transform()`; returns 400 on invalid input. Handler-extensible via `getValidationSchema()`. |
| `toOrderBy()` on base class | Protected helper accepting sortable fields allowlist; fallback to `createdAt:desc`. Eliminated 4x duplicated private methods. |
| `registerToHono()` auto-mount | Returns Hono sub-app; mounted via `app.route()` |
| TSDoc on all public API | Every class, interface, method, and export has JSDoc with `@param`, `@returns`, `@typeParam`, `@example`, `{@link}` |
| `hono` + `zod` in dependencies | Listed in `package.json` (same pattern as `@rewriter/logger` → `pino`) |

### Modified Files

| File | Change |
|---|---|
| root `tsconfig.json` | Added `@rewriter/table-core` and `@rewriter/table-core/*` path aliases |
| `apps/server/package.json` | Added `@rewriter/table-core: workspace:*`, `test:e2e` script |
| `apps/server/src/app.ts` | Mounted `/api/v1/table` route |
| root `package.json` | Added `test:e2e` script |

## Verification

```
$ bun run lint
Checked 106 files in 28ms. No fixes applied.

$ bun run typecheck
@rewriter/table-core typecheck: Exited with code 0
@rewriter/logger typecheck: Exited with code 0
@rewriter/server typecheck: Exited with code 0
@rewriter/ui typecheck: Exited with code 0
@rewriter/dashboard typecheck: Exited with code 0
```

## Follow-up (Separate PRs)

- `@rewriter/table-ui` — React frontend components with TanStack Table (see `.opencode/plans/2026-06-27/table-ui-frontend/plan.md`)
- Unit tests per `.opencode/plans/2026-06-27/unit-test-coverage/plan.md`
- `handle()` structural duplication across handlers — potential `EntityTableHandler<T>` base class
