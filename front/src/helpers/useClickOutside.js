import { useEffect, useRef } from 'react';

const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const handlerProvider = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', handlerProvider);

    return () => {
      document.removeEventListener('mousedown', handlerProvider);
    };
  });

  return domNode;
};

export default useClickOutside;
