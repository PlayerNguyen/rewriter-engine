---
name: pr-review
description: Review the current pull request and post inline comments to GitHub. Analyzes diffs for code quality, type safety, conventions, potential bugs, and missing documentation. USE FOR: code review, PR review, review pull request, review this PR.
---

## What I Do

- Fetch the current PR diff using GitHub CLI (`gh pr diff`)
- Analyze changes for code quality, type safety, project conventions, bugs, and TSDoc coverage
- Post review comments directly to the pull request via `gh pr review` or `gh pr comment`

## When to Use Me

Use this when the user asks to:
- Review a PR
- Review the current pull request
- Submit a code review
- Audit changes in a PR

## Workflow

### Step 1 — Identify the PR

If the user provides a PR number, use it. Otherwise:

```bash
# From the current branch, find the open PR
gh pr list --head "$(git branch --show-current)" --json number --jq '.[0].number'
```

If no PR is found, ask the user for the PR number.

### Step 2 — Fetch the Diff

```bash
gh pr diff <PR_NUMBER>
```

Also fetch the PR description for context:

```bash
gh pr view <PR_NUMBER> --json title,body,files
```

### Step 3 — Analyze the Diff

Review the changes against these criteria, ordered by priority:

#### 3a. Bugs & Logic Errors

- Null/undefined access without guards
- Incorrect error handling (swallowed errors, wrong error types)
- Race conditions (missing `await`, incorrect Promise usage)
- Type assertions (`as`) that could hide mismatches
- Incorrect Prisma query patterns (missing `where`, wrong relation fields)

#### 3b. Type Safety

- Check `tsc --noEmit` or `bun run typecheck` output (run it if not already done)
- `any` or `unknown` types that should be narrowed
- Missing generics where they would add safety
- Incorrect `import type` usage (missing `type` keyword per `verbatimModuleSyntax`)

#### 3c. Project Conventions

- Package naming: `@rewriter/<name>` format
- Imports use `@rewriter/*` workspace aliases not relative paths for cross-package imports
- File structure matches existing patterns (e.g., `src/models.ts`, `src/handler.ts`)
- Package.json fields: `"name"`, `"private": true`, `"type": "module"`, `"main": "./src/index.ts"`
- Biome formatting compliance (`bun run lint`)
- Root tsconfig.json path aliases for every new package

#### 3d. TSDoc Coverage

Per the project's TypeScript documentation standard:
- Every exported class, interface, function, and method should have a JSDoc comment
- `@param`, `@returns`, `@throws`, `@typeParam`, `@example` tags used appropriately
- `{@link}` references between related symbols

#### 3e. Architecture & Design

- New packages follow the monorepo workspace pattern (package.json, tsconfig.json, src/ structure)
- Registry/service patterns are consistent (singleton, factory)
- No circular dependencies between packages
- `workspace:*` used for internal dependencies

### Step 4 — Post Review Comments

Use `gh pr review` to submit a formal review:

```bash
gh pr review <PR_NUMBER> --comment --body "<REVIEW_BODY>"
```

**Review body format:**

```markdown
## Code Review

### Summary
<1-2 sentences on overall quality and what changed>

### Issues Found

#### 🔴 Critical (must fix)
- **file.ts:42** — <issue description>
  <suggestion>

#### 🟡 Warning (should fix)
- **file.ts:15** — <issue description>
  <suggestion>

#### 🟢 Suggestions (nice to have)
- **file.ts:8** — <issue description>

### ✅ What's Good
- <positive observation>
- <positive observation>

### Verification
```
$ bun run lint
<output>
$ bun run typecheck
<output>
```
```

For individual inline comments on specific lines, use:

```bash
gh api repos/:owner/:repo/pulls/<PR_NUMBER>/comments -f body="<comment>" -f commit_id="<SHA>" -f path="<file>" -f line=<line>
```

Only post inline comments for critical or warning-level issues. Use the commit SHA from the latest commit on the PR branch (get it via `gh pr view <PR_NUMBER> --json commits --jq '.commits[-1].oid'`).

### Step 5 — Verify

Run these commands before posting to ensure accuracy:

```bash
bun run lint
bun run typecheck
```

Reference actual lint/typecheck output in the review. Clearly separate pre-existing errors from new ones introduced by the PR.

## Important Rules

1. **Always run lint and typecheck** before posting — do not rely on old output or assumptions
2. **Reference exact file paths and line numbers** in every issue
3. **Pre-existing issues must be clearly labeled** as pre-existing, not caused by this PR
4. **Never approve a PR with critical issues** — use `--comment` or `--request-changes`
5. **Be specific in suggestions** — provide exact code changes, not vague guidance
6. **Do not comment on code that wasn't changed** in the PR diff
7. **Respect the project's AGENTS.md conventions** — especially commit format, branch naming, and monorepo structure
