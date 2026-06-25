import { forwardRef, type ReactNode } from "react";
import clsx from "clsx";

// types & exports

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "inverse" | "ghost" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

// constants

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    "bg-primary text-white",
    "hover:bg-primary-hover",
    "focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "active:bg-primary-focus",
    "disabled:bg-primary/50 disabled:text-white/50"
  ),
  secondary: clsx(
    "bg-surface-1 text-ink border border-hairline",
    "hover:bg-surface-2",
    "focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "active:bg-surface-3",
    "disabled:bg-surface-1/50 disabled:text-ink-tertiary disabled:border-hairline/50"
  ),
  tertiary: clsx(
    "bg-transparent text-ink",
    "hover:bg-surface-1",
    "focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "active:bg-surface-2",
    "disabled:text-ink-tertiary"
  ),
  inverse: clsx(
    "bg-inverse-canvas text-inverse-ink",
    "hover:opacity-90",
    "focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-canvas",
    "active:opacity-80",
    "disabled:bg-inverse-canvas/50 disabled:text-inverse-ink/50"
  ),
  ghost: clsx(
    "bg-transparent text-ink-subtle",
    "hover:text-ink hover:bg-surface-1",
    "focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "active:bg-surface-2",
    "disabled:text-ink-tertiary"
  ),
  danger: clsx(
    "bg-semantic-error text-white",
    "hover:bg-semantic-error/90",
    "focus-visible:ring-2 focus-visible:ring-semantic-error focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "active:bg-semantic-error/80",
    "disabled:bg-semantic-error/50 disabled:text-white/50"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-7 px-2 text-xs gap-1",
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-3.5 text-button gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

// component

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      disabled,
      icon,
      iconPosition = "left",
      fullWidth,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center",
          "rounded-md font-medium",
          "transition-colors duration-150",
          "outline-none select-none",
          "disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {loading && (
          <svg
            className={clsx("animate-spin", size === "xs" ? "h-3 w-3" : "h-4 w-4")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0" aria-hidden="true">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0" aria-hidden="true">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
