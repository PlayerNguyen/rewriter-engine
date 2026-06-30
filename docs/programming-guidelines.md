# Programming Guidelines

## TypeScript

> **PRIORITY: CRITICAL** — Violating these rules will block every PR.

- **NEVER use `any`** — in type annotations, assertions, generics, or casts. No exceptions.
  - Use `unknown` when the type is truly unknown, then narrow with guards.
  - Use `Record<string, unknown>` instead of `Record<string, any>`.
  - Use specific types or generics instead of `any` in function signatures and generics (e.g. `ModalFactory<TCustom extends Record<string, unknown>>` not `ModalFactory<any>`).
  - If you are unsure which type to use, **stop and ask the user**. Provide options and let them choose or define a custom type.
- All TypeScript code must have unit tests.
- Run `tsc --noEmit` before committing — no type errors allowed in the tree.

## Version Control

> **PRIORITY: HIGH** — These conventions are mandatory. Violating them will block PRs from being accepted.

### Commits & Branches

- All commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.
- Branches use prefix pattern: `feat/`, `fix/`, `chore/`, `docs/`.

### Pull Requests

- You **MUST** use the template in `.github/PULL_REQUEST_TEMPLATE.md`.
- Use `gh pr create` and fill out **every** section: description, type of change, workspaces affected, testing (screenshots, verification commands, automated test coverage), and checklist.
- Do not skip the template or leave sections blank.

## Deployment

> **PRIORITY: HIGH** — Follow these conventions for consistent deployments.

### Directory Structure

```
docker-compose.yml                          # Local infrastructure only (DB, Adminer)
tools/deployment/
├── compose.yaml                            # Base config for staging/production
├── staging.compose.yaml                    # Staging overrides
├── production.compose.yaml                 # Production overrides
└── .env.example                            # Environment template
```

### Environment Rules

| Environment | Config | What Runs |
|-------------|--------|-----------|
| **Local dev** | Root `docker-compose.yml` | DB + Adminer only. Apps run via `bun dev` |
| **Staging** | `compose.yaml` + `staging.compose.yaml` | All services in containers |
| **Production** | `compose.yaml` + `production.compose.yaml` | All services in containers |

1. **Never commit `.env` files** — Only `.env.example` files are committed.
2. **Merge approach** — Base `compose.yaml` defines common config; environment files override/add settings.

### Deployment Commands

```bash
# Local: Start database only
cp .env.example .env
docker compose up -d
bun dev

# Staging
cd tools/deployment
cp .env.example .env  # Edit with real secrets
docker compose -f compose.yaml -f staging.compose.yaml up -d --build
docker compose exec server bunx prisma migrate deploy

# Production
cd tools/deployment
cp .env.example .env  # Edit with real secrets
docker compose -f compose.yaml -f production.compose.yaml up -d --build
docker compose exec server bunx prisma migrate deploy
```

> **Note:** `prisma migrate deploy` requires the `server` container to be running first. The Prisma CLI is available because it's installed as a root workspace dependency.

## Unit Testing

When setting up a new package or module, include a test runner from the start.

| Context  | Test Runner |
|----------|-------------|
| Frontend | [Vitest](https://vitest.dev/) |
| Backend  | [Bun Test](https://bun.sh/docs/cli/test) |

## React Components

React components must follow this directory structure:

```
ComponentName/
├── index.tsx          # Public exports (barrel file)
├── ComponentName.tsx  # Main component implementation (optional, may live in index.tsx if small)
└── components/        # Sub-components that break the main component into smaller parts
    ├── SubPartA.tsx
    └── SubPartB.tsx
```

- **`index.tsx`** — re-exports the public API of the component folder. Consumers never import internal files directly.
- **`components/`** — contains smaller, private sub-components that decompose the main component into manageable pieces.

### Component Reuse & Layering

Before creating a new React component:

1. **Check `@packages/ui/components` first** — basic components such as `Button`, `Table`, `Input`, `Dialog`, etc. may already exist there.
2. **Bottom-to-top** — if a generic primitive is missing, create it in `packages/ui/components/` first, then build the higher-level component on top of it.
3. Never duplicate a component that already exists in the shared UI package.

```
packages/ui/components/      ← Generic, reusable primitives (Button, Table, Modal, …)
packages/<app>/components/   ← App-specific, higher-level compositions built from primitives
```

### TSDoc

Every generated component must include at least:

1. A brief **TSDoc comment** describing what the component does.
2. A **usage example** showing the minimal props needed to render it.

```tsx
/**
 * Displays a user's avatar with their online status indicator.
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.png" name="Alice" online />
 * ```
 */
export function Avatar({ src, name, online }: AvatarProps) {
  // ...
}
```

Example:

```
UserProfile/
├── index.tsx
├── UserProfile.tsx
└── components/
    ├── AvatarSection.tsx
    ├── BioSection.tsx
    └── StatsPanel.tsx
```
