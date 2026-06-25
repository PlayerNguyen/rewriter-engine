import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';

// types & exports

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
  className?: string;
}

// constants

const selectSizes = {
  sm: 'h-8 text-xs px-2.5',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
};

// component

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      placeholder = 'Select...',
      label,
      helperText,
      error,
      success,
      disabled,
      required,
      size = 'md',
      containerClassName,
      className,
    },
    ref,
  ) => {
    const autoId = useId();
    const listboxId = `${autoId}-listbox`;
    const helperId = `${autoId}-helper`;
    const errorId = `${autoId}-error`;

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOption = options.find((opt) => opt.value === value);

    const selectOption = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;
        if (controlledValue === undefined) {
          setInternalValue(option.value);
        }
        onChange?.(option.value);
        setIsOpen(false);
        setActiveIndex(-1);
      },
      [controlledValue, onChange],
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            if (isOpen && activeIndex >= 0) {
              selectOption(options[activeIndex]!);
            } else {
              setIsOpen(!isOpen);
            }
            break;
          case 'ArrowDown':
            event.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setActiveIndex(0);
            } else {
              setActiveIndex((prev) => {
                let next = prev + 1;
                while (next < options.length && options[next]?.disabled) next++;
                return next < options.length ? next : prev;
              });
            }
            break;
          case 'ArrowUp':
            event.preventDefault();
            if (isOpen) {
              setActiveIndex((prev) => {
                let next = prev - 1;
                while (next >= 0 && options[next]?.disabled) next--;
                return next >= 0 ? next : prev;
              });
            }
            break;
          case 'Escape':
            event.preventDefault();
            setIsOpen(false);
            setActiveIndex(-1);
            break;
          case 'Home':
            event.preventDefault();
            setActiveIndex(0);
            break;
          case 'End':
            event.preventDefault();
            setActiveIndex(options.length - 1);
            break;
        }
      },
      [isOpen, activeIndex, options, selectOption],
    );

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && activeIndex >= 0 && listRef.current) {
        const item = listRef.current.children[activeIndex] as HTMLElement;
        item?.scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex, isOpen]);

    const describedBy =
      [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined;

    return (
      <div
        ref={containerRef}
        className={clsx('relative flex flex-col gap-1.5', containerClassName)}
      >
        <div className="relative">
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-activedescendant={
              isOpen && activeIndex >= 0 ? `${autoId}-option-${activeIndex}` : undefined
            }
            aria-describedby={describedBy}
            aria-invalid={error ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={clsx(
              'flex items-center justify-between w-full bg-surface-1 text-ink border rounded-md',
              'outline-none transition-all duration-150',
              'focus-visible:ring-2 focus-visible:ring-primary-focus/50 focus-visible:border-primary-focus',
              selectSizes[size],
              error ? 'border-semantic-error' : 'border-hairline',
              disabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
          >
            <span className={clsx('truncate', !selectedOption && 'text-transparent')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={clsx(
                'w-4 h-4 text-ink-tertiary transition-transform duration-150',
                isOpen && 'rotate-180',
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {label && (
            <label
              className={clsx(
                'absolute left-3 pointer-events-none',
                'transition-all duration-150 origin-left',
                'bg-surface-1 px-1 text-sm',
                isOpen || selectedOption
                  ? 'top-0 -translate-y-1/2 scale-[0.75] text-primary z-10'
                  : 'top-1/2 -translate-y-1/2 text-ink-tertiary',
                error && (isOpen || selectedOption) && 'text-semantic-error',
                success && (isOpen || selectedOption) && 'text-semantic-success',
              )}
            >
              {label}
              {required && <span className="text-semantic-error ml-0.5">*</span>}
            </label>
          )}
        </div>

        {isOpen && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            className={clsx(
              'absolute top-full left-0 right-0 z-50',
              'bg-surface-2 border border-hairline-strong rounded-md',
              'shadow-lg overflow-auto max-h-60',
              'py-1',
            )}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${autoId}-option-${index}`}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                className={clsx(
                  'px-3 py-2 text-sm cursor-pointer transition-colors',
                  option.value === value && 'bg-primary/20 text-primary',
                  index === activeIndex && 'bg-surface-3',
                  option.disabled && 'opacity-50 cursor-not-allowed',
                  !option.disabled && option.value !== value && 'text-ink hover:bg-surface-3',
                )}
                onClick={() => selectOption(option)}
                onMouseEnter={() => !option.disabled && setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-ink-subtle px-1">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-semantic-error px-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
