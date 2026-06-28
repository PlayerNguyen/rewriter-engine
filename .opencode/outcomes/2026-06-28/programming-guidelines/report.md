# Programming Guidelines & OpenCode Skills

**Date:** 2026-06-28
**PR:** [#19](https://github.com/PlayerNguyen/rewriter-engine/pull/19)

## Summary

Added project-wide programming guidelines documentation and two OpenCode workflow skills to standardize development practices.

## What Was Done

- Created `docs/programming-guidelines.md` covering TypeScript, Conventional Commits, unit testing, React component structure, and TSDoc conventions
- Added `.opencode/skills/pr-create/SKILL.md` — automated PR creation with template enforcement and typecheck guards
- Added `.opencode/skills/start-implement/SKILL.md` — task implementation kickoff from plans or context
- Updated `AGENTS.md` and `README.md` with references to the new guidelines
- Updated `opencode.json` to register guidelines as instructions and enable new skills

## Verification

- `bun run typecheck` — zero errors across all 7 workspaces
