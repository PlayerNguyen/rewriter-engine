import clsx from 'clsx';
import {
  forwardRef,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getPosition, type Placement } from '../utils/position';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
  offset?: number;
  disabled?: boolean;
  className?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { content, children, placement = 'top', delay = 200, offset = 8, disabled, className },
    _ref,
  ) => {
    const tooltipId = useId();
    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const timeoutRef = useRef<number | undefined>(undefined);

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const pos = getPosition({
        triggerRect,
        contentRect: tooltipRect,
        placement: placement as Placement,
        offset,
      });
      setPosition({ top: pos.top, left: pos.left });
    }, [placement, offset]);

    const show = useCallback(() => {
      if (disabled) return;
      timeoutRef.current = window.setTimeout(() => {
        setVisible(true);
      }, delay);
    }, [disabled, delay]);

    const hide = useCallback(() => {
      window.clearTimeout(timeoutRef.current);
      setVisible(false);
    }, []);

    useEffect(() => {
      if (visible) {
        updatePosition();
        const handleScroll = () => updatePosition();
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll, true);
          window.removeEventListener('resize', handleScroll);
        };
      }
    }, [visible, updatePosition]);

    useEffect(() => {
      return () => window.clearTimeout(timeoutRef.current);
    }, []);

    const childProps = {
      ref: triggerRef,
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      'aria-describedby': visible ? tooltipId : undefined,
    };

    const clonedChild = children ? (
      <span className="inline-flex" {...childProps}>
        {children}
      </span>
    ) : null;

    return (
      <>
        {clonedChild}
        {visible &&
          createPortal(
            <div
              ref={tooltipRef}
              id={tooltipId}
              role="tooltip"
              className={clsx(
                'fixed z-[100] px-2.5 py-1.5 text-xs text-inverse-ink bg-inverse-canvas rounded-md shadow-lg',
                'pointer-events-none animate-fadeIn',
                className,
              )}
              style={{ top: position.top, left: position.left }}
            >
              {content}
              <div
                className={clsx(
                  'absolute w-2 h-2 bg-inverse-canvas rotate-45',
                  placement === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                  placement === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                  placement === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                  placement === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2',
                )}
                aria-hidden="true"
              />
            </div>,
            document.body,
          )}
      </>
    );
  },
);

Tooltip.displayName = 'Tooltip';
