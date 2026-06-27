# Outcome: Orval REST Client Generation Pipeline

## Summary

Implemented a fully automated REST client generation pipeline using [Orval](https://orval.dev) and `hono-openapi`. The server's OpenAPI spec is persisted to a file, then Orval generates type-safe fetch functions and DTO types into `@rewriter/rest-client`.

## What Was Done

1. **`apps/server/scripts/generate-openapi.ts`** — Uses `hono-openapi`'s `generateSpecs()` to write the full OpenAPI spec to `apps/server/openapi.json`
2. **`apps/server/openapi.json`** — Committed artifact (2 paths: `/api/v1/table`, `/api/v1/health`)
3. **`packages/rest-client/`** — New workspace package:
   - `orval.config.ts` — Reads `openapi.json`, outputs `tags-split` to `src/generated/`
   - `src/mutator/fetch-instance.ts` — Custom fetch with env-based `baseURL`, auth injection, query param handling, error normalization
   - `src/index.ts` — Barrel re-exports generated API + mutator
4. **Root scripts** — `generate:spec`, `generate:client`, `generate` (chain)
5. **Root config** — `tsconfig.json` path alias, `.gitignore` for generated output
6. **Health route** — Added `tags: ['Health']` for proper namespace in generated output

## Key Decisions

| Decision | Why |
|---|---|
| `fetch` client | Zero deps; interceptable via custom mutator; works everywhere |
| `tags-split` mode | Tree-shakeable imports; one folder per API domain |
| Spec committed | CI and devs always have source of truth; diffable in PRs |
| Generated code gitignored | Reproducible from committed spec; avoids merge conflicts |
| Custom mutator | Single source of truth for baseURL, auth, errors |

## Verification

- `bun run typecheck` — passes all 6 workspaces
- `bun run lint` — zero issues
- `bun run test` — 7 pass, 0 fail
- `bun run generate:client` — produces `packages/rest-client/src/generated/` with `api/health/`, `api/table/`, and `model/`

## Generated Output Structure

```
packages/rest-client/src/generated/
├── api/
│   ├── health/health.ts      ← getApiV1Health(), GetApiV1HealthResult
│   └── table/table.ts        ← getApiV1Table(params), GetApiV1TableResult
└── model/
    ├── index.ts              ← barrel of all DTO types
    ├── getApiV1Health200.ts
    ├── getApiV1Table200.ts
    ├── getApiV1Table400.ts
    ├── getApiV1Table404.ts
    └── getApiV1TableParams.ts
```

## PR

https://github.com/PlayerNguyen/rewriter-engine/pull/16
