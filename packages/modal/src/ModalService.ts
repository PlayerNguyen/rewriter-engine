import type { ModalBaseProps, ModalRegistry, CustomProps } from './types';

export class ModalService<TRegistry extends ModalRegistry> {
  private stack: Array<{ key: keyof TRegistry & string; customProps: any }> = [];
  private listeners = new Set<() => void>();
  private snapshot: ReadonlyArray<{ key: keyof TRegistry & string; customProps: any }> = [];

  /** Read-only access to the registry. */
  constructor(readonly registry: TRegistry) {}

  /** Snapshot of the current stack (used by useSyncExternalStore). */
  getStack() {
    return this.snapshot;
  }

  /** Subscribe to stack changes. Returns unsubscribe. */
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.snapshot = [...this.stack];
    this.listeners.forEach((fn) => { fn(); });
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
