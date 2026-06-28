---
name: pr-create
description: Create a pull request following the project's conventions. Stages files, writes a Conventional Commits subject, drafts a body from the PR template, and opens the PR via gh pr create. USE FOR: create PR, open pull request, make a PR, submit PR, new pull request.
---

## What I Do

- Inspect the current branch, diff, and recent commits
- Craft a Conventional Commits subject (`feat:`, `fix:`, `chore:`, etc.)
- Fill out every section of `.github/PULL_REQUEST_TEMPLATE.md`
- Run `gh pr create` with the filled template and link the PR URL

## When to Use Me

Use this when the user asks to:
- Create a pull request
- Open a PR
- Submit a PR
- Make a new PR for the current branch

## Workflow

### Step 1 — Inspect the Branch

```bash
git status
git diff --stat
git log --oneline -10
git branch --show-current
gh pr list --head "$(git branch --show-current)" --json number,url --jq '.[0]'
```

If a PR already exists for this branch, tell the user and stop.

### Step 2 — Verify the Base Branch

```bash
git remote show origin | grep "HEAD branch" | awk '{print $NF}'
```

The base branch is usually `main`. Use the remote HEAD as the default unless the user specifies otherwise.

### Step 3 — Pick a Commit Subject

Scan the branch commits. The PR title must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

| Type       | When                                                    |
|------------|---------------------------------------------------------|
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `chore`    | Tooling, dependencies, config                           |
| `docs`     | Documentation only                                      |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or updating tests                                |
| `style`    | Formatting, whitespace (no logic change)                |
| `perf`     | Performance improvement                                 |
| `ci`       | CI/CD changes                                           |

Format: `<type>: <imperative, lowercase, no trailing period>`

Examples:
- `feat: add article targeting by category`
- `fix: resolve Kafka consumer lag on reconnect`

Show the user the proposed title and ask for confirmation.

### Step 4 — Draft the PR Body

Use the template at `.github/PULL_REQUEST_TEMPLATE.md`. Read it and fill out **every** section. Do not skip the template or leave sections blank.

### Step 5 — Run Pre-flight Checks

```bash
bun run typecheck
```

If type errors are present, stop and tell the user to fix them. Do not create the PR.

### Step 6 — Create the PR

```bash
gh pr create --title "<TITLE>" --body-file /tmp/pr_body.md --base <BASE>
```

- Write the body to a temp file to avoid shell escaping issues
- Use `echo "<BODY>" > /tmp/pr_body.md` then pass `--body-file /tmp/pr_body.md`
- Report the PR URL when created

### Step 7 — Add to Opencode Outcomes

If the PR represents a significant task, suggest archiving a report to:

```
.opencode/outcomes/<YYYY-MM-DD>/<task-slug>/report.md
```

## Important Rules

1. **Never skip the PR template** — fill every section, even if the answer is "N/A"
2. **Never create a PR with type errors** — run `bun run typecheck` first and block if there are errors
3. **Never create a PR with uncommitted work** — confirm `git status` is clean or explicitly ask the user what to stage
4. **Always show the title to the user** for confirmation before creating
5. **Branch prefix must match commit type** — a `feat:` PR comes from a `feat/` branch; reject mismatches
6. **No empty PR body** — if you cannot determine the description, ask the user
