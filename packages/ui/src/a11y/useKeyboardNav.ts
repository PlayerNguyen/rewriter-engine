import { useCallback } from 'react';

export interface KeyboardNavHandlers {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
}

export function useKeyboardNav(handlers: KeyboardNavHandlers) {
  return useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          handlers.onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          handlers.onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handlers.onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handlers.onArrowRight?.();
          break;
        case 'Enter':
          handlers.onEnter?.();
          break;
        case ' ':
          event.preventDefault();
          handlers.onSpace?.();
          break;
        case 'Escape':
          handlers.onEscape?.();
          break;
        case 'Home':
          event.preventDefault();
          handlers.onHome?.();
          break;
        case 'End':
          event.preventDefault();
          handlers.onEnd?.();
          break;
      }
    },
    [handlers],
  );
}
