import clsx from 'clsx';
import { forwardRef, type ReactNode, useCallback, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
};

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
].join(', ');

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      children,
      closeOnBackdrop = true,
      closeOnEsc = true,
      size = 'md',
      className,
    },
    ref,
  ) => {
    const titleId = useId();
    const descId = useId();
    const previousFocusRef = useCallback(() => document.activeElement as HTMLElement, []);

    const trapFocus = useCallback(
      (event: KeyboardEvent) => {
        if (!open) return;

        const modal = document.querySelector(`[data-modal="true"]`) as HTMLElement;
        if (!modal) return;

        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;

        if (event.key === 'Tab') {
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
        }
      },
      [open],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEsc) {
          event.preventDefault();
          onClose();
        }
        trapFocus(event);
      },
      [closeOnEsc, onClose, trapFocus],
    );

    useEffect(() => {
      if (!open) return;

      const prevFocus = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      requestAnimationFrame(() => {
        const modal = document.querySelector(`[data-modal="true"]`) as HTMLElement;
        if (modal) {
          const firstFocusable = modal.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
          firstFocusable?.focus();
        }
      });

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        prevFocus?.focus();
      };
    }, [open, handleKeyDown]);

    if (!open) return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="presentation">
        <div
          className="fixed inset-0 bg-semantic-overlay/80 backdrop-blur-sm animate-fadeIn"
          aria-hidden="true"
          onClick={closeOnBackdrop ? onClose : undefined}
        />

        <div
          ref={ref}
          data-modal="true"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descId : undefined}
          className={clsx(
            'relative z-10 w-full bg-surface-1 border border-hairline rounded-lg shadow-xl',
            'animate-scaleIn',
            sizeStyles[size],
            className,
          )}
        >
          {(title || description) && (
            <div className="px-6 pt-6 pb-0">
              {title && (
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="mt-1 text-sm text-ink-muted">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="px-6 py-4">{children}</div>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = 'Modal';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  showClose?: boolean;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ onClose, showClose = true, className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={clsx('flex items-center justify-between', className)} {...rest}>
        <div className="flex-1">{children}</div>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-4 p-1 rounded-md text-ink-tertiary hover:text-ink hover:bg-surface-2 transition-colors"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex items-center justify-end gap-3 mt-4', className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

ModalFooter.displayName = 'ModalFooter';
