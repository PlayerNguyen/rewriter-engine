# AGENTS.md

## Project Status

Greenfield — no source code exists yet. The only artifact is `.opencode/TARGET.md`, a Vietnamese-language system design document describing the intended architecture.

## Intended Architecture

A content-rewriting pipeline with these components:

1. **Settings Dashboard** — Admin frontend for managing sources, system prompts, and viewing rewritten articles. Frontend styling and theming decisions are tracked in `DESIGN.md`.
2. **Explorer Engine** — Background crawler that fetches articles from configured sources, cleans them, and publishes to Kafka.
3. **Kafka** — Message broker decoupling crawling from rewriting.
4. **Rewriter Engine** — Consumes from Kafka, sends raw articles + system prompts to an LLM API, stores rewritten results in DB.
5. **DB** — Stores config, sources, prompts, and rewritten articles.

Data flow: Admin configures sources + prompts → Explorer crawls & cleans → Kafka queues → Rewriter calls LLM → results saved to DB → displayed via Dashboard.

## Key Design Intent

- LLM provider is not fixed; the system should support multiple providers (GPT, Claude, Gemini, etc.).
- System prompts are user-configurable via the admin dashboard, not hardcoded.
- Kafka provides async buffering so the rewriter can process at its own pace.

## Monorepo Structure

```
packages/ui/       — Shared React component library (@rewriter/ui)
apps/dashboard/    — Admin dashboard app (@rewriter/dashboard, Vite + React)
```

- `packages/*` — shared libraries consumed by apps
- `apps/*` — deployable applications

## Dev Commands

```bash
bun install                                  # Install all workspace dependencies
bun run --filter @rewriter/ui storybook      # Run Storybook for UI components (port 6006)
bun run --filter @rewriter/dashboard dev     # Run dashboard dev server
bun run --filter @rewriter/dashboard build   # Build dashboard for production
bun run --filter @rewriter/ui build-storybook  # Build Storybook static site
```

## TypeScript Policy

Always run `tsc --noEmit` and fix all compile errors before committing. Never leave type errors in the tree.

```bash
bun run --filter @rewriter/ui typecheck
bun run --filter @rewriter/dashboard typecheck
```

## Commit & Branch Conventions

- All commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.
- Branches use prefix pattern: `feat/`, `fix/`, `chore/`, `docs/`.

## Documentation Archive Policy

When completing any significant task (feature, refactor, investigation, etc.), archive a summary report to the `.opencode/outcomes/` folder using this structure:

```
.opencode/outcomes/<YYYY-MM-DD>/<task-slug>/report.md
```

- **Date**: Use the current date in `YYYY-MM-DD` format
- **Task slug**: Short kebab-case description (e.g., `basic-ui-components`, `kafka-integration`, `auth-flow`)
- **Report**: Markdown file summarizing what was done, decisions made, and verification results

Example:
```
.opencode/outcomes/2026-06-25/basic-ui-components/report.md
.opencode/outcomes/2026-06-26/api-endpoints/report.md
```

This creates a searchable, dated archive of all work completed in the project.

## References

- `.opencode/TARGET.md` — Full system design (Vietnamese). Read this before making architectural decisions.
- `DESIGN.md` — Frontend UI theming/styling exploration notes.
