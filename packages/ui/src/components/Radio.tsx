import clsx from 'clsx';
import { createContext, forwardRef, type ReactNode, useContext, useId } from 'react';

// types & exports

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  error?: string;
}

// context

const RadioGroupContext = createContext<{
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
} | null>(null);

// constants

const radioSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const dotSizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

// RadioGroup component

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onChange, children, disabled, orientation = 'vertical', label, error }, ref) => {
    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={label}
        aria-invalid={error ? 'true' : undefined}
        className={clsx(
          'flex gap-3',
          orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
        )}
      >
        <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
          {children}
        </RadioGroupContext.Provider>
        {error && (
          <p className="text-xs text-semantic-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

// Radio component

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size = 'md',
      className,
      id: idProp,
      disabled,
      value,
      checked,
      defaultChecked,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp || autoId;
    const group = useContext(RadioGroupContext);
    const isDisabled = disabled || group?.disabled;
    const isInGroup = !!group;
    const isChecked = group ? group.value === value : checked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (group) {
        group.onChange(value as string);
      } else {
        onChange?.(e);
      }
    };

    const inputProps =
      isInGroup || checked !== undefined ? { checked: isChecked } : { defaultChecked };

    return (
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="radio"
            name={group?.name}
            value={value}
            disabled={isDisabled}
            onChange={handleChange}
            className={clsx(
              'peer appearance-none border rounded-full cursor-pointer',
              'transition-colors duration-150',
              'focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
              radioSizes[size],
              isChecked
                ? 'bg-primary border-primary'
                : 'bg-surface-1 border-hairline hover:border-hairline-strong',
              isDisabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
            {...inputProps}
            {...rest}
          />
          {isChecked && (
            <span
              className={clsx('absolute rounded-full bg-white pointer-events-none', dotSizes[size])}
              aria-hidden="true"
            />
          )}
        </div>
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              'text-sm text-ink leading-none cursor-pointer select-none',
              isDisabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Radio.displayName = 'Radio';
