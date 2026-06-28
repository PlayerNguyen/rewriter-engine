# Modal Registry — Plan

> **Goal**: A reusable, type-safe modal stack service with a registry pattern.
> Any component can call `useModal().open('key', props)` with full IntelliSense
> on both the modal name and its custom props. Types are preserved end-to-end
> via a `configureModalService()` factory — no `any` casts, no explicit type parameters.

---

## 1. Package: `packages/modal` (`@rewriter/modal`)

```
packages/modal/
├── package.json
├── tsconfig.json
├── AGENTS.md
└── src/
    ├── index.tsx                         # Barrel — configureModalService, types
    ├── types.ts                          # ModalBaseProps, ModalFactory, ModalRegistry, CustomProps
    ├── ModalService.ts                   # Class: registry, stack, subscribe/notify
    ├── configureModalService.ts           # Factory → { ModalProvider, useModal, service }
    ├── ModalService.test.ts              # Unit tests for the class
    └── configureModalService.test.tsx    # Unit tests for factory + hook + provider
```

### 1.1 `package.json`

```jsonc
{
  "name": "@rewriter/modal",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.tsx",
  "types": "./src/index.tsx",
  "exports": { ".": "./src/index.tsx" },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "bun test"
  },
  "dependencies": {
    "@rewriter/ui": "workspace:*"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5"
  },
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  }
}
```

Root workspace: `"packages/modal"` is already covered by `"packages/*"`.

---

## 2. Type Design

### 2.1 `src/types.ts`

```ts
import type { ReactNode } from 'react';

/**
 * Props automatically injected by the modal service into every modal.
 * Modals receive `open` (visibility gate) and `onClose` (dismiss).
 */
export interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
}

/**
 * A factory function that receives {@link ModalBaseProps} merged with
 * the modal's custom props and returns a React node.
 *
 * @typeParam TCustom - Shape of the custom props beyond {@link ModalBaseProps}.
 */
export type ModalFactory<TCustom = Record<string, never>> = (
  props: ModalBaseProps & TCustom,
) => ReactNode;

/**
 * Registry mapping string keys to {@link ModalFactory} functions.
 * Each key's factory defines the custom props that `open()` will require.
 *
 * @example
 * const registry = {
 *   'edit-setting': (p: ModalBaseProps & { settingId: string }) => <EditSettingModal {...p} />,
 * };
 */
export type ModalRegistry = Record<string, ModalFactory<any>>;

/** Extracts the custom props (excluding {@link ModalBaseProps}) for a given factory. */
export type CustomProps<TFactory extends ModalFactory<any>> = Omit<
  Parameters<TFactory>[0],
  keyof ModalBaseProps
>;
```

---

## 3. `ModalService`

### 3.1 `src/ModalService.ts`

Plain class — no React dependency. Created internally by `configureModalService()`.

```ts
import type { ModalBaseProps, ModalRegistry, CustomProps } from './types';

export class ModalService<TRegistry extends ModalRegistry> {
  private stack: Array<{ key: keyof TRegistry & string; customProps: any }> = [];
  private listeners = new Set<() => void>();

  /** Read-only access to the registry. */
  constructor(readonly registry: TRegistry) {}

  /** Snapshot of the current stack (used by useSyncExternalStore). */
  getStack() {
    return [...this.stack] as const;
  }

  /** Subscribe to stack changes. Returns unsubscribe. */
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  /**
   * Push a modal onto the stack. Full IntelliSense — `key` is auto-completed
   * from the registry, and `customProps` is typed per that modal's factory.
   */
  open<K extends keyof TRegistry & string>(
    key: K,
    customProps: CustomProps<TRegistry[K]>,
  ) {
    this.stack.push({ key, customProps });
    this.notify();
  }

  /** Pop the top modal off the stack. */
  close() {
    if (this.stack.length === 0) return;
    this.stack.pop();
    this.notify();
  }

  /** Alias for `close()`. */
  closeTop() {
    this.close();
  }

  /** Clear the entire modal stack. */
  closeAll() {
    if (this.stack.length === 0) return;
    this.stack = [];
    this.notify();
  }

  /**
   * Resolve a stack entry into the merged props needed to render the modal.
   * Only the top-most entry gets `open: true`.
   */
  resolveProps(
    entry: { key: keyof TRegistry & string; customProps: any },
    isTop: boolean,
  ): ModalBaseProps & Record<string, any> {
    return {
      ...entry.customProps,
      open: isTop,
      onClose: () => this.close(),
    };
  }
}
```

