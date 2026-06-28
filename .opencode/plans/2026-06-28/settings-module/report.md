# Settings Module — Plan

> **Goal**: Create `packages/settings/core` (backend handler) and `packages/settings/ui`
> (frontend page). `http://localhost:5173/settings` renders a sortable, searchable,
> paginated table of settings records via the existing `GET /api/v1/table` endpoint.

---

## 1. Folder Structure

```
packages/settings/
├── core/                                ← @rewriter/settings      (backend-only)
│   ├── package.json
│   ├── tsconfig.json
│   ├── AGENTS.md
│   └── src/
│       ├── index.ts                     # Barrel — exports SettingsTableHandler
│       ├── SettingsTableHandler.ts      # Backend handler (extends TableHandler)
│       └── SettingsTableHandler.test.ts # Unit tests (bun:test)
│
└── ui/                                  ← @rewriter/settings-ui   (frontend-only)
    ├── package.json
    ├── tsconfig.json
    ├── AGENTS.md
    └── src/
        ├── index.tsx                    # Barrel — exports SettingsPage
        └── SettingsPage/
            ├── index.tsx                # Barrel — re-exports SettingsPage
            ├── SettingsPage.tsx         # Main component with TSDoc
            └── SettingsPage.test.tsx    # Unit tests (bun:test)
```

### 1.1 Root workspace update (`package.json`)

Add `"packages/settings/*"` so bun discovers the nested packages:

```jsonc
"workspaces": [
  "packages/*",
  "packages/settings/*",   // ← new
  "apps/*"
]
```

### 1.2 `packages/settings/core/package.json`

```jsonc
{
  "name": "@rewriter/settings",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "bun test"
  },
  "dependencies": {
    "@rewriter/db": "workspace:*",
    "@rewriter/table-core": "workspace:*",
    "hono": "^4"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

> **No React** — this package only runs on the server.

### 1.3 `packages/settings/ui/package.json`

```jsonc
{
  "name": "@rewriter/settings-ui",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.tsx",
  "types": "./src/index.tsx",
  "exports": { ".": "./src/index.tsx" },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "bun test"
  },
  "dependencies": {
    "@rewriter/table-ui": "workspace:*",
    "@rewriter/ui": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5"
  },
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  }
}
```

> **No server deps** — this package only runs in the browser.

---

## 2. Backend — `packages/settings/core`

### 2.1 `src/SettingsTableHandler.ts`

Extends `TableHandler` from `@rewriter/table-core`, following the exact pattern
of `SourcesTableHandler`, `ArticlesTableHandler`, and `SystemPromptsTableHandler`:

- `tableId = 'settings'`
- Searchable by `key` (case-insensitive `contains`)
- Sortable fields: `key`, `createdAt`, `updatedAt`
- Default sort: `createdAt:desc`

### 2.2 `src/index.ts`

```ts
export { SettingsTableHandler } from './SettingsTableHandler';
```

### 2.3 Registration in `apps/server/src/configs/configTable.ts`

```typescript
import { SettingsTableHandler } from '@rewriter/settings';

const registry = tableRegistryFactory.create([
  new SourcesTableHandler(),
  new ArticlesTableHandler(),
  new SystemPromptsTableHandler(),
  new RewrittenArticlesTableHandler(),
  new SettingsTableHandler(),
]);
```

### 2.4 `src/SettingsTableHandler.test.ts`

Uses `bun:test` with `mock.module` to stub `@rewriter/db`. Covers:

| Test | What it verifies |
|------|------------------|
| `handle()` returns correct paginated shape | `data`, `total`, `page`, `limit`, `totalPages` present |
| `handle()` applies search filter | `db.setting.findMany` called with `where: { key: { contains, mode: 'insensitive' } }` when `search` is set |
| Default sort is `createdAt:desc` | When `sort` is undefined, `orderBy` = `{ createdAt: 'desc' }` |
| Allowed field sort passes through | `{ fieldName: 'key', direction: 'asc' }` → `orderBy: { key: 'asc' }` |
| Disallowed field falls back to default | `{ fieldName: 'dangerous' }` → `orderBy: { createdAt: 'desc' }` |
| Correct pagination math | `skip = (page-1)*limit`, `take = limit` |

### 2.5 Regenerate REST client

After registering the handler, regenerate so `GetApiV1TableParams.id` union includes `'settings'`:

```bash
bun run generate:client
```

---

## 3. Frontend — `packages/settings/ui`

### 3.1 Directory layout (per `docs/programming-guidelines.md`)

```
SettingsPage/
├── index.tsx          # Barrel — re-exports SettingsPage
└── SettingsPage.tsx   # Component with TSDoc
```

No `components/` subdirectory needed — the component is small and delegates to `DataTable`.

### 3.2 `src/SettingsPage/SettingsPage.tsx`

```tsx
import { DataTable } from '@rewriter/table-ui';
import { Stack, Text } from '@rewriter/ui';

