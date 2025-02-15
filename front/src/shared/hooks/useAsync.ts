import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

const useAsync = <T>(
  callback: (query: string) => Promise<AxiosResponse<T>>,
  query: string,
  debounce: boolean,
  delay: number
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState<AxiosResponse<T> | null>(null);

  const callbackMemoized = useCallback(async () => {
    try {
      const result = await callback(query);

      if (result) {
        setValue(result);
        setError(false);
      } else {
        setValue(null);
        setError(true);
      }
    } catch (error) {
      console.log('useAsinc error: ', error);
      setValue(null);
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

    return () => clearTimeout(timer);
  }, [callbackMemoized, query, debounce, delay]);

  return { loading, error, value };
};

export default useAsync;