---

## 4. `configureModalService` — Factory (the core of type safety)

### 4.1 `src/configureModalService.ts`

Creates a dedicated React context scoped to the registry type, so `useModal()`
inherits the exact `TRegistry` without any `any` cast.

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from 'react';
import { ModalService } from './ModalService';
import type { ModalRegistry, CustomProps } from './types';

/**
 * Creates a pre-typed modal service, provider, and hook bound to a registry.
 *
 * This is the only public API for consuming the modal system. The returned
 * `useModal` hook and `ModalProvider` component are fully typed against the
 * registry — no explicit type parameters needed anywhere.
 *
 * @typeParam TRegistry - Inferred from the registry argument.
 *
 * @returns `{ ModalProvider, useModal, service }`
 *
 * @example
 * ```tsx
 * import { configureModalService } from '@rewriter/modal';
 *
 * export const { ModalProvider, useModal } = configureModalService({
 *   'edit-setting': (p: ModalBaseProps & { settingId: string }) => (
 *     <EditSettingModal {...p} />
 *   ),
 * });
 * ```
 */
export function configureModalService<TRegistry extends ModalRegistry>(
  registry: TRegistry,
) {
  const Context = createContext<ModalService<TRegistry> | null>(null);
  const service = new ModalService(registry);

  /**
   * Wraps the app tree. Renders the modal stack behind children —
   * the topmost modal receives `open: true`, all others `open: false`.
   */
  function ModalProvider({ children }: { children: React.ReactNode }) {
    const stack = useSyncExternalStore(
      (cb) => service.subscribe(cb),
      () => service.getStack(),
    );

    return (
      <Context.Provider value={service}>
        {children}
        {stack.map((entry, index) => {
          const isTop = index === stack.length - 1;
          const factory = registry[entry.key];
          if (!factory) return null;
          return (
            <span key={`${entry.key}-${index}`}>
              {factory(service.resolveProps(entry, isTop))}
            </span>
          );
        })}
      </Context.Provider>
    );
  }

  /**
   * Hook for opening and closing modals. Because this closure captures
   * the exact `TRegistry` type, `open('key', props)` has full IntelliSense
   * — TypeScript knows which keys exist and what custom props each requires.
   *
   * @throws If called outside the {@link ModalProvider} returned by this factory.
   */
  function useModal() {
    const svc = useContext(Context);
    if (!svc) {
      throw new Error(
        'useModal must be used within the ModalProvider returned by configureModalService',
      );
    }

    const open = useCallback(
      <K extends keyof TRegistry & string>(
        key: K,
        customProps: CustomProps<TRegistry[K]>,
      ) => {
        svc.open(key, customProps);
      },
      [svc],
    );

    const close = useCallback(() => svc.close(), [svc]);
    const closeTop = useCallback(() => svc.closeTop(), [svc]);
    const closeAll = useCallback(() => svc.closeAll(), [svc]);

    return { open, close, closeTop, closeAll };
  }

  return { ModalProvider, useModal, service };
}
```

> **Why this works**: The `Context` is created *inside* the generic function,
> so its type is `Context<ModalService<TRegistry>>` — not `ModalService<any>`.
> The `useModal` closure captures this exact context. No type parameter is
> ever needed at the call site — TypeScript infers everything from the registry.

---

## 5. Per-App Configuration

### 5.1 `apps/dashboard/src/config/configureModals.ts`

App-level wiring — define which modal keys map to which components.

```tsx
import { configureModalService, type ModalBaseProps } from '@rewriter/modal';
import { LanguageModal } from '../components/LanguageModal';
import { EditSettingModal } from '../components/EditSettingModal';
// ... future modals

export const { ModalProvider, useModal, service: modalService } = configureModalService({
  'language': (p: ModalBaseProps) => <LanguageModal {...p} />,
  'edit-setting': (p: ModalBaseProps & { settingId: string }) => <EditSettingModal {...p} />,
});
```

### 5.2 Mount in `apps/dashboard/src/main.tsx`

```tsx
import { ModalProvider } from './config/configureModals';