/**
 * Displays all system settings in a paginated, sortable, searchable table.
 *
 * Renders a {@link DataTable} bound to the `settings` table ID served by
 * {@link SettingsTableHandler} through the `/api/v1/table` endpoint.
 *
 * @example
 * ```tsx
 * import { SettingsPage } from '@rewriter/settings-ui';
 *
 * <SettingsPage />
 * ```
 */
export function SettingsPage() {
  return (
    <Stack gap="lg">
      <Text size="headline" weight={600}>Settings</Text>
      <DataTable
        tableId="settings"
        searchable
        columns={[
          { accessorKey: 'key', header: 'Key' },
          {
            accessorKey: 'value',
            header: 'Value',
            cell: ({ getValue }) => {
              const v = getValue();
              return typeof v === 'string' ? v : JSON.stringify(v);
            },
          },
          { accessorKey: 'updatedAt', header: 'Updated' },
          { accessorKey: 'createdAt', header: 'Created' },
        ]}
      />
    </Stack>
  );
}
```

### 3.3 `src/SettingsPage/index.tsx`

```tsx
export { SettingsPage } from './SettingsPage';
```

### 3.4 `src/index.tsx` (ui package barrel)

```tsx
export { SettingsPage } from './SettingsPage';
```

### 3.5 Wire in `apps/dashboard/src/routes/settings.tsx`

Replace the existing placeholder:

```tsx
import { SettingsPage } from '@rewriter/settings-ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});
```

### 3.6 `src/SettingsPage/SettingsPage.test.tsx`

Uses `bun:test` with `@testing-library/react`. Mocks `useTableData` from
`@rewriter/table-ui`. Covers:

| Test | What it verifies |
|------|------------------|
| Renders heading | "Settings" text visible in the DOM |
| Renders `DataTable` with correct props | `tableId="settings"`, `searchable` present |
| JSON value serialized | Cell renderer stringifies non-string `value` fields |

---

## 4. Verification

| Step | Command |
|------|---------|
| 1. Install | `bun install` |
| 2. Regenerate client | `bun run generate:client` |
| 3. Handler tests | `bun run --filter @rewriter/settings test` |
| 4. UI tests | `bun run --filter @rewriter/settings-ui test` |
| 5. Typecheck both | `bun run --filter @rewriter/settings typecheck && bun run --filter @rewriter/settings-ui typecheck` |
| 6. Full typecheck | `bun run typecheck` |
| 7. Start server | `bun run dev:server` |
| 8. Smoke-test API | `curl 'http://localhost:3001/api/v1/table?id=settings'` → 4 seeded rows |
| 9. Start dashboard | `bun run dev:dashboard` |
| 10. Visit page | `http://localhost:5173/settings` → table with sort, search, pagination |

---

## 5. Dependency Matrix

| Package | Server-side deps | Frontend deps | Test runner |
|---------|-----------------|---------------|-------------|
| `@rewriter/settings` (core) | `@rewriter/db`, `@rewriter/table-core`, `hono` | — | `bun test` |
| `@rewriter/settings-ui` (ui) | — | `@rewriter/table-ui`, `@rewriter/ui`, React | `bun test` |

No new third-party dependencies. Each package has zero overlap with the other's domain.

---

## 6. Notes

- The `Setting` Prisma model already exists (`key` unique, `value` JSON, timestamps).
- Four seed settings are populated by `prisma/seed/stage2-config.ts`.
- The sidebar already links to `/settings` under "System".
- The route file `apps/dashboard/src/routes/settings.tsx` already exists as a stub.
- This plan reuses the existing `GET /api/v1/table` infrastructure — no new API endpoints.
- Test runner is `bun test` everywhere, matching the rest of the monorepo.
- The `core`/`ui` split mirrors the existing `table-core`/`table-ui` pattern — backend and frontend never share a package.
