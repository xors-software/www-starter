
import { lgBreakpoint, mdBreakpoint, smBreakpoint, xlBreakpoint } from '@/constants'
import { useMediaQuery } from 'react-responsive'

export function useBreakpoints() {

  const isMaxSM = useMediaQuery({ query: `(max-width: ${smBreakpoint})` }) // 480
  const isMaxMD = useMediaQuery({ query: `(max-width: ${mdBreakpoint})` }) // 768
  const isMaxLG = useMediaQuery({ query: `(max-width: ${lgBreakpoint})` }) // 976
  const isMaxXL = useMediaQuery({ query: `(max-width: ${xlBreakpoint})` }) // 1440

  const isMinSM = useMediaQuery({ query: `(min-width: ${smBreakpoint})` }) // 480
  const isMinMD = useMediaQuery({ query: `(min-width: ${mdBreakpoint})` }) // 768
  const isMinLG = useMediaQuery({ query: `(min-width: ${lgBreakpoint})` }) // 976
  const isMinXL = useMediaQuery({ query: `(min-width: ${xlBreakpoint})` }) // 1440

  return {
    isMaxSM,
    isMaxMD,
    isMaxLG,
    isMaxXL,
    isMinSM,
    isMinMD,
    isMinLG,
    isMinXL,
    //
    isMobile: isMaxSM || isMaxMD,
    isTablet: isMaxLG,
    isDesktop: isMinXL
  }
}

