import { useEffect, useState } from 'react';

export type WindowSize = {
  width: number;
  height: number;
};

const getWindowSize = (): WindowSize => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