<ModalProvider>
  <RouterProvider router={router} />
</ModalProvider>
```

### 5.3 Caller usage anywhere in the tree

```tsx
import { useModal } from '../config/configureModals';

function SettingsPage() {
  const { open } = useModal();

  return (
    <Button onClick={() => open('edit-setting', { settingId: 'abc' })}>
      Edit
    </Button>
  );
}
```

> **TypeScript enforces**: `open('edit-setting', { settingId: '...' })` — IntelliSense
> auto-completes the key and requires the exact custom props. No explicit generic,
> no `any` slip.

---

## 6. Stack Behavior

| Action | Effect |
|--------|--------|
| `open('A', p)` | Push modal A onto stack → A renders with `open: true` |
| `open('B', q)` | Push modal B → B renders on top (`open: true`), A behind (`open: false`) |
| `close()` | Pop B → A becomes top (`open: true`) |
| `closeTop()` | Alias for `close()` |
| `closeAll()` | Clear stack → no modals rendered |

Stack depth is unlimited. Only the top modal receives `open: true`, enabling
backdrop stacking and correct focus trap per `@rewriter/ui`'s `Modal` component.

---

## 7. Unit Tests

### 7.1 `src/ModalService.test.ts`

Uses `bun:test`. Tests the class in isolation (no React).

| Test | What it verifies |
|------|------------------|
| `open()` pushes onto stack | After `open('a', {})`, `getStack().length === 1` |
| `open()` notifies subscribers | Listener is called after `open()` |
| `close()` pops | After open + close, stack length is 0 |
| `close()` on empty stack is safe | Does not throw |
| `closeAll()` clears everything | After open A, open B, closeAll → stack length 0 |
| `resolveProps()` gives `open: true` to top | Top entry → `{ open: true, onClose: fn }` |
| `resolveProps()` gives `open: false` to non-top | Non-top → `{ open: false, onClose: fn }` |
| `resolveProps()` merges custom props | Custom props passed through to result |
| `subscribe()` returns unsubscribe | Unsubscribe stops notifications |

### 7.2 `src/configureModalService.test.tsx`

Uses `bun:test` + `@testing-library/react`.

| Test | What it verifies |
|------|------------------|
| Factory returns `ModalProvider`, `useModal`, `service` | All three keys present |
| Renders top modal's factory output | After `open('key', props)`, the registered component renders |
| Top modal gets `open: true` | Factory called with `open: true` on top entry |
| Non-top modal gets `open: false` | When stack depth > 1, non-top factory called with `open: false` |
| `close()` removes modal from DOM | After `close()`, modal content is unmounted |
| `closeAll()` removes all | All modal content unmounted |
| `useModal` throws outside provider | Error thrown if `useModal` called without `<ModalProvider>` |

---

## 8. Verification

| Step | Command |
|------|---------|
| 1. Install | `bun install` |
| 2. Typecheck | `bun run --filter @rewriter/modal typecheck` |
| 3. Unit tests | `bun run --filter @rewriter/modal test` |
| 4. Full typecheck | `bun run typecheck` |

---

## 9. Dependencies

| Depends on | Why |
|------------|-----|
| `@rewriter/ui` | Modal component for focus trap, backdrop, portal (the service itself is agnostic — factories render whatever they want) |
| `react` (peer) | `useSyncExternalStore`, `createContext`, `useCallback` |
| `@testing-library/react` (dev) | Unit tests for the React integration |
| No new third-party deps | — |

---

## 10. Notes

- Each app (dashboard, future admin panels) creates its own `configureModalService()`
  call with its own registry. The returned `ModalProvider`, `useModal`, and `service`
  are app-scoped — they never leak between apps.
- The service class is framework-agnostic — only the factory function depends on
  React. The same `ModalService` could be reused in a different runtime with a
  different binding layer.
- Modal factories can render the `@rewriter/ui` `Modal` component, a custom drawer,
  or anything — the service doesn't care what the factory returns.
- `useSyncExternalStore` ensures the stack renderer never tears (concurrent safe).
- When `open()` is called during render, React's batching defers the re-render,
  avoiding `setState during render` warnings because the service notifies via
  the external store subscription, not via `useState`.
