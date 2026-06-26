import { type RefObject, useEffect } from 'react';

export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  callback: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: MouseEvent) => {
      const target = event.target as Node;
      for (const ref of refs) {
        if (ref.current?.contains(target)) return;
      }
      callback();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [refs, callback, enabled]);
}
