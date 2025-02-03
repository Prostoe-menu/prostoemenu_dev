import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useAsync = <T>(callback: (query: string) => Promise<AxiosResponse<T, any>>, query: string, debounce: boolean, delay: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState<AxiosResponse<T, any> | null>(null);

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
    } catch (_) {
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

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [callbackMemoized, query, debounce, delay]);

  return { loading, error, value };
};

export default useAsync;
