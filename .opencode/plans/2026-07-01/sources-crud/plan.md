# Plan: Sources CRUD Module

## Goal

Add full CRUD (Create, Read, Update, Delete) functionality for the `Source` entity — the starting endpoint/URL for the Explorer Engine to explore and crawl articles. This follows the established settings module pattern.

## Current State

- **Prisma model** — `Source` model exists in `prisma/schema.prisma:74-87` with fields: `id`, `name`, `url`, `type` (RSS/WEB/API), `isActive`, `lastFetched`, timestamps
- **Table handler** — `SourcesTableHandler` exists in `apps/server/src/tables/sources.ts` (read-only, paginated, searchable)
- **Dashboard route** — `/sources` is a stub (just renders `<Text>Sources</Text>`)
- **No API routes** — No create/update/delete endpoints exist
- **No modals** — No source-related modals registered

## Architecture

Following the **settings module pattern** — dual packages (`core` + `ui`):

```
packages/sources/
├── core/                              # @rewriter/sources (backend)
│   ├── src/
│   │   ├── index.ts                   # Barrel exports
│   │   ├── SourcesService.ts          # CRUD business logic
│   │   ├── SourcesService.test.ts
│   │   ├── SourcesTableHandler.ts     # Moved from apps/server/src/tables/
│   │   ├── SourcesTableHandler.test.ts
│   │   ├── sourcesRoute.ts            # Hono routes (POST, PATCH, DELETE)
│   │   └── sourcesRoute.test.ts
│   ├── package.json
│   └── tsconfig.json
└── ui/                                # @rewriter/sources-ui (frontend)
    ├── src/
    │   ├── index.tsx                   # Barrel exports
    │   ├── SourcesPage/
    │   │   ├── index.tsx
    │   │   ├── SourcesPage.tsx         # DataTable + action buttons
    │   │   └── SourcesPage.test.tsx
    │   ├── CreateSourceModal/
    │   │   ├── index.tsx
    │   │   ├── CreateSourceModal.tsx   # Form: name, url, type dropdown, isActive
    │   │   └── CreateSourceModal.test.tsx
    │   └── EditSourceModal/
    │       ├── index.tsx
    │       ├── EditSourceModal.tsx     # Pre-filled form for editing
    │       └── EditSourceModal.test.tsx
    ├── package.json
    └── tsconfig.json
```

## Implementation Steps

### Step 1 — Create `packages/sources/core/` package

**Files to create:**
- `packages/sources/core/package.json` — `@rewriter/sources`, deps: `@rewriter/db`, `@rewriter/table-core`, `hono`, `hono-openapi`, `zod`
- `packages/sources/core/tsconfig.json` — extends base config
- `packages/sources/core/src/index.ts` — barrel exports

**`SourcesService.ts`** — CRUD operations:
```typescript
class SourcesService {
  async create(data: { name: string; url: string; type?: SourceType; isActive?: boolean }): Promise<Source>
  async update(id: string, data: Partial<{ name: string; url: string; type: SourceType; isActive: boolean }>): Promise<Source>
  async delete(id: string): Promise<Source>
  async getById(id: string): Promise<Source | null>
}
```

**`SourcesTableHandler.ts`** — Move from `apps/server/src/tables/sources.ts` into this package. Same logic, new location.

**`sourcesRoute.ts`** — Hono routes with OpenAPI docs:
- `POST /sources` — create a source (body: `name`, `url`, `type?`, `isActive?`)
- `PATCH /sources/:id` — update a source (body: partial fields)
- `DELETE /sources/:id` — delete a source

**Validation schemas** (Zod):
- `createSourceSchema` — `name` (string, required), `url` (string, url format, required), `type` (enum RSS/WEB/API, default RSS), `isActive` (boolean, default true)
- `updateSourceSchema` — all fields optional, at least one required

### Step 2 — Register on the server

**Modify:**
- `apps/server/src/routes/sources.ts` — Import and re-export `sourcesRoute` from `@rewriter/sources`
- `apps/server/src/routes/index.ts` — Add `routes.route('/', sources)`
- `apps/server/src/configs/configTable.ts` — Change `SourcesTableHandler` import from `../tables/sources` to `@rewriter/sources`

**Delete:**
- `apps/server/src/tables/sources.ts` — Moved to `packages/sources/core/`

### Step 3 — Regenerate OpenAPI spec + REST client

```bash
bun run --filter @rewriter/server generate-openapi
bun run --filter @rewriter/rest-client generate
```

This produces typed functions like `postApiV1Sources`, `patchApiV1SourcesById`, `deleteApiV1SourcesById` in `@rewriter/rest-client`.

### Step 4 — Create `packages/sources/ui/` package

