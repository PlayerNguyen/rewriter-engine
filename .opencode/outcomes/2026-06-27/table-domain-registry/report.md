# Outcome: Table Domain Registry Package

**Date:** 2026-06-27
**Branch:** `feat/table-domain-registry`
**Plan:** `.opencode/plans/2026-06-27/table-domain-registry/plan.md`

## Summary

Created `@rewriter/table` — a shared package providing reusable contracts, a registry pattern, and a Hono-integrated service for a generic table API. All `apps/` in the monorepo can now register table handlers and expose them through a single endpoint without re-implementing routing, parameter parsing, or error handling.

## Deliverables

### New Package: `packages/table/`

```
packages/table/
├── package.json          # "@rewriter/table" v0.0.1, depends on hono ^4
├── tsconfig.json         # Matches packages/db/tsconfig.json
└── src/
    ├── models.ts         # SortDirection, SortDto, TableResponse<T>, TableRequest, DefaultTableRequest
    ├── handler.ts        # TableHandler<T> abstract class with default isAssociate()
    ├── errors.ts         # HandlerNotFoundError
    ├── registry.ts       # TableRegistry, tableRegistryFactory
    ├── table-service.ts  # TableService (handle + registerToHono)
    └── index.ts          # Barrel exports
```

### Key Decisions Implemented

| Decision | Implementation |
|---|---|
| `TableResponse<T>` instead of raw `Response` | Handlers return `Promise<TableResponse<T>>`; `TableService` wraps with `ctx.json()` |
| `TableHandler` as abstract class with `isAssociate()` | Default `isAssociate` checks `req.id === this.tableId`; override to serve multiple IDs from one handler class. Registry resolves via linear scan through `isAssociate`. |
| `SortDto` as `{ fieldName, direction }` | Typed contract in `models.ts`; parsed from JSON query param |
| `try/catch` on `JSON.parse` | Malformed `sort`/`filters` returns 400 instead of crashing |
| `registerToHono()` auto-mount | Returns Hono sub-app; mounted via `app.route()` |
| TSDoc on all public API | Every class, interface, method has JSDoc |
| `hono` in dependencies | Listed in `package.json` (same pattern as `@rewriter/logger` → `pino`) |

### Modified Files

| File | Change |
|---|---|
| `tsconfig.json` | Added `@rewriter/table` and `@rewriter/table/*` path aliases |

## Verification

```
$ bun run lint
Checked 99 files in 36ms. No fixes applied.

$ bun run typecheck
@rewriter/table typecheck: Exited with code 0
@rewriter/logger typecheck: Exited with code 0
@rewriter/server typecheck: Exited with code 0
@rewriter/ui typecheck: Exited with code 0
@rewriter/dashboard typecheck: Exited with code 0
```

## Out of Scope (Follow-up)

- Table handler implementations (sources, articles, system-prompts, etc.)
- `apps/server/configs/configTable.ts` bootstrap
- Mount in `apps/server/src/app.ts`
