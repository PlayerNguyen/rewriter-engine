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

## Pull Request Policy

When creating a new PR, you **MUST** use the template in `.github/PULL_REQUEST_TEMPLATE.md`. Use `gh pr create` and fill out **every** section: description, type of change, workspaces affected, testing (screenshots, verification commands, automated test coverage), and checklist. Do not skip the template or leave sections blank. The template ensures every PR has a consistent structure and sufficient context for reviewers.

## CodeGraph (MCP)

This project has a CodeGraph MCP server configured with all tools enabled. CodeGraph is a tree-sitter-parsed knowledge graph of every symbol, edge, and file. Reads are sub-millisecond and return structural information grep cannot.

### When to prefer codegraph over native search

Use codegraph for **structural** questions — what calls what, what would break, where is X defined, what is X's signature. Use native grep/read only for **literal text** queries (string contents, comments, log messages) or after you already have a specific file open.

| Question | Tool |
|---|---|
| "Where is X defined?" / "Find symbol named X" | `codegraph_search` |
| "What calls function Y?" | `codegraph_callers` |
| "What does Y call?" | `codegraph_callees` |
| "How does X reach/become Y? / trace the flow from X to Y" | `codegraph_trace` (one call = the whole path, incl. callback/React/JSX dynamic hops) |
| "What would break if I changed Z?" | `codegraph_impact` |
| "Show me Y's signature / source / docstring" | `codegraph_node` |
| "Give me focused context for a task/area" | `codegraph_context` |
| "See several related symbols' source at once" | `codegraph_explore` |
| "What files exist under path/" | `codegraph_files` |
| "Is the index healthy?" | `codegraph_status` |

### Rules of thumb

- **Answer directly — don't delegate exploration.** For "how does X work" / architecture questions, answer with 2-3 codegraph calls: `codegraph_context` first, then ONE `codegraph_explore` for the source of the symbols it surfaces. For a specific **flow** ("how does X reach Y") start with `codegraph_trace` from→to — one call returns the whole path with dynamic hops bridged — then ONE `codegraph_explore` for the bodies; don't rebuild the path with `codegraph_search` + `codegraph_callers`. Codegraph IS the pre-built index, so spawning a separate file-reading sub-task/agent — or running a grep + read loop — repeats work codegraph already did and costs more for the same answer.
- **Trust codegraph results.** They come from a full AST parse. Do NOT re-verify them with grep — that's slower, less accurate, and wastes context.
- **Don't grep first** when looking up a symbol by name. `codegraph_search` is faster and returns kind + location + signature in one call.
- **Don't chain `codegraph_search` + `codegraph_node`** when you just want context — `codegraph_context` is one call.
- **Don't loop `codegraph_node` over many symbols** — one `codegraph_explore` call returns several symbols' source grouped in a single capped call, while each separate node/Read call re-reads the whole context and costs far more.
- **Index lag**: the file watcher debounces ~500ms behind writes; don't re-query immediately after editing a file in the same turn.

### If `.codegraph/` doesn't exist

The MCP server returns "not initialized." Ask the user: *"I notice this project doesn't have CodeGraph initialized. Want me to run `codegraph init -i` to build the index?"*

## References

- `.opencode/TARGET.md` — Full system design (Vietnamese). Read this before making architectural decisions.
- `DESIGN.md` — Frontend UI theming/styling exploration notes.
