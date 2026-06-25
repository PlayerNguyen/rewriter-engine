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

## References

- `.opencode/TARGET.md` — Full system design (Vietnamese). Read this before making architectural decisions.
- `DESIGN.md` — Frontend UI theming/styling exploration notes.
