import { useMediaQuery } from './useMediaQuery';

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint() {
  const isSmUp = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
  const isMdUp = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
  const isLgUp = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const isXlUp = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
  const is2xlUp = useMediaQuery(`(min-width: ${breakpoints['2xl']}px)`);

  return {
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    is2xlUp,
    isMobile: !isSmUp,
    isTablet: isSmUp && !isLgUp,
    isDesktop: isLgUp,
  };
}
