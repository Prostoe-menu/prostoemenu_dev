import { useCallback, useRef } from 'react';

export const useDebounce = (func, delay) => {
  const inDebounce = useRef();

  const debounce = useCallback(
    function (...args) {
      clearTimeout(inDebounce.current);

      inDebounce.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );

  return debounce;
};
