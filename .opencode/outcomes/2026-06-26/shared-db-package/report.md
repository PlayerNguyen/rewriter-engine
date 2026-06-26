# Shared DB Package with Prisma

## Date: 2026-06-26

## Summary

Set up `@rewriter/db` as a shared database package with Prisma ORM for PostgreSQL. Schema is defined at project root (`prisma/`), while the PrismaClient singleton lives in `packages/db/` and is imported by all apps via `@rewriter/db`.

## Files Created

| File | Description |
|------|-------------|
| `prisma/schema.prisma` | Database schema with 6 models (User, Source, Article, SystemPrompt, RewrittenArticle, Setting) |
| `prisma/seed.ts` | Seed script — default admin user, system prompt, settings, sample source |
| `prisma.config.ts` | Prisma config (schema path, migrations path, datasource URL from env) |
| `packages/db/package.json` | Package config — `@rewriter/db`, exports JIT from `./src/index.ts` |
| `packages/db/src/client.ts` | Singleton PrismaClient with PgAdapter, connection pooling via `pg` |
| `packages/db/src/index.ts` | Re-exports: `db` instance + all generated types |
| `packages/db/tsconfig.json` | TypeScript config for the package |
| `packages/db/AGENTS.md` | Package documentation (usage patterns, architecture, commands) |
| `prisma/AGENTS.md` | Schema documentation (models, relations, conventions) |

## Files Modified

| File | Change |
|------|--------|
| `package.json` (root) | Added db scripts (`db:generate`, `db:push`, `db:migrate`, `db:seed`, `db:studio`) |
| `tsconfig.json` (root) | Added `@rewriter/db` path alias |
| `biome.json` | Added `!**/generated` to exclude Prisma-generated files from linting |
| `.env.example` | Added `DATABASE_URL` for Prisma |
| `bun.lock` | Updated (prisma, @prisma/client, @prisma/adapter-pg, pg, dotenv) |

## Data Model

```
Source ──1:N──> Article ──1:1──> RewrittenArticle ──N:1──> SystemPrompt
                   │
User (admin)       │  status: PENDING → PROCESSING → COMPLETED/FAILED
Setting (key-value config)
```

## Key Decisions

- **Prisma 7.8**: Uses `prisma.config.ts` for datasource URL (required since Prisma 7). `url` is no longer allowed in `schema.prisma`.
- **`dotenv` in prisma.config.ts**: Required because `env('DATABASE_URL')` resolves at config load time, before `.env` is auto-loaded.
- **Generated types committed to git**: Matches popper24h pattern — avoids requiring `db:generate` on every pull.
- **JIT packaging**: `exports: { ".": "./src/index.ts" }` — no build step needed, bundler resolves directly.
- **Singleton pattern with PgAdapter**: Uses `@prisma/adapter-pg` + `Pool` for connection pooling, `globalThis` caching prevents duplicate pools during hot-reload.

## Verification

- ✅ `bun run typecheck` — passes (all packages)
- ✅ `bun run lint` — no new errors (pre-existing warnings in `packages/ui/` only)
- ✅ `bun run db:generate` — Prisma Client generated successfully
