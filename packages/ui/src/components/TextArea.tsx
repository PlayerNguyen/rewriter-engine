import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';

// types & exports

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: 'sm' | 'md' | 'lg';
  autoResize?: boolean;
  maxLength?: number;
  showCount?: boolean;
  containerClassName?: string;
}

// constants

const textAreaSizes = {
  sm: 'text-xs px-2.5 py-1.5',
  md: 'text-sm px-3 py-2',
  lg: 'text-base px-4 py-3',
};

// component

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      size = 'md',
      autoResize = false,
      maxLength,
      showCount = false,
      containerClassName,
      className,
      id: idProp,
      onFocus,
      onBlur,
      value,
      defaultValue,
      placeholder,
      disabled,
      required,
      rows = 4,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp || autoId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const [focused, setFocused] = useState(false);
    const [charCount, setCharCount] = useState(
      (typeof value === 'string' ? value : typeof defaultValue === 'string' ? defaultValue : '')
        .length,
    );

    const resize = useCallback(() => {
      if (!autoResize || !internalRef.current) return;
      internalRef.current.style.height = 'auto';
      internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
    }, [autoResize]);

    useEffect(() => {
      resize();
    }, [resize]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      resize();
      onChange?.(e);
    };

    const describedBy =
      [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined;

    const floating = focused || !!placeholder;

    return (
      <div className={clsx('relative flex flex-col gap-1.5', containerClassName)}>
        <div className="relative">
          <textarea
            ref={(node) => {
              (internalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref)
                (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            }}
            id={id}
            rows={rows}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            placeholder={focused ? placeholder : ' '}
            disabled={disabled}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={error ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={clsx(
              'peer w-full bg-surface-1 text-ink border rounded-md resize-y',
              'outline-none transition-all duration-150',
              'placeholder:text-transparent',
              textAreaSizes[size],
              error
                ? 'border-semantic-error focus:ring-2 focus:ring-semantic-error/50'
                : success
                  ? 'border-semantic-success focus:ring-2 focus:ring-semantic-success/50'
                  : 'border-hairline focus:ring-2 focus:ring-primary-focus/50 focus:border-primary-focus',
              autoResize && 'resize-none overflow-hidden',
              disabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
            {...rest}
          />
          <label
            htmlFor={id}
            className={clsx(
              'absolute left-3 pointer-events-none',
              'transition-all duration-150 origin-left',
              'bg-surface-1 px-1 text-sm',
              floating ? 'top-0 -translate-y-1/2 scale-[0.75] text-primary z-10' : 'top-3',
              error && floating && 'text-semantic-error',
              success && floating && 'text-semantic-success',
              !floating && 'text-ink-tertiary',
            )}
          >
            {label}
            {required && <span className="text-semantic-error ml-0.5">*</span>}
          </label>
        </div>
        <div className="flex items-center justify-between px-1">
          {helperText && !error && (
            <p id={helperId} className="text-xs text-ink-subtle">
              {helperText}
            </p>
          )}
          {error && (
            <p id={errorId} className="text-xs text-semantic-error" role="alert">
              {error}
            </p>
          )}
          {(showCount || maxLength) && (
            <span
              className={clsx(
                'text-xs ml-auto',
                maxLength && charCount > maxLength ? 'text-semantic-error' : 'text-ink-tertiary',
              )}
            >
              {charCount}
              {maxLength ? `/${maxLength}` : ''}
            </span>
          )}
        </div>
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
