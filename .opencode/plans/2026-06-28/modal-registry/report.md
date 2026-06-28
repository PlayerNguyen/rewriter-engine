# Modal Registry — Plan

> **Goal**: A reusable, type-safe modal stack service with a registry pattern.
> Any component can open a modal via `modalService.useModal().open('key', props)`
> with full IntelliSense on both the modal name and its custom props.

---

## 1. Package: `packages/modal` (`@rewriter/modal`)

```
packages/modal/
├── package.json
├── tsconfig.json
├── AGENTS.md
└── src/
    ├── index.tsx               # Barrel — ModalService, ModalProvider, useModal, types
    ├── types.ts                # ModalBaseProps, ModalFactory, ModalRegistry
    ├── ModalService.ts         # Class: registry, stack, subscribe/notify
    ├── ModalProvider.tsx        # React context + stack renderer
    ├── useModal.ts             # Hook: useSyncExternalStore bridge
    ├── ModalService.test.ts    # Unit tests for the class
    └── ModalProvider.test.tsx  # Unit tests for the provider + hook
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
 *   'confirm-delete': (p: ModalBaseProps & { title: string; onConfirm: () => void }) => <ConfirmModal {...p} />,
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

Singleton-style class — created once per app, passed to `<ModalProvider>`.

```ts
import type { ModalBaseProps, ModalFactory, ModalRegistry, CustomProps } from './types';

export class ModalService<TRegistry extends ModalRegistry> {
  private stack: Array<{ key: keyof TRegistry & string; customProps: any }> = [];
  private listeners = new Set<() => void>();

