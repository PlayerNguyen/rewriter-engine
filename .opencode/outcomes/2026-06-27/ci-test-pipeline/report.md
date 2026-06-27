# CI Test Pipeline — Assessment & Proposal

**Date**: 2026-06-27

## Current State

### What exists today

| Layer | Status |
|---|---|
| **Test files** | Exactly 1: `apps/server/src/__e2e__/health.e2e.test.ts` (Bun native test) |
| **Storybook stories** | 14 `*.stories.tsx` files in `packages/ui` (visual only, not automated) |
| **Unit tests** | None — zero unit tests across all 7 workspaces |
| **Test scripts** | Only `test:e2e` in `@rewriter/server`; root delegates via `bun run --filter` |
| **CI** | `.github/workflows/biome.yml` — runs Biome lint only, no tests, no typecheck, no build |

### What CI does today

```
push/PR to main → checkout → bun install → biome ci .
```

That's it. Entire workflow completes in ~30s and gates nothing except formatting/lint.

### What CI does NOT do

- **Typecheck** — no `tsc --noEmit` step (the AGENTS.md policy mandates zero type errors before commit, but it's not enforced in CI)
- **Unit tests** — none exist, none run
- **E2E tests** — the 1 e2e test exists but never runs in CI
- **Build validation** — `apps/dashboard` and `packages/ui` are never build-tested in CI
- **Coverage** — no measurement
- **DB migrations** — `db:migrate:deploy` not validated in CI

### Test Coverage Heatmap (current)

| Workspace | Has Tests | Has Test Script | Framework |
|---|---|---|---|
| `@rewriter/server` | 1 e2e | `test:e2e` | `bun:test` |
| `@rewriter/dashboard` | None | None | — |
| `@rewriter/db` | None | None | — |
| `@rewriter/ui` | 14 stories (visual) | None | Storybook |
| `@rewriter/table-core` | None | None | — |
| `@rewriter/logger` | None | None | — |
| Root | — | — | — |

---

## Proposal: Optimized CI Test Pipeline

### Design Goals

1. **Fail fast** — typecheck first, then unit tests, then integration/e2e
2. **Maximize parallelism** — independent jobs run concurrently
3. **Cache aggressively** — Bun store, node_modules pull-through
4. **Low overhead** — Bun-native test runner, no extra frameworks unless needed
5. **Incremental** — structure allows adding unit tests over time without pipeline changes

### Architecture

The pipeline is split into 5 logical stages, some sequential (fail-fast), some parallel:

```
Trigger (push/PR to main)
  │
  ├─► Stage 1: typecheck (all workspaces, ~3s fast-fail)
  │
  ├─► Stage 2: unit tests (ALL-IN-ONE, ~5s)
  │     └─► bun test 'src/**/*.test.ts' 'src/**/*.spec.ts'
  │         Runs whatever unit tests exist across all workspaces
  │
  ├─► Stage 3: e2e tests (needs PostgreSQL, ~10s)
  │     └─► docker compose up postgres (service container)
  │         bun run test:e2e
  │
  ├─► Stage 4: build smoke test (parallel to e2e, ~15s)
  │     └─► bun run build (dashboard)
  │         bun run build-storybook (UI package)
  │
  └─► Stage 5: lint (Biome CI, retained from existing workflow)
```

### Per-Job Configuration

#### Stage 1: Typecheck (Fast-fail gate)

```yaml
typecheck:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: oven-sh/setup-bun@v2
      with:
        bun-version: latest
    - uses: actions/cache@v4
      with:
        path: ~/.bun/install/cache
        key: bun-${{ runner.os }}-${{ hashFiles('bun.lock') }}
    - run: bun install --frozen-lockfile
    - run: bun run typecheck
```

**Why first?** Type errors are the most common PR failures. Catching them in ~3s saves queue time for everything else.

#### Stage 2: Unit Tests (All workspaces)

```yaml
unit-tests:
  needs: typecheck
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: oven-sh/setup-bun@v2
    - uses: actions/cache@v4
      with:
        path: ~/.bun/install/cache
        key: bun-${{ runner.os }}-${{ hashFiles('bun.lock') }}
    - run: bun install --frozen-lockfile
    - run: bun test --coverage 'src/**/*.test.ts' 'src/**/*.spec.ts'
```

**Strategy**: Bun's native test runner discovers and runs all `*.test.ts`/`*.spec.ts` files in a single process. Since there are 0 unit tests today, this runs in <1s. As tests grow, no pipeline changes needed. Bun's test runner is multi-threaded internally.

**Why single job, not matrix?** With 7 workspaces but 0 unit tests today, a matrix strategy creates 7 jobs that each do nothing. As the codebase matures, split into a matrix if individual packages grow large test suites (>30s each). The overhead of 7 checkout+install cycles outweighs the parallelism benefit for small suites.

#### Stage 3: E2E Tests

```yaml
e2e-tests:
  needs: typecheck  # NOT needs: unit-tests — runs parallel to unit tests
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:16-alpine
      env:
        POSTGRES_USER: rewriter
        POSTGRES_PASSWORD: rewriter_secret
        POSTGRES_DB: rewriter
      ports:
        - 5432:5432
      options: >-
        --health-cmd "pg_isready -U rewriter -d rewriter"
        --health-interval 10s
        --health-timeout 5s
        --health-retries 5
  steps:
    - uses: actions/checkout@v4
    - uses: oven-sh/setup-bun@v2
    - uses: actions/cache@v4
      with:
        path: ~/.bun/install/cache
        key: bun-${{ runner.os }}-${{ hashFiles('bun.lock') }}
    - run: bun install --frozen-lockfile
    - run: bun run db:generate
    - run: bun run db:migrate:deploy
      env:
        DATABASE_URL: postgresql://rewriter:rewriter_secret@localhost:5432/rewriter
    - run: bun run test:e2e
      env:
        DATABASE_URL: postgresql://rewriter:rewriter_secret@localhost:5432/rewriter
        NODE_ENV: test
```

**PostgreSQL via service container**: GitHub Actions provides native service containers that start before the job and stop after. No need for `docker compose up` in CI.

**Why `db:migrate:deploy`?** Validates that schema migrations apply cleanly against a fresh PostgreSQL. Catches broken migrations before they hit staging/production.

**Why parallel to unit tests?** The single e2e test (health check) doesn't need the unit test results. Both run after typecheck passes.

#### Stage 4: Build Smoke Test

```yaml
build:
  needs: typecheck
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: oven-sh/setup-bun@v2
    - uses: actions/cache@v4
      with:
        path: ~/.bun/install/cache
        key: bun-${{ runner.os }}-${{ hashFiles('bun.lock') }}
    - run: bun install --frozen-lockfile
    - run: bun run --filter @rewriter/dashboard build
    - run: bun run --filter @rewriter/ui build-storybook
```

**Why build smoke?** Vite + tsc builds catch import errors, missing exports, and type-only issues that `tsc --noEmit` can miss (e.g., runtime module resolution failures). Storybook build validates all stories compile.

**Why parallel to e2e?** No dependency between building frontend and testing backend.

#### Stage 5: Lint (Biome CI)

Retained from existing workflow, unchanged. Runs independently, not gated on any other stage (format errors are orthogonal to test failures).

### Optimization Details

| Optimization | How | Expected saving |
|---|---|---|
| **Cache Bun store** | `actions/cache@v4` on `~/.bun/install/cache` keyed to `bun.lock` | ~15s per job (install → restore) |
| **Service container (not docker compose)** | GitHub-native Postgres service | ~5s faster startup, zero teardown cost |
| **Bun native test runner** | No Vitest/Jest install overhead | ~2s install, ~1s startup per run |
| **`--frozen-lockfile`** | Fails fast if lockfile out of sync | Prevents silent drift |
| **Fast-fail typecheck** | Runs first, gates all other jobs | Saves ~20s per failing PR |
| **Sequential dependency: typecheck → others** | `needs: typecheck` on unit/e2e/build | Avoids wasting runners on type-broken code |
| **Parallel independence: unit ‖ e2e ‖ build** | No cross-job dependencies | All run concurrently after typecheck |

### Estimated Times

| Stage | Cold Cache | Warm Cache |
|---|---|---|
| Typecheck | ~25s | ~8s |
| Unit tests | ~20s | ~4s (0 tests today) |
| E2E tests (+PG startup) | ~40s | ~20s |
| Build smoke | ~30s | ~12s |
| Lint (Biome CI) | ~12s | ~3s |
| **Wall clock total** | **~55s** | **~28s** |

Wall clock = typecheck + max(unit, e2e, build) + lint (since unit/e2e/build are parallel after typecheck).

### Migration Steps

1. **Add test scripts** to each package's `package.json`:
   ```json
   "test": "bun test src/"
   ```
   Root-level convenience:
   ```json
   "test": "bun run --filter '*' test",
   "test:coverage": "bun test --coverage 'src/**/*.test.ts' 'src/**/*.spec.ts'"
   ```

2. **Create the workflow file** at `.github/workflows/ci.yml` (or rename `biome.yml` → `ci.yml` and expand it).

3. **Add `db:generate` and `db:migrate:deploy`** steps in e2e job to validate migration integrity.

4. **Verify** by pushing a branch and observing all jobs pass in GitHub Actions.

### What This Does NOT Do (Yet)

- **No Vitest/Jest** — Bun's native test runner is sufficient and avoids dependency bloat. If component tests for React (`@testing-library/react`) become needed, add Vitest to `@rewriter/dashboard` and `@rewriter/ui` as devDependencies.
- **No coverage enforcement** — `--coverage` flag is present but no threshold is set. Add coverage gates (e.g., `--coverage --coverage-threshold-lines 80`) once the codebase has meaningful test coverage.
- **No mutation testing** — not in scope for CI yet.
- **No Storybook interaction tests** — 14 stories exist but none use `@storybook/test` or `@storybook/addon-interactions`. Add automated interaction tests later.

### Risks & Mitigations

| Risk | Mitigation |
|---|---|
| E2E tests depend on DB state | Run `db:migrate:deploy` fresh each run; seed data if needed via `bun run db:seed` |
| Build step is slow without cache | Cache `node_modules/.vite` for dashboard build |
| No unit tests exist → pipeline appears "green" with no value | Acceptable for greenfield; add tests incrementally. Pipeline structure won't need changes. |
| Typecheck slow as codebase grows | Consider project references or incremental builds (TS `--incremental`) |

### Decision Record

| Decision | Rationale |
|---|---|
| **Single unit-test job, not matrix** | 7 workspaces, 0 unit tests. Matrix overhead > benefit. Revisit at >30s per package. |
| **Bun native test runner, not Vitest/Jest** | Already used for e2e. No extra deps. Fast startup. Multi-threaded. |
| **PostgreSQL as service container** | Native GH Actions feature. No docker compose complexity. Automatic cleanup. |
| **No test splitting (yet)** | Bun's test runner handles parallelism internally. Revisit if test suite exceeds 60s. |
| **Separate workflow file (ci.yml)** | Cleaner than expanding biome.yml. Each workflow has a single responsibility. |
