import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';
import { ModalService } from './ModalService';
import type { CustomProps, ModalRegistry } from './types';

export function configureModalService<TRegistry extends ModalRegistry>(registry: TRegistry) {
  const Context = createContext<ModalService<TRegistry> | null>(null);
  const service = new ModalService(registry);

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
            <span key={`${entry.key}-${index}`}>{factory(service.resolveProps(entry, isTop))}</span>
          );
        })}
      </Context.Provider>
    );
  }

  function useModal() {
    const svc = useContext(Context);
    if (!svc) {
      throw new Error(
        'useModal must be used within the ModalProvider returned by configureModalService',
      );
    }

    const open = useCallback(
      <K extends keyof TRegistry & string>(key: K, customProps: CustomProps<TRegistry[K]>) => {
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
