import clsx from 'clsx';
import { forwardRef, type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '../hooks/useClickOutside';
import { getPosition, type Placement } from '../utils/position';

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
  placement?: Placement;
  offset?: number;
  className?: string;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    { open, onClose, anchorRef, children, placement = 'bottom-end', offset = 8, className },
    ref,
  ) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const updatePosition = useCallback(() => {
      if (!anchorRef.current || !popoverRef.current) return;
      const triggerRect = anchorRef.current.getBoundingClientRect();
      const contentRect = popoverRef.current.getBoundingClientRect();
      const pos = getPosition({ triggerRect, contentRect, placement, offset });
      setPosition({ top: pos.top, left: pos.left });
    }, [anchorRef, placement, offset]);

    useEffect(() => {
      if (!open) return;
      updatePosition();
      const handleScroll = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
      };
    }, [open, updatePosition]);

    useEffect(() => {
      if (!open) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    useClickOutside([popoverRef, anchorRef], onClose, open);

    if (!open) return null;

    return createPortal(
      <div
        ref={(node) => {
          (popoverRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="menu"
        className={clsx(
          'fixed z-[90] bg-surface-2 border border-hairline-strong rounded-md',
          'shadow-lg animate-fadeIn',
          className,
        )}
        style={{ top: position.top, left: position.left }}
      >
        {children}
      </div>,
      document.body,
    );
  },
);

Popover.displayName = 'Popover';
