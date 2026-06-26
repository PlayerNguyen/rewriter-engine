# Dashboard Layout — Completed

**Status:** ✅ Complete
**Branch:** `feat/dashboard-layout`
**Date:** 2026-06-26

## Summary

Re-style `@apps/dashboard/` as a modern dashboard with collapsible hierarchical sidebar, using reusable components from `@packages/ui/`.

## Architecture

### New Components (packages/ui)

- **Sidebar** — Collapsible sidebar with search, grouped nav items, tooltips
- **DashboardLayout** — Flex wrapper with sidebar + scrollable content area

### New Config (apps/dashboard)

- **configureSidebar.tsx** — Factory function returning grouped nav items with Lucide icons

### Dependencies

- `lucide-react` added to `@rewriter/ui`

## Design Decisions

- Lucide icons for all sidebar navigation
- Sidebar collapsed (w-16): group icons only with tooltips
- Sidebar expanded (w-60): groups with collapsible sub-items
- Search filters across all groups/items client-side
- Group headers only toggle expand/collapse (no navigation)
- Sub-items indented with `pl-8`
- Follows DESIGN.md: surface ladder, hairline borders, lavender accent

## Sidebar Visual Behavior

### Expanded (w-60)

```
┌──────────────────────────────────────┐
│ 🔍 Search...                        │
├──────────────────────────────────────┤
│ ▼ Content                           │
│   📰 Articles                        │
│   📝 Rewrites                        │
│ ▼ Configuration                     │
│   🔗 Sources                         │
│   🤖 Prompts                         │
│ ▼ System                            │
│   ⚙️ Settings                        │
│   📊 Logs                            │
└──────────────────────────────────────┘
```

### Collapsed (w-16)

```
┌──────────┐
│ 🔍       │
├──────────┤
│ 📰  ← tooltip: "Content"
│ 🔗  ← tooltip: "Configuration"
│ ⚙️  ← tooltip: "System"
└──────────┘
```

## Search Behavior

- Filters across all groups and items
- Hides non-matching items
- Auto-expands groups that contain matches
- Clear button resets query and restores original state

## Styling Reference (DESIGN.md)

| Element      | Token                      |
| ------------ | -------------------------- |
| Sidebar bg   | `bg-surface-1`             |
| Sidebar border | `border-r border-hairline` |
| Active item  | `bg-surface-2 text-primary` |
| Hover item   | `hover:bg-surface-2`       |
| Sub-item indent | `pl-8`                    |
| Group header | `text-ink-subtle`          |
| Search input | `TextInput size="sm"`      |

## Lucide Icons

| Icon            | Usage                    |
| --------------- | ------------------------ |
| `Search`        | Search input left icon   |
| `X`             | Clear search button      |
| `PanelLeftClose`  | Toggle sidebar (→ collapsed) |
| `PanelLeftOpen`   | Toggle sidebar (→ expanded)  |
| `ChevronDown`   | Group expand indicator   |
| `Newspaper`     | Articles                 |
| `FileText`      | Rewrites                 |
| `Link`          | Sources                  |
| `Bot`           | Prompts                  |
| `Settings`      | Settings                 |
| `ScrollText`    | Logs                     |

## Files Changed

| File | Action |
|------|--------|
| `packages/ui/package.json` | Add `lucide-react` |
| `packages/ui/src/components/Sidebar.tsx` | Create |
| `packages/ui/src/components/DashboardLayout.tsx` | Create |
| `packages/ui/src/index.ts` | Modify — add exports |
| `apps/dashboard/src/configs/configureSidebar.tsx` | Create |
| `apps/dashboard/src/App.tsx` | Modify — use dashboard layout |

## Verification

- ✅ Typecheck `@rewriter/ui` — passed
- ✅ Typecheck `@rewriter/dashboard` — passed
- ✅ Visual verify — dev server running at http://localhost:5173/
