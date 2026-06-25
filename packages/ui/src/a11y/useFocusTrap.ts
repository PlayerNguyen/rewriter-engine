import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
].join(", ");

export interface UseFocusTrapOptions {
  enabled?: boolean;
  restoreFocus?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

export function useFocusTrap<T extends HTMLElement>({
  enabled = true,
  restoreFocus = true,
  initialFocusRef,
}: UseFocusTrapOptions = {}) {
  const containerRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      .filter(el => !el.hasAttribute("disabled") && el.tabIndex !== -1);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Set initial focus
    const target = initialFocusRef?.current || getFocusableElements()[0];
    if (target) {
      requestAnimationFrame(() => target.focus());
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [enabled, getFocusableElements, initialFocusRef, restoreFocus]);

  return containerRef;
}
