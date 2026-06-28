import { useEffect, useState } from 'react';

/**
 * Returns a debounced version of the given value. The returned value only
 * updates after `delay` milliseconds of inactivity on the source value.
 *
 * @typeParam T - The type of the value to debounce.
 * @param value - The source value to debounce.
 * @param delay - Debounce delay in milliseconds.
 * @returns The debounced value.
 *
 * @example
 * const debouncedSearch = useDebounce(searchInput, 300);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
