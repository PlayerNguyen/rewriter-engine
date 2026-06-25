import { forwardRef, useState, useId } from "react";
import clsx from "clsx";

// types & exports

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

// constants

const inputSizes = {
  sm: "h-8 text-xs px-2.5",
  md: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
};

const labelSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

// component

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      size = "md",
      leftIcon,
      rightIcon,
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
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp || autoId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value || !!defaultValue);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };

    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(" ") || undefined;

    const floating = focused || hasValue || !!placeholder;

    return (
      <div className={clsx("relative flex flex-col gap-1.5", containerClassName)}>
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            type="text"
            value={value}
            defaultValue={defaultValue}
            placeholder={focused ? placeholder : " "}
            disabled={disabled}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={error ? "true" : undefined}
            aria-required={required ? "true" : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              rest.onChange?.(e);
            }}
            className={clsx(
              "peer w-full bg-surface-1 text-ink border rounded-md",
              "outline-none transition-all duration-150",
              "placeholder:text-transparent",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              inputSizes[size],
              error
                ? "border-semantic-error focus:ring-2 focus:ring-semantic-error/50"
                : success
                ? "border-semantic-success focus:ring-2 focus:ring-semantic-success/50"
                : "border-hairline focus:ring-2 focus:ring-primary-focus/50 focus:border-primary-focus",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            {...rest}
          />
          <label
            htmlFor={id}
            className={clsx(
              "absolute left-3 pointer-events-none",
              "transition-all duration-150 origin-left",
              "bg-surface-1 px-1",
              labelSizes[size],
              floating
                ? "top-0 -translate-y-1/2 scale-[0.75] text-primary z-10"
                : "top-1/2 -translate-y-1/2",
              error && floating && "text-semantic-error",
              success && floating && "text-semantic-success",
              !floating && "text-ink-tertiary",
              leftIcon && floating && "left-3",
              leftIcon && !floating && "left-10"
            )}
          >
            {label}
            {required && <span className="text-semantic-error ml-0.5">*</span>}
          </label>
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
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
  }
);

TextInput.displayName = "TextInput";
