import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import { forwardRef, useCallback, useId } from 'react';

export interface CommandInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ value, onChange, placeholder = 'Search...', className, disabled }, ref) => {
    const autoId = useId();
    const inputId = `command-input-${autoId}`;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    const handleClear = useCallback(() => {
      onChange('');
    }, [onChange]);

    return (
      <div className={clsx('relative', className)}>
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
        <input
          ref={ref}
          id={inputId}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'w-full h-8 pl-8 pr-8 text-sm bg-surface-2 text-ink border border-hairline rounded-md',
            'outline-none transition-all duration-150',
            'placeholder:text-ink-tertiary',
            'focus:ring-2 focus:ring-primary-focus/50 focus:border-primary-focus',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  },
);

CommandInput.displayName = 'CommandInput';