**Files to create:**
- `packages/sources/ui/package.json` — `@rewriter/sources-ui`, deps: `@rewriter/rest-client`, `@rewriter/table-ui`, `@rewriter/ui`, `@rewriter/modal`
- `packages/sources/ui/tsconfig.json`
- `packages/sources/ui/src/index.tsx` — barrel exports

**`SourcesPage.tsx`** — Uses `<DataTable tableId="sources" />` with columns:
- `name` — text
- `url` — text (truncated)
- `type` — badge/chip (RSS, WEB, API)
- `isActive` — toggle or badge
- `lastFetched` — formatted date
- `actions` — Edit + Delete buttons

Includes "Add Source" button that opens `CreateSourceModal`.

**`CreateSourceModal.tsx`** — Form with:
- `name` — `TextInput`
- `url` — `TextInput` (with URL validation)
- `type` — `Select` dropdown (RSS, WEB, API)
- `isActive` — `Checkbox` (default: true)
- Submit calls `postApiV1Sources`

**`EditSourceModal.tsx`** — Pre-filled form, same fields. Submit calls `patchApiV1SourcesById`.

### Step 5 — Dashboard integration

**Modify:**
- `apps/dashboard/src/configs/configureModals.tsx` — Register `'create-source'` and `'edit-source'` modals
- `apps/dashboard/src/routes/sources.tsx` — Replace stub with `SourcesPage` from `@rewriter/sources-ui`, wire up modal openers
- `apps/dashboard/src/i18n/locales/en.json` — Add source form labels/errors

### Step 6 — Unit tests

For each new file, write tests following the existing patterns:
- `SourcesService.test.ts` — Mock `db.source.*`, test create/update/delete
- `SourcesTableHandler.test.ts` — Mock DB, test pagination, search, sorting
- `sourcesRoute.test.ts` — Test HTTP endpoints
- `SourcesPage.test.tsx` — Render test, verify DataTable renders
- `CreateSourceModal.test.tsx` — Form submission, validation
- `EditSourceModal.test.tsx` — Pre-filling, submission

### Step 7 — Verification

```bash
bun run --filter @rewriter/sources typecheck
bun run --filter @rewriter/sources-ui typecheck
bun run --filter @rewriter/server typecheck
bun run --filter @rewriter/dashboard typecheck
bun run lint
bun test
```

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Package structure | Dual `core/` + `ui/` | Matches settings module pattern |
| Table handler location | `packages/sources/core/` | Co-locates all source logic |
| Source type selector | `Select` dropdown | Clean UX, matches existing `Select` component |
| Delete confirmation | Browser `confirm()` or modal | Simple for now; can upgrade to dedicated modal later |
| Validation | Zod schemas in route | Matches settings pattern, auto-generates OpenAPI |

## Files Changed Summary

| Action | File |
|--------|------|
| **Create** | `packages/sources/core/package.json` |
| **Create** | `packages/sources/core/tsconfig.json` |
| **Create** | `packages/sources/core/src/index.ts` |
| **Create** | `packages/sources/core/src/SourcesService.ts` |
| **Create** | `packages/sources/core/src/SourcesService.test.ts` |
| **Create** | `packages/sources/core/src/SourcesTableHandler.ts` |
| **Create** | `packages/sources/core/src/SourcesTableHandler.test.ts` |
| **Create** | `packages/sources/core/src/sourcesRoute.ts` |
| **Create** | `packages/sources/core/src/sourcesRoute.test.ts` |
| **Create** | `packages/sources/ui/package.json` |
| **Create** | `packages/sources/ui/tsconfig.json` |
| **Create** | `packages/sources/ui/src/index.tsx` |
| **Create** | `packages/sources/ui/src/SourcesPage/index.tsx` |
| **Create** | `packages/sources/ui/src/SourcesPage/SourcesPage.tsx` |
| **Create** | `packages/sources/ui/src/SourcesPage/SourcesPage.test.tsx` |
| **Create** | `packages/sources/ui/src/CreateSourceModal/index.tsx` |
| **Create** | `packages/sources/ui/src/CreateSourceModal/CreateSourceModal.tsx` |
| **Create** | `packages/sources/ui/src/CreateSourceModal/CreateSourceModal.test.tsx` |
| **Create** | `packages/sources/ui/src/EditSourceModal/index.tsx` |
| **Create** | `packages/sources/ui/src/EditSourceModal/EditSourceModal.tsx` |
| **Create** | `packages/sources/ui/src/EditSourceModal/EditSourceModal.test.tsx` |
| **Modify** | `apps/server/src/routes/sources.ts` |
| **Modify** | `apps/server/src/routes/index.ts` |
| **Modify** | `apps/server/src/configs/configTable.ts` |
| **Delete** | `apps/server/src/tables/sources.ts` |
| **Modify** | `apps/dashboard/src/configs/configureModals.tsx` |
| **Modify** | `apps/dashboard/src/routes/sources.tsx` |
| **Modify** | `apps/dashboard/src/i18n/locales/en.json` |
