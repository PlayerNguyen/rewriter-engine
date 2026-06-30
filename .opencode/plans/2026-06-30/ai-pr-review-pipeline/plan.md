# Plan: AI PR Review Pipeline

## Date: 2026-06-30

## Objective

Create a GitHub Actions workflow that automatically reviews new PRs using OpenCode CLI with the `pr-review` skill, powered by OpenCode Go models.

## Architecture

```
PR opened → GitHub Actions → anomalyco/opencode/github action
  → model: opencode-go/kimi-k2.7-code
  → prompt: "load pr-review skill, review this PR"
  → gh CLI (GITHUB_TOKEN) → posts review comments
  → exit 0
```

## Trigger Policy

| Trigger | Who can use | How |
|---------|-------------|-----|
| `pull_request: opened` | Automatic | Runs when PR is created |
| `workflow_dispatch` | Write access+ | Actions tab → "AI PR Review" → "Run workflow" → optional PR number |

## Files to Create

### `.github/workflows/ai-review.yml`

The main workflow file with:
- `on: pull_request: types: [opened]` for automatic trigger
- `on: workflow_dispatch` with optional `pr_number` input for manual re-run
- Uses `anomalyco/opencode/github@latest` action
- Model: `opencode-go/kimi-k2.7-code`
- Prompt instructs to load `pr-review` skill
- `use_github_token: true` for `gh` CLI auth
- Permissions: `pull-requests: write`, `contents: read`

## Required GitHub Secrets

| Secret | Source |
|--------|--------|
| `OPENCODE_GO_API_KEY` | opencode.ai/auth → Go API key |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions |

## Design Decisions

1. **Trigger `opened` only** — matches requirement "only a new Pull Request is created"
2. **`workflow_dispatch`** — allows code reviewers with write access to manually re-run
3. **Native GitHub Action** — handles CLI install, checkout, auth automatically
4. **`use_github_token: true`** — grants `gh` CLI write access for posting comments
5. **`persist-credentials: false`** — avoids git credential conflicts
6. **Model choice** — `kimi-k2.7-code` balances cost ($0.95/$4.00 per 1M tokens) and capability

## Verification

After implementation:
1. Check workflow YAML syntax with `yamllint` or `actionlint`
2. Verify the workflow appears in GitHub Actions tab
3. Test with a new PR
4. Test manual re-run from Actions tab
