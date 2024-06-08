import { useCallback, useEffect, useState } from 'react';

const useAsync = (callback, query, debounce, delay) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState([]);

  const callbackMemoized = useCallback(async () => {
    setLoading(true);
    setError(false);
    setValue([]);

    const result = await callback(query);

    if (result && result.length > 0) {
      setValue(result);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [callback, query]);

  useEffect(() => {
    if (query.length >= 2) {
      if (!debounce) {
        callbackMemoized();
        return;
      }

      const timer = setTimeout(() => {
        callbackMemoized();
      }, delay);

      // eslint-disable-next-line consistent-return
      return () => clearTimeout(timer);
    }
  }, [callbackMemoized, query, debounce, delay]);

  return { loading, error, value };
};

export default useAsync;
