import { useCallback, useEffect, useState } from 'react';

const useAsync = (callback, query, debounce, delay) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState([]);

  const callbackMemoized = useCallback(async () => {
    try {
      const result = await callback(query);

      if (result) {
        setValue(result);
        setError(false);
      } else {
        setValue([]);
        setError(true);
      }
    } catch (error) {
      console.log('ERROR: ', error);

      setValue([]);
      setError(true);
    }

    setLoading(false);
  }, [callback, query]);

  useEffect(() => {
    setLoading(true);

    if (!debounce) {
      callbackMemoized();
      return;
    }

    const timer = setTimeout(() => {
      callbackMemoized();
    }, delay);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [callbackMemoized, query, debounce, delay]);

  return { loading, error, value };
};

export default useAsync;
