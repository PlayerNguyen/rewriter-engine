---
name: start-implement
description: Start implementing a task by loading the relevant plan or gathering context. Uses .opencode/plans/ when available, otherwise follows the provided instructions. USE FOR: start implementing, implement task, begin task, start task, implement feature, start feature, begin work.
---

## What I Do

- Look for a matching plan in `.opencode/plans/`
- If a plan exists, load it and follow its implementation order
- If no plan, use whatever context or instructions the user provided
- If nothing is provided (no plan, no context, no order), stop and ask the user what to start with
- Never hallucinate or assume missing details

## When to Use Me

Use this when the user asks to:
- Start implementing a task
- Begin work on a feature
- Implement something
- Start a task

## Workflow

### Step 1 — Check for a Plan

Look for plan files in `.opencode/plans/`:

```bash
ls .opencode/plans/
```

Plans may be named by feature, date, or task slug (e.g., `article-targeting.md`, `2026-06-28-kafka-retry.md`).

If plans exist, list them and ask the user which one to use, unless the user already specified a task name. Match the plan to the task by scanning filenames.

### Step 2 — Load the Plan

```bash
cat .opencode/plans/<plan-file>
```

Follow the plan's implementation order exactly. Do not skip steps, reorder steps, or add steps unless the user explicitly asks.

### Step 3 — No Plan Found

If no plan exists in `.opencode/plans/`:

1. Review what context the user has provided (feature description, requirements, conversation history).
2. If the user gave a clear implementation order or set of steps, follow that.
3. If **no order or context** was provided, stop and ask:

> "What should I start with? I don't have a plan or enough context to proceed."

Do **not** guess, assume, or create your own plan. Do not start coding until you have clear direction.

### Step 4 — Execute

Once a plan or clear instruction set is loaded:

- Work step by step
- Follow `docs/programming-guidelines.md` for all code
- Write unit tests as part of each step
- Do not skip ahead or work on future steps before completing the current one

## Important Rules

1. **Read `AGENTS.md` and `docs/programming-guidelines.md` first** — before any plan or implementation, load and understand the project conventions
2. **Always check `.opencode/plans/` first** — a plan takes priority over anything else
3. **Never assume** — if no plan and no context, stop and ask
4. **Follow the plan exactly** — no reordering, skipping, or adding steps
5. **One step at a time** — finish the current step before moving on
6. **Do not hallucinate requirements** — only use what's in the plan or what the user explicitly said
7. **Ask for clarification** when the plan or instructions are ambiguous
