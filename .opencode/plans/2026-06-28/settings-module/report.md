# Settings Module — Plan

> **Goal**: Create `packages/settings/core` (backend handler + update service + route)
> and `packages/settings/ui` (frontend page + edit modal). `http://localhost:5173/settings`
> renders a sortable, searchable, paginated table of settings records with inline
> edit buttons that open a modal form via the modal registry.

---

## 1. Folder Structure

```
packages/settings/
├── core/                                ← @rewriter/settings      (backend-only)
│   ├── package.json
│   ├── tsconfig.json
│   ├── AGENTS.md
│   └── src/
│       ├── index.ts                     # Barrel — exports all public symbols
│       ├── SettingsTableHandler.ts      # Read handler (extends TableHandler)
│       ├── SettingsTableHandler.test.ts # Unit tests (bun:test)
│       ├── SettingsService.ts           # Update logic (db write)
│       ├── SettingsService.test.ts      # Unit tests (bun:test)
│       └── settingsRoute.ts             # Hono sub-app (PATCH /settings/:key)
│
└── ui/                                  ← @rewriter/settings-ui   (frontend-only)
    ├── package.json
    ├── tsconfig.json
    ├── AGENTS.md
    └── src/
        ├── index.tsx                    # Barrel — exports SettingsPage
        ├── SettingsPage/
        │   ├── index.tsx                # Barrel — re-exports SettingsPage
        │   ├── SettingsPage.tsx         # Main component with TSDoc
        │   └── SettingsPage.test.tsx    # Unit tests (bun:test)
        └── EditSettingModal/
            ├── index.tsx                # Barrel — re-exports EditSettingModal
            ├── EditSettingModal.tsx     # Edit modal component with TSDoc
            └── EditSettingModal.test.tsx# Unit tests (bun:test)
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
    "hono": "^4",
    "hono-openapi": "^0.4.0",
    "zod": "^3.23.0",
    "zod-openapi": "^4.0.0"
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
    "@rewriter/rest-client": "workspace:*",
    "@rewriter/table-ui": "workspace:*",
    "@rewriter/ui": "workspace:*"
  },
  "devDependencies": {
    "@rewriter/modal": "workspace:*",
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

### 2.2 `src/SettingsService.ts`

Encapsulates write operations on settings. Called by the route handler.

```ts
import { db } from '@rewriter/db';
import type { Setting } from '@rewriter/db';

/**
 * Service for reading and updating system settings.
 *
 * Read operations are handled by {@link SettingsTableHandler} via the
 * existing `/api/v1/table` endpoint. This service covers writes.
 */
export class SettingsService {
  /**
   * Update the value of a setting by its unique key.
   * @param key   — the setting key (e.g. "llm.provider")
   * @param value — new JSON value
   * @returns The updated {@link Setting} record.
   * @throws If no setting exists with the given key.
   */
  async update(key: string, value: unknown): Promise<Setting> {
    return db.setting.update({
      where: { key },
      data: { value },
    });
  }
}
```

### 2.3 `src/settingsRoute.ts`

A Hono sub-app exposing `PATCH /settings/:key`. Delegates to `SettingsService`.
Uses `describeRoute` (hono-openapi) so the endpoint is picked up by the OpenAPI
spec and then by Orval's code generation.

```ts
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver, validator as zValidator } from 'hono-openapi/zod';
import { z } from 'zod';
import { SettingsService } from './SettingsService';

const settingsService = new SettingsService();

const updateBodySchema = z.object({
  value: z.union([z.string(), z.number(), z.boolean(), z.record(z.any()), z.array(z.any())]),
});

const settingsRoute = new Hono();

settingsRoute.patch(
  '/settings/:key',
  describeRoute({
    tags: ['Settings'],
    description: 'Update a setting value by key',
    responses: {
      200: {
        description: 'Setting updated successfully',
        content: { 'application/json': { schema: resolver(z.object({
          id: z.string(),
          key: z.string(),
          value: z.any(),
          updatedAt: z.string(),
        })) } },
      },
      404: { description: 'Setting not found' },
    },
  }),
  zValidator('json', updateBodySchema),
  async (c) => {
    const key = c.req.param('key');
    const { value } = c.req.valid('json');
    const updated = await settingsService.update(key, value);
    return c.json(updated);
  },
);

export default settingsRoute;
```

### 2.4 `src/SettingsService.test.ts`

Uses `bun:test` with `mock.module` to stub `@rewriter/db`.

| Test | What it verifies |
|------|------------------|
| `update()` calls `db.setting.update` with correct args | `where: { key }`, `data: { value }` |
| `update()` returns the updated record | Response matches Prisma return shape |
| `update()` propagates Prisma errors | Non-existent key → throws |

### 2.5 Registration in `apps/server/src/routes/settings.ts`

Create a new route file that imports the Hono sub-app from the package:

```typescript
import settingsRoute from '@rewriter/settings/settingsRoute';
export default settingsRoute;
```

Wire into `apps/server/src/routes/index.ts`:

```typescript
import settings from './settings';

