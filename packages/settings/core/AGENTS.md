# @rewriter/settings — Settings Backend

Backend handler, service, and API route for system settings (key-value JSON config).

## Architecture

```
packages/settings/core/
├── src/
│   ├── index.ts                 — Barrel
│   ├── SettingsTableHandler.ts  — Read handler (extends TableHandler)
│   ├── SettingsService.ts       — Update logic (db write)
│   ├── settingsRoute.ts         — Hono sub-app (PATCH /settings/:key)
│   ├── SettingsTableHandler.test.ts
│   └── SettingsService.test.ts
├── package.json
└── tsconfig.json
```

## Exports

| Export | Kind | Description |
|--------|------|-------------|
| `SettingsTableHandler` | class | Read handler for the settings table |
| `SettingsService` | class | Write operations (update by key) |
| `settingsRoute` | Hono app | PATCH `/settings/:key` endpoint |

## Endpoints

### `PATCH /api/v1/settings/:key`

Update a setting value by key.

Body: `{ "value": "any JSON value" }`

Response: Updated `Setting` record (id, key, value, updatedAt).

Throws 404 if the key doesn't exist.

## Commands

```bash
bun run --filter @rewriter/settings typecheck
bun run --filter @rewriter/settings test
```
