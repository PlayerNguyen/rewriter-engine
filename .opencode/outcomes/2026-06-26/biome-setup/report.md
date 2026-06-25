# Biome Setup - 2026-06-26

## Summary

Configured Biome as the unified linter and formatter for the rewriter monorepo, replacing ESLint and Prettier.

## Decisions Made

| Setting | Value | Rationale |
|---------|-------|-----------|
| Quote style | Single quotes | User preference |
| Line width | 100 | User preference (wider than default 80) |
| Indent style | Spaces (2) | Consistent with existing codebase |
| Semicolons | Always | Standard for TypeScript/React |
| Lint rules | Recommended | Strict but balanced |
| Unused imports | Warn | Catch dead code without blocking |
| Import sorting | Enabled | Auto-organize imports |

## Files Created/Modified

| File | Action | Purpose |
|------|--------|---------|
| `biome.json` | Created | Main Biome configuration |
| `package.json` | Modified | Added lint/format scripts |
| `.vscode/settings.json` | Created | Editor integration |
| `.github/workflows/biome.yml` | Created | CI pipeline |
| `bun.lock` | Modified | Added @biomejs/biome@2.5.1 |

## Configuration Details

### biome.json
- Covers `apps/**` and `packages/**` directories
- Excludes `node_modules`, `dist`, `storybook-static`, `*.css`
- Formatter: 100 char line width, single quotes, semicolons
- Linter: Recommended rules with `noUnusedImports` as warning
- Import organization: Enabled

### Scripts Added
```bash
bun run lint         # Check for issues
bun run lint:fix     # Auto-fix safe issues
bun run format       # Format all files
bun run format:check # Check formatting
```

### CI Pipeline
- Triggers on push/PR to `main`
- Uses `oven-sh/setup-bun@v2` for Bun
- Runs `biome ci .` (lint + format check, exits non-zero on failure)

## Verification Results

Initial lint run: **87 errors, 19 warnings, 2 infos**

After `bun run lint:fix`: **50 files auto-formatted**, remaining issues:
- **13 errors** (unsafe fixes not applied)
- **19 warnings** (non-null assertions, banned types, a11y issues)
- **2 infos**

### Safe Fixes Applied
- Import organization (alphabetical sorting)
- Quote style (double → single quotes)
- Semicolons formatting
- Line width adjustments
- JSON formatting

### Remaining Issues (require manual review)
- `noNonNullAssertion` - Non-null assertions (`!`) in 6 locations
- `noBannedTypes` - `{}` type usage in polymorphic.ts
- `noUnusedImports` - Unused imports in 4 files
- `noExplicitAny` - `any` type in Modal.stories.tsx
- `useSemanticElements` - a11y role="group" suggestion
- `noSvgWithoutTitle` - SVG accessibility in 2 files
- `noArrayIndexKey` - Array index as key in Stack.tsx

## Next Steps

1. Install Biome VS Code extension for editor integration
2. Review and manually fix remaining lint errors
3. Consider enabling `--unsafe` fixes for unused imports
4. Commit changes and verify CI pipeline works