const routes = new Hono<AppEnv>();
routes.route('/', health);
routes.route('/', settings);  // ← new
```

### 2.6 `src/index.ts` (updated barrel)

```ts
export { SettingsTableHandler } from './SettingsTableHandler';
export { SettingsService } from './SettingsService';
export { default as settingsRoute } from './settingsRoute';
```

### 2.7 Registration in `apps/server/src/configs/configTable.ts`

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

### 2.8 `src/SettingsTableHandler.test.ts`

Uses `bun:test` with `mock.module` to stub `@rewriter/db`. Covers:

| Test | What it verifies |
|------|------------------|
| `handle()` returns correct paginated shape | `data`, `total`, `page`, `limit`, `totalPages` present |
| `handle()` applies search filter | `db.setting.findMany` called with `where: { key: { contains, mode: 'insensitive' } }` when `search` is set |
| Default sort is `createdAt:desc` | When `sort` is undefined, `orderBy` = `{ createdAt: 'desc' }` |
| Allowed field sort passes through | `{ fieldName: 'key', direction: 'asc' }` → `orderBy: { key: 'asc' }` |
| Disallowed field falls back to default | `{ fieldName: 'dangerous' }` → `orderBy: { createdAt: 'desc' }` |
| Correct pagination math | `skip = (page-1)*limit`, `take = limit` |

### 2.9 Regenerate REST client

After registering the handler **and** the `PATCH /settings/:key` route, regenerate
the OpenAPI spec (which now includes the Settings tag) and the Orval client:

```bash
bun run generate:client
```

This adds `patchApiV1SettingsByKey` (typed with `{ key: string }` param and `{ value: unknown }` body) to `@rewriter/rest-client`.

---

## 3. Frontend — `packages/settings/ui`

### 3.1 Directory layout (per `docs/programming-guidelines.md`)

```
src/
├── index.tsx                          # Barrel — exports SettingsPage
├── SettingsPage/
│   ├── index.tsx                      # Barrel
│   ├── SettingsPage.tsx               # Table + edit button + refresh logic
│   └── SettingsPage.test.tsx          # Unit tests
└── EditSettingModal/
    ├── index.tsx                      # Barrel
    ├── EditSettingModal.tsx           # Edit form modal with TSDoc
    └── EditSettingModal.test.tsx      # Unit tests
```

---

### 3.2 `src/EditSettingModal/EditSettingModal.tsx`

Opened via the modal registry. Renders the `@rewriter/ui` `Modal` with a form
to edit a single setting's JSON value.

**Props** (injected by `ModalService` as `ModalBaseProps`, plus custom):

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | From `ModalBaseProps` — visibility gate |
| `onClose` | `() => void` | From `ModalBaseProps` — dismiss |
| `settingKey` | `string` | The setting key (read-only field) |
| `currentValue` | `unknown` | The current JSON value, pre-filled |
| `onSaved` | `() => void` | Called after a successful save |

```tsx
import { customFetchInstance } from '@rewriter/rest-client';
import { Button, Modal, ModalFooter, ModalHeader, TextArea } from '@rewriter/ui';
import { useCallback, useState } from 'react';
import type { ModalBaseProps } from '@rewriter/modal';

export interface EditSettingModalCustomProps {
  settingKey: string;
  currentValue: unknown;
  onSaved?: () => void;
}

/**
 * Modal form for editing a single system setting's value.
 *
 * Displays the setting key as read-only text and the value as a JSON
 * textarea. PATCHes `/api/v1/settings/:key` on submit.
 *
 * Designed to be registered in the modal registry and opened via
 * `useModal().open('edit-setting', { settingKey, currentValue, onSaved })`.
 *
 * @example
 * ```tsx
 * // In modal registry (configureModals.ts):
 * 'edit-setting': (p: ModalBaseProps & EditSettingModalCustomProps) => (
 *   <EditSettingModal {...p} />
 * )
 *
 * // In a component:
 * const { open } = useModal();
 * open('edit-setting', {
 *   settingKey: 'llm.provider',
 *   currentValue: 'openai',
 *   onSaved: () => console.log('saved'),
 * });
 * ```
 */
