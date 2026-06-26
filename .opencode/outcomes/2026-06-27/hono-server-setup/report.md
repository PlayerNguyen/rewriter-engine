# Hono Server Setup

**Date:** 2026-06-27
**Task:** `hono-server-setup`

## Summary

Created `apps/server` (Hono + Bun API) and `packages/logger` (shared pino logger).

## Decisions

- **Port 3001** — avoids conflict with Vite dashboard (5173)
- **Zod** — validation library, pairs with `hono-openapi` via `zod-openapi`
- **Placeholder routes** — `/health` only for now; CRUD routes removed after user request
- **Scalar** — API reference UI at `/api/v1/scalar` using `@scalar/hono-api-reference`
- **OpenAPI** — auto-generated spec at `/api/v1/doc` via `hono-openapi` `openAPISpecs()`
- **Logger** — isolated `packages/logger` with pino + pino-pretty; server integrates via `@hono/structured-logger` + `hono/request-id`
- **CORS** — enabled for `http://localhost:5173` (dashboard origin)

## Files Created

```
apps/server/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── app.ts
    ├── lib/openapi.ts
    ├── types/env.ts
    └── routes/
        ├── index.ts
        └── health.ts

packages/logger/
├── package.json
├── tsconfig.json
├── AGENTS.md
└── src/
    └── index.ts
```

## Files Modified

- `package.json` (root) — added `dev:server` script
- `tsconfig.json` (root) — added `@rewriter/logger` and `@rewriter/db/*` path aliases

## Gotchas

- `@hono/cors` does not exist — cors is part of `hono` (`hono/cors`)
- `@hono/request-id` does not exist — request-id is part of `hono` (`hono/request-id`)
- `@scalar/hono-api-reference` exports `apiReference` not `Scalar` (name changed in newer version)
- `hono-openapi` exports `openAPISpecs` not `openAPIRouteHandler` (v0.4.x API)
- `hono-openapi` has peer deps: `@hono/zod-validator`, `zod-openapi`, `openapi-types`
- `describeRoute` from `hono-openapi` does not propagate Hono generic types to handler `c` — handlers must use explicit `Context<AppEnv>` typing

## Verification

- `bun run --filter @rewriter/logger typecheck` — passes
- `bun run --filter @rewriter/server typecheck` — passes
- Server starts on `http://localhost:3001` with pino-pretty formatted output
- `GET /api/v1/health` returns `{ status: "ok", timestamp: "..." }`
- `GET /api/v1/doc` returns OpenAPI JSON
- `GET /api/v1/scalar` renders Scalar API reference UI
