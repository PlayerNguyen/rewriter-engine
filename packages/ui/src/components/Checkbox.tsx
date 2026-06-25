import {
  forwardRef,
  useId,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import clsx from "clsx";

// types & exports

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  error?: string;
}

export interface CheckboxGroupProps {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  children: ReactNode;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  label?: string;
}

// context

const CheckboxGroupContext = createContext<{
  name: string;
  value: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
} | null>(null);

// constants

const checkboxSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

// CheckboxGroup component

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ name, value, onChange, children, disabled, orientation = "vertical", label }, ref) => {
    const handleChange = useCallback(
      (itemValue: string) => {
        const newValue = value.includes(itemValue)
          ? value.filter((v) => v !== itemValue)
          : [...value, itemValue];
        onChange(newValue);
      },
      [value, onChange]
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={clsx(
          "flex gap-3",
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
        )}
      >
        <CheckboxGroupContext.Provider value={{ name, value, onChange: handleChange, disabled }}>
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

// Checkbox component

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate,
      size = "md",
      error,
      className,
      id: idProp,
      disabled,
      value,
      checked,
      defaultChecked,
      onChange,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp || autoId;
    const group = useContext(CheckboxGroupContext);
    const isDisabled = disabled || group?.disabled;
    const isInGroup = !!group;
    const isChecked = group ? group.value.includes(value as string) : checked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (group) {
        group.onChange(value as string);
      } else {
        onChange?.(e);
      }
    };

    const inputProps = isInGroup || checked !== undefined
      ? { checked: isChecked }
      : { defaultChecked };

    return (
      <div className="flex items-start gap-2">
        <div className="relative flex items-center justify-center">
          <input
            ref={(node) => {
              if (node) node.indeterminate = !!indeterminate;
              if (typeof ref === "function") ref(node);
              else if (ref)
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }}
            id={id}
            type="checkbox"
            name={group?.name}
            value={value}
            disabled={isDisabled}
            onChange={handleChange}
            aria-checked={indeterminate ? "mixed" : isChecked}
            aria-invalid={error ? "true" : undefined}
            className={clsx(
              "peer appearance-none border rounded-xs cursor-pointer",
              "transition-colors duration-150",
              "focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
              checkboxSizes[size],
              isChecked || indeterminate
                ? "bg-primary border-primary"
                : "bg-surface-1 border-hairline hover:border-hairline-strong",
              isDisabled && "opacity-50 cursor-not-allowed",
              error && "border-semantic-error",
              className
            )}
            {...inputProps}
            {...rest}
          />
          {(isChecked || indeterminate) && (
            <svg
              className="absolute w-3 h-3 text-white pointer-events-none"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              {indeterminate ? (
                <path d="M2 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          )}
        </div>
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              "text-sm text-ink leading-none cursor-pointer select-none",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