export function EditSettingModal({
  open,
  onClose,
  settingKey,
  currentValue,
  onSaved,
}: ModalBaseProps & EditSettingModalCustomProps) {
  const [value, setValue] = useState(() =>
    typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue, null, 2),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch {
        setError('Invalid JSON');
        setSaving(false);
        return;
      }

      await customFetchInstance({
        url: `/api/v1/settings/${encodeURIComponent(settingKey)}`,
        method: 'PATCH',
        body: { value: parsed },
      });

      onSaved?.();
      onClose();
    } catch (e) {
      const err = e as { status: number; body?: { error?: string } };
      setError(err.body?.error ?? `Request failed (${err.status})`);
    } finally {
      setSaving(false);
    }
  }, [value, settingKey, onSaved, onClose]);

  return (
    <Modal open={open} onClose={onClose} size="md" title="Edit Setting">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-subtle mb-1">Key</label>
          <p className="text-sm text-ink">{settingKey}</p>
        </div>

        <div>
          <label htmlFor="setting-value" className="block text-sm font-medium text-ink-subtle mb-1">
            Value (JSON)
          </label>
          <TextArea
            id="setting-value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
        </div>

        {error && <p className="text-sm text-semantic-error">{error}</p>}
      </div>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
```

### 3.3 `src/EditSettingModal/index.tsx`

```tsx
export { EditSettingModal } from './EditSettingModal';
export type { EditSettingModalCustomProps } from './EditSettingModal';
```

---

### 3.4 `src/SettingsPage/SettingsPage.tsx`

Renders the table with an edit button per row. Accepts an `onEdit` callback
so the app can wire it to any modal service (or any other behavior).

```tsx
import { DataTable } from '@rewriter/table-ui';
import { Button, Stack, Text } from '@rewriter/ui';
import type { ComponentProps } from 'react';

export interface SettingsPageProps {
  /**
   * Called when the user clicks "Edit" on a row.
   * The app wires this to `useModal().open(...)` (or any other handler).
   */
  onEdit?: (key: string, currentValue: unknown, onSaved: () => void) => void;
  /**
   * Increment to force the DataTable to remount and re-fetch.
   * Typically driven by the `onSaved` callback from {@link onEdit}.
   */
  refreshKey?: number;
}

/**
 * Displays all system settings in a paginated, sortable, searchable table
 * with an inline edit button per row.
 *
 * The edit button delegates to {@link SettingsPageProps.onEdit | onEdit} —
 * the app is responsible for opening a modal and calling the `onSaved`
 * callback after a successful save. Incrementing `refreshKey` causes the
 * table to remount and re-fetch.
 *
 * @example
 * ```tsx
 * import { useModal } from '../config/configureModals';
 * import { SettingsPage } from '@rewriter/settings-ui';
 *
 * function SettingsRoute() {
 *   const { open } = useModal();
 *   const [refreshKey, setRefreshKey] = useState(0);
 *   return (
 *     <SettingsPage
 *       refreshKey={refreshKey}
 *       onEdit={(key, value, onSaved) =>
 *         open('edit-setting', { settingKey: key, currentValue: value, onSaved })
 *       }
 *     />
 *   );
 * }
 * ```
 */
export function SettingsPage({
  onEdit,
  refreshKey = 0,
}: SettingsPageProps) {
  return (
    <Stack gap="lg">
      <Text size="headline" weight={600}>Settings</Text>
      <div key={refreshKey}>
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
            {
              id: 'actions',
              header: '',
              cell: ({ row }) => {
                const setting = row.original as { key: string; value: unknown };
                return (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onEdit?.(setting.key, setting.value, () => {})
                    }
                  >
                    Edit
                  </Button>
                );
              },
            },
          ]}
        />
      </div>
    </Stack>
  );
}
```

> **Refresh mechanism**: Wrapping `DataTable` in `<div key={refreshKey}>` causes
> React to unmount and remount the entire `DataTable` subtree when `refreshKey`
> increments. This triggers a fresh `useTableData` fetch.

### 3.5 `src/SettingsPage/index.tsx`

```tsx
export { SettingsPage } from './SettingsPage';
export type { SettingsPageProps } from './SettingsPage';
```

### 3.6 `src/index.tsx` (ui package barrel)

```tsx
export { SettingsPage } from './SettingsPage';
export type { SettingsPageProps } from './SettingsPage';
export { EditSettingModal } from './EditSettingModal';
export type { EditSettingModalCustomProps } from './EditSettingModal';
```

---

### 3.7 Wiring the edit modal to the modal registry

In `apps/dashboard/src/config/configureModals.ts` (from the
[modal-registry plan](../modal-registry/report.md)), register the edit modal
and export `useModal`:

```tsx
import { configureModalService, type ModalBaseProps } from '@rewriter/modal';
import {
  EditSettingModal,
  type EditSettingModalCustomProps,
} from '@rewriter/settings-ui';
import { LanguageModal } from '../components/LanguageModal';

