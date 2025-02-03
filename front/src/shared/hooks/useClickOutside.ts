import { MouseEvent, RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>,
  callback: () => void) => {

  const handlerProvider = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handlerProvider as unknown as EventListenerOrEventListenerObject);

    return () => {
      document.removeEventListener('click', handlerProvider as unknown as EventListenerOrEventListenerObject);
    };
  }, []);
};

export default useClickOutside;
