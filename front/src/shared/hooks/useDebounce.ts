import { useRef } from 'react';

/**
 * Custom hook to debounce a function call.
 *
 * @param func - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns A debounced version of the function.
 */

export const useDebounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  const timerRef = useRef<number | null>(null);

  return (...args: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => func(...args), delay);
    }
  };
};