export const { ModalProvider, useModal } = configureModalService({
  'language': (p: ModalBaseProps) => <LanguageModal {...p} />,
  'edit-setting': (p: ModalBaseProps & EditSettingModalCustomProps) => (
    <EditSettingModal {...p} />
  ),
});
```

### 3.8 Wire in `apps/dashboard/src/routes/settings.tsx`

Replace the stub with an app-level wrapper that connects `useModal` to
`SettingsPage` via the `onEdit` + `refreshKey` props:

```tsx
import { SettingsPage } from '@rewriter/settings-ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useModal } from '../config/configureModals';

export const Route = createFileRoute('/settings')({
  component: SettingsRoute,
});

function SettingsRoute() {
  const { open } = useModal();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <SettingsPage
      refreshKey={refreshKey}
      onEdit={(key, value) =>
        open('edit-setting', {
          settingKey: key,
          currentValue: value,
          onSaved: () => setRefreshKey((k) => k + 1),
        })
      }
    />
  );
}
```

### 3.9 Unit tests

**`EditSettingModal.test.tsx`** — uses `bun:test` + `@testing-library/react`.
Mocks `customFetchInstance` from `@rewriter/rest-client`.

| Test | What it verifies |
|------|------------------|
| Renders key as read-only text | `settingKey` prop displayed, not an input |
| Pre-fills textarea with stringified value | `currentValue` → stringified in textarea |
| Shows JSON parse error for invalid input | Submitting malformed JSON shows error |
| Calls `customFetchInstance` with correct body | `PATCH /api/v1/settings/:key`, `{ value: parsed }` |
| Calls `onSaved` after success | `onSaved` prop invoked after 2xx response |
| Calls `onClose` after success | Modal dismisses on successful save |
| Disables buttons while saving | `saving` state → both buttons have `disabled` |

**`SettingsPage.test.tsx`** — mocks `useTableData` from `@rewriter/table-ui`.
No modal dependency — tests the `onEdit` callback in isolation.

| Test | What it verifies |
|------|------------------|
| Renders heading | "Settings" text visible |
| Renders `DataTable` with `tableId="settings"` | Correct table ID prop |
| Renders edit button per row | "Edit" button visible for each row |
| Edit button calls `onEdit` with correct args | `onEdit(settingKey, currentValue, onSaved)` called |
| Remounts on `refreshKey` change | DataTable re-fetches when `refreshKey` increments |

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
| 8. Smoke-test read | `curl 'http://localhost:3001/api/v1/table?id=settings'` → 4 seeded rows |
| 9. Smoke-test update | `curl -X PATCH 'http://localhost:3001/api/v1/settings/llm.provider' -H 'Content-Type: application/json' -d '{"value":"azure"}'` → updated record |
| 10. Start dashboard | `bun run dev:dashboard` |
| 11. Visit page | `http://localhost:5173/settings` → table + edit button per row |
| 12. Edit flow | Click "Edit" → modal opens with pre-filled JSON → change value → Save → table refreshes |

---

## 5. Dependency Matrix

| Package | Runtime deps | Dev deps | Test runner |
|---------|-------------|----------|-------------|
| `@rewriter/settings` (core) | `@rewriter/db`, `@rewriter/table-core`, `hono`, `hono-openapi`, `zod`, `zod-openapi` | `typescript` | `bun test` |
| `@rewriter/settings-ui` (ui) | `@rewriter/rest-client`, `@rewriter/table-ui`, `@rewriter/ui`, React | `@rewriter/modal` (type-only), `@testing-library/react` | `bun test` |

`SettingsPage` is modal-agnostic (uses `onEdit` callback). `EditSettingModal`
imports `ModalBaseProps` as a type-only reference from `@rewriter/modal`.
No new third-party deps beyond what the monorepo already uses.

---

## 6. Notes

- The `Setting` Prisma model already exists (`key` unique, `value` JSON, timestamps).
- Four seed settings are populated by `prisma/seed/stage2-config.ts`.
- The sidebar already links to `/settings` under "System".
- The route file `apps/dashboard/src/routes/settings.tsx` already exists as a stub.
- This plan adds one new API endpoint (`PATCH /api/v1/settings/:key`) in addition to reusing the existing `GET /api/v1/table` infrastructure.
- The edit modal depends on `@rewriter/modal` (from the [modal-registry plan](../modal-registry/report.md)). The modal registry must be implemented first, or at minimum the `<ModalProvider>` must be mounted in `main.tsx` before `SettingsPage` can call `useModal()`.
- Test runner is `bun test` everywhere, matching the rest of the monorepo.
- The `core`/`ui` split mirrors the existing `table-core`/`table-ui` pattern — backend and frontend never share a package.
- The `SettingsService` is intentionally lean (single `update` method). Future CRUD (create, delete) can be added to the same class without changing the route contract.
