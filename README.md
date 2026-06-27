<!-- For AI Agent, please read AGENTS.md -->

# rewriter-engine

Rewrite orchestration — a content-rewriting pipeline with an admin dashboard, background crawler, Kafka queue, and LLM-powered rewriter.

## Architecture

1. **Settings Dashboard** — Admin frontend for managing sources, system prompts, and viewing rewritten articles.
2. **Explorer Engine** — Background crawler that fetches articles from configured sources, cleans them, and publishes to Kafka.
3. **Kafka** — Message broker decoupling crawling from rewriting.
4. **Rewriter Engine** — Consumes from Kafka, sends raw articles + system prompts to an LLM API, stores rewritten results in DB.
5. **DB** — Stores config, sources, prompts, and rewritten articles.

Data flow: Admin configures sources + prompts → Explorer crawls & cleans → Kafka queues → Rewriter calls LLM → results saved to DB → displayed via Dashboard.

- LLM provider is not fixed; the system supports multiple providers (GPT, Claude, Gemini, etc.).
- System prompts are user-configurable via the admin dashboard, not hardcoded.

## Monorepo Structure

```
packages/ui/       — Shared React component library (@rewriter/ui)
apps/dashboard/    — Admin dashboard app (@rewriter/dashboard, Vite + React)
```

- `packages/*` — shared libraries consumed by apps
- `apps/*` — deployable applications

## Commands

```bash
bun install              # Install all dependencies
bun dev:dashboard        # Run dashboard dev server
bun storybook            # Run Storybook (port 6006)
bun build-storybook      # Build Storybook static site
bun typecheck            # Typecheck all packages
bun build                # Build all packages
bun run --filter @rewriter/ui typecheck
bun run --filter @rewriter/dashboard typecheck
```
