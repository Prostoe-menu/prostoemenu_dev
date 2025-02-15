import { MouseEvent, useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlerProvider = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        callback();
      }
    };

    document.addEventListener(
      'click',
      handlerProvider as unknown as EventListenerOrEventListenerObject
    );

    return () => {
      document.removeEventListener(
        'click',
        handlerProvider as unknown as EventListenerOrEventListenerObject
      );
    };
  }, [callback, ref]);

  return ref;
};

export default useClickOutside;