  /** Read-only access to the registry (used by ModalProvider). */
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

## 4. `ModalProvider` — React Context + Stack Renderer

### 4.1 `src/ModalProvider.tsx`

Wraps the app tree. Subscribes to the service via `useSyncExternalStore`,
renders every modal in the stack (only the top one is `open: true`).

```tsx
import { createContext, useContext, useSyncExternalStore } from 'react';
import type { ModalService } from './ModalService';
import type { ModalRegistry } from './types';

const ModalServiceContext = createContext<ModalService<any> | null>(null);

export function useModalService<T extends ModalRegistry = any>(): ModalService<T> {
  const svc = useContext(ModalServiceContext);
  if (!svc) throw new Error('useModalService must be used within <ModalProvider>');
  return svc;
}

/**
 * Provides modal stack management to the React tree.
 *
 * Renders the modal stack behind children — the topmost modal in the stack
 * receives `open: true`, all others sit behind it with `open: false`.
 *
 * @example
 * ```tsx
 * import { ModalProvider } from '@rewriter/modal';
 * import { modalService } from './config/configureModals';
 *
 * <ModalProvider service={modalService}>
 *   <App />
 * </ModalProvider>
 * ```
 */
export function ModalProvider({
  service,
  children,
}: {
  service: ModalService<any>;
  children: React.ReactNode;
}) {
  return (
    <ModalServiceContext.Provider value={service}>
      {children}
      <ModalStackRenderer service={service} />
    </ModalServiceContext.Provider>
  );
}

function ModalStackRenderer({ service }: { service: ModalService<any> }) {
  const stack = useSyncExternalStore(
    (cb) => service.subscribe(cb),
    () => service.getStack(),
  );

  return (
    <>
      {stack.map((entry, index) => {
        const isTop = index === stack.length - 1;
        const factory = service.registry[entry.key];
        if (!factory) return null;
        const props = service.resolveProps(entry, isTop);
        return <span key={`${entry.key}-${index}`}>{factory(props)}</span>;
      })}
    </>
  );
}
```

> **Note**: Using `<span key={...}>` as a wrapper — `Fragment` with a key works in React but
> the explicit `<span>` avoids any edge-case behavior. Each modal is its own subtree.

---

## 5. `useModal` Hook

### 5.1 `src/useModal.ts`

Per-component access to `open`, `close`, `closeTop`, `closeAll` with full type safety.

```ts
import { useCallback } from 'react';
import { useModalService } from './ModalProvider';
import type { ModalRegistry, CustomProps } from './types';

export function useModal<TRegistry extends ModalRegistry>(): {
  open: <K extends keyof TRegistry & string>(
    key: K,
    customProps: CustomProps<TRegistry[K]>,
  ) => void;
  close: () => void;
  closeTop: () => void;
  closeAll: () => void;
} {
  const service = useModalService<TRegistry>();

  const open = useCallback(
    <K extends keyof TRegistry & string>(
      key: K,
      customProps: CustomProps<TRegistry[K]>,
    ) => {
      service.open(key, customProps);
    },
    [service],
  );

  const close = useCallback(() => service.close(), [service]);
  const closeTop = useCallback(() => service.closeTop(), [service]);
  const closeAll = useCallback(() => service.closeAll(), [service]);

  return { open, close, closeTop, closeAll };
}
```

---

## 6. Per-App Configuration

### 6.1 `apps/dashboard/src/config/configureModals.ts`

App-level wiring — define which modal keys map to which components.

```tsx
import { type ModalRegistry, ModalService } from '@rewriter/modal';
import { type ModalBaseProps } from '@rewriter/modal';
import { LanguageModal } from '../components/LanguageModal';
import { EditSettingModal } from '../components/EditSettingModal';
// ... future modals

const registry = {
  'language': (p: ModalBaseProps) => <LanguageModal {...p} />,
  'edit-setting': (p: ModalBaseProps & { settingId: string }) => <EditSettingModal {...p} />,
} satisfies ModalRegistry;

export const modalService = new ModalService(registry);
```

### 6.2 Mount in `apps/dashboard/src/main.tsx`

```tsx
import { ModalProvider } from '@rewriter/modal';
import { modalService } from './config/configureModals';

// Wrap the app
<ModalProvider service={modalService}>
  <RouterProvider router={router} />
</ModalProvider>
```

### 6.3 Caller usage anywhere in the tree

```tsx
import { useModal } from '@rewriter/modal';

function SettingsPage() {
  const { open } = useModal();

  return (
    <Button onClick={() => open('edit-setting', { settingId: 'abc' })}>
      Edit
    </Button>
  );
}
```

> TypeScript enforces: `open('edit-setting', { settingId: '...' })` — IntelliSense
> auto-completes the key and requires the exact custom props.

---

## 7. Stack Behavior

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

## 8. Unit Tests

### 8.1 `src/ModalService.test.ts`

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

### 8.2 `src/ModalProvider.test.tsx`

Uses `bun:test` + `@testing-library/react`.

| Test | What it verifies |
|------|------------------|
| Renders top modal's factory output | After `open('key', props)`, the registered component renders |
| Top modal gets `open: true` | Factory called with `open: true` |
| Non-top modal gets `open: false` | When stack depth > 1, non-top factory called with `open: false` |
| `close()` removes modal from DOM | After `close()`, modal content is unmounted |
| `closeAll()` removes all | All modal content unmounted |
| `useModal` throws outside provider | Error thrown if used without `<ModalProvider>` |

---

## 9. Verification

| Step | Command |
|------|---------|
| 1. Install | `bun install` |
| 2. Typecheck | `bun run --filter @rewriter/modal typecheck` |
| 3. Unit tests | `bun run --filter @rewriter/modal test` |
| 4. Full typecheck | `bun run typecheck` |

---

## 10. Dependencies

| Depends on | Why |
|------------|-----|
| `@rewriter/ui` | Modal needs the `Modal` component from ui for focus trap, backdrop, portal (but the service itself is agnostic — the user renders whatever they want inside the factory) |
| `react` (peer) | `useSyncExternalStore`, context, hooks |
| No new third-party deps | — |

---

## 11. Notes

- Each app (dashboard, future admin panels) creates its own `ModalService` singleton
  with its own `ModalRegistry`.
- The service is framework-agnostic at the class level — only `useModal` and
  `ModalProvider` depend on React. This means the same class could be reused
  in a different runtime with a different binding layer.
- Modal factories can render the `@rewriter/ui` `Modal` component, or a
- custom drawer, or anything — the service doesn't care what the factory returns.
- `useSyncExternalStore` ensures the stack renderer never tears (concurrent safe).
- When `open()` is called during render, React's batching will defer the re-render,
  avoiding `setState during render` warnings because the service notifies via
  the external store subscription, not via `useState`.
