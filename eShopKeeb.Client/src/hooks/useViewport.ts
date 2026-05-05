import { useMemo } from 'react';
import { useWindowSize } from './useWindowSize';

export function useViewport() {
  const { width, height } = useWindowSize();

  return useMemo(
    () => ({
      width,
      height,
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
      isSmUp: width >= 640,
      isMdUp: width >= 768,
      isLgUp: width >= 1024,
      isXlUp: width >= 1280,
      is2xlUp: width >= 1536,
    }),
    [width, height]
  );
}
