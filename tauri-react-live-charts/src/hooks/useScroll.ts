import { useEffect } from 'react';

export const useScroll = (onScroll: (event: WheelEvent) => void) => {
  useEffect(() => {
    window.addEventListener('wheel', onScroll);
    return () => {
      window.removeEventListener('wheel', onScroll);
    };
  }, [onScroll]);
};
