# @rewriter/modal — Type-Safe Modal Stack Service

A reusable, type-safe modal stack service with a registry pattern. Any component can call `useModal().open('key', props)` with full IntelliSense on both the modal name and its custom props.

## Quick Start

```tsx
import { configureModalService, type ModalBaseProps } from '@rewriter/modal';

export const { ModalProvider, useModal, service } = configureModalService({
  'edit-setting': (p: ModalBaseProps & { settingId: string }) => (
    <EditSettingModal {...p} />
  ),
  'confirm': (p: ModalBaseProps & { message: string }) => <ConfirmModal {...p} />,
});

// Mount in app root
<ModalProvider>
  <App />
</ModalProvider>

// Open from anywhere
function SettingsPage() {
  const { open } = useModal();
  open('edit-setting', { settingId: 'abc' });  // full IntelliSense
}
```

## Architecture

```
packages/modal/
├── src/
│   ├── types.ts                  — ModalBaseProps, ModalFactory, ModalRegistry, CustomProps
│   ├── ModalService.ts           — Class: registry, stack, subscribe/notify
│   ├── configureModalService.tsx  — Factory → { ModalProvider, useModal, service }
│   ├── index.tsx                  — Barrel
│   ├── ModalService.test.ts      — Unit tests for the class
│   └── configureModalService.test.tsx — Unit tests for factory + hook + provider
├── package.json
└── tsconfig.json
```

### Type Safety

The `configureModalService()` factory creates a React context typed to the exact registry, so `useModal()` inherits `TRegistry` without any `any` casts. TypeScript infers everything from the registry argument — no explicit type parameters needed at call sites.

## Exports

| Export | Kind | Description |
|--------|------|-------------|
| `configureModalService` | function | Factory returning `{ ModalProvider, useModal, service }` |
| `ModalBaseProps` | interface | `{ open: boolean; onClose: () => void }` — injected into every modal |
| `ModalFactory<TCustom>` | type | Factory function returning a ReactNode |
| `ModalRegistry` | type | Record of string keys to ModalFactory |
| `CustomProps<TFactory>` | type | Extracts custom props (excluding ModalBaseProps) from a factory |
| `ModalService` | class | Stack management, subscribe/notify pattern |

## Stack Behavior

| Action | Effect |
|--------|--------|
| `open('A', p)` | Push A onto stack, renders with `open: true` |
| `open('B', q)` | Push B, B renders on top (`open: true`), A behind (`open: false`) |
| `close()` | Pop top, previous modal becomes top |
| `closeTop()` | Alias for `close()` |
| `closeAll()` | Clear entire stack |

## Commands

```bash
bun run --filter @rewriter/modal typecheck
bun run --filter @rewriter/modal test
```
