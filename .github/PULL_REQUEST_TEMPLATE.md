## 📝 Description

<!-- Describe your changes and motivation. What problem does this solve? -->

Fixes #

### 🎯 Type of Change

<!-- Select one (or more if applicable). Delete the others. -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] ⚡ Performance enhancement / Optimization
- [ ] ♻️ Refactoring (no functional changes, no API changes)
- [ ] 📝 Documentation update
- [ ] 🧱 Infrastructure / CI / Tooling
- [ ] 🧹 Chore (deps, lint, format, cleanup)

### 📦 Workspaces Affected

<!-- Check the relevant packages or apps changed in this PR. -->

- [ ] `@rewriter/dashboard`
- [ ] `@rewriter/server`
- [ ] `@rewriter/db`
- [ ] `@rewriter/ui`
- [ ] `@rewriter/table-core`
- [ ] `@rewriter/logger`
- [ ] Root / config / CI

---

## 🧪 How Has This Been Tested?

### 📸 Screenshots / Screen Recordings

<!-- For UI changes. Delete if not applicable. -->

| Before | After |
|--------|-------|
|        |       |

### ✅ Verification Commands

<!-- Run these locally and paste the output or check the boxes. -->

```
# Terminal output:
$ bun run lint
```

```
# Terminal output:
$ bun run typecheck
```

```
# Terminal output:
$ bun run test
```

```
# Terminal output (if applicable):
$ bun run test:e2e
```

```
# Terminal output (if applicable):
$ bun run --filter @rewriter/dashboard build
```

### 🤖 Automated Test Coverage

- [ ] **Unit Tests:** Passed successfully.
- [ ] **E2E Tests:** Passed successfully.
- [ ] **Typecheck:** Zero type errors (`bun run typecheck`).
- [ ] **Lint:** No format/lint violations (`bun run lint`).
- [ ] **Build:** Dashboard and Storybook build without errors.

---

## 📋 Checklist

- [ ] My commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).
- [ ] My branch name follows the `prefix/description` convention (e.g., `feat/`, `fix/`, `chore/`).
- [ ] I have performed a self-review of my own code.
- [ ] I have added JSDoc/TSDoc comments to new exports where applicable.
- [ ] My changes generate no new type errors (`bun run typecheck`).
- [ ] My changes pass lint and format checks (`bun run lint`).
- [ ] I have added tests that prove my fix is effective or that my feature works.
- [ ] New and existing tests pass locally with my changes.
- [ ] Any dependent workspace changes have been coordinated (`.codegraph/index` updated if structural changes).
