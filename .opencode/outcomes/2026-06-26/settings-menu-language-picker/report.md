# Settings Menu with Language Picker

**Date:** 2026-06-26  
**Task:** Add a settings button (cog icon) at the bottom of the sidebar that opens a popover menu with options including language switching.

---

## Summary

Implemented a reusable `Popover` primitive in `@rewriter/ui`, extracted shared hooks and utilities from existing components, and built a settings menu with language picker in the dashboard app.

---

## Changes in `@rewriter/ui`

### New files
- **`src/hooks/useClickOutside.ts`** — Extracted click-outside detection into a reusable hook. Accepts an array of refs and a callback; fires when mousedown occurs outside all refs. Supports an `enabled` flag.
- **`src/utils/position.ts`** — Extracted and extended positioning logic from `Tooltip.tsx`. Supports 8 placements (`top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `right`). Includes auto-flip when overflowing viewport and boundary clamping.
- **`src/components/Popover.tsx`** — New portal-based floating overlay component. Uses `useClickOutside`, Escape key handling, `createPortal`, and shared `getPosition` utility. Positioned `fixed` relative to an anchor ref.

### Modified files
- **`src/components/Tooltip.tsx`** — Refactored to use shared `getPosition` from `utils/position.ts` instead of inline positioning function. Behavior unchanged.
- **`src/components/Select.tsx`** — Refactored to use `useClickOutside` hook instead of inline `useEffect` for click-outside detection. Behavior unchanged.
- **`src/components/Button.tsx`** — Added `iconOnly?: boolean` prop. When true, applies square sizing (`w-8 h-8` for sm, `w-9 h-9` for md, `w-11 w-11` for lg) and centers the icon.
- **`src/components/Sidebar.tsx`** — Added `footer?: React.ReactNode` prop. Renders below the `<nav>` inside a `border-t` container. Centers content when sidebar is collapsed.
- **`src/index.ts`** — Added exports: `Popover`, `PopoverProps`, `useClickOutside`, `Placement`, `getPosition`, `Languages`, `Check`, `LogOut`, `ChevronRight` icons.

---

## Changes in `@apps/dashboard`

### New files
- **`src/components/SettingsMenu.tsx`** — Settings button with cog icon. Renders as full-width ghost button when sidebar expanded, icon-only when collapsed. On click, opens a `Popover` (placement: `top-end`) with two menu items:
  - **Language** — Opens `LanguageModal`
  - **Log out** — Placeholder, closes popover
- **`src/components/LanguageModal.tsx`** — Modal (size `sm`) showing language options as styled buttons with radio-like active indicator (checkmark). Selecting a language calls `i18n.changeLanguage()` and closes the modal.

### Modified files
- **`src/App.tsx`** — Imports `SettingsMenu` and passes `footer={<SettingsMenu expanded={expanded} />}` to `<Sidebar>`.
- **`src/i18n/locales/en.json`** — Added `settings.*` and `languageSwitcher.*` keys.
- **`src/i18n/locales/vi.json`** — Added Vietnamese translations for `settings.*` and `languageSwitcher.*`.

---

## Verification

- `bun run --filter @rewriter/ui typecheck` — pass
- `bun run --filter @rewriter/dashboard typecheck` — pass
- `bun run --filter @rewriter/dashboard build` — pass (302.79 KB JS)
