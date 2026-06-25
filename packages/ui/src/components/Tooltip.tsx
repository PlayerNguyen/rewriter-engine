import { forwardRef, useState, useRef, useCallback, useEffect, useId, type ReactNode, type ReactElement } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
  offset?: number;
  disabled?: boolean;
  className?: string;
}

function getPosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
  offset: number
): { top: number; left: number; arrowTop?: number; arrowLeft?: number } {
  const { top: tTop, left: tLeft, width: tWidth, height: tHeight } = triggerRect;
  const { width: ttWidth, height: ttHeight } = tooltipRect;

  switch (placement) {
    case "top":
      return {
        top: tTop - ttHeight - offset,
        left: tLeft + tWidth / 2 - ttWidth / 2,
      };
    case "bottom":
      return {
        top: tTop + tHeight + offset,
        left: tLeft + tWidth / 2 - ttWidth / 2,
      };
    case "left":
      return {
        top: tTop + tHeight / 2 - ttHeight / 2,
        left: tLeft - ttWidth - offset,
      };
    case "right":
      return {
        top: tTop + tHeight / 2 - ttHeight / 2,
        left: tLeft + tWidth + offset,
      };
  }
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, placement = "top", delay = 200, offset = 8, disabled, className }, ref) => {
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
      const pos = getPosition(triggerRect, tooltipRect, placement, offset);

      const adjusted = { ...pos };
      if (pos.left < 8) adjusted.left = 8;
      if (pos.left + tooltipRect.width > window.innerWidth - 8) {
        adjusted.left = window.innerWidth - tooltipRect.width - 8;
      }
      if (pos.top < 8) adjusted.top = 8;
      if (pos.top + tooltipRect.height > window.innerHeight - 8) {
        adjusted.top = window.innerHeight - tooltipRect.height - 8;
      }

      setPosition(adjusted);
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
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll, true);
          window.removeEventListener("resize", handleScroll);
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
      "aria-describedby": visible ? tooltipId : undefined,
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
                "fixed z-[100] px-2.5 py-1.5 text-xs text-inverse-ink bg-inverse-canvas rounded-md shadow-lg",
                "pointer-events-none animate-fadeIn",
                className
              )}
              style={{ top: position.top, left: position.left }}
            >
              {content}
              <div
                className={clsx(
                  "absolute w-2 h-2 bg-inverse-canvas rotate-45",
                  placement === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2",
                  placement === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2",
                  placement === "left" && "right-[-4px] top-1/2 -translate-y-1/2",
                  placement === "right" && "left-[-4px] top-1/2 -translate-y-1/2"
                )}
                aria-hidden="true"
              />
            </div>,
            document.body
          )}
      </>
    );
  }
);

Tooltip.displayName = "Tooltip";
