import { pxToRem } from '../../../../utils'

export interface DialogVariables {
  rootBackground: string
  rootBorderRadius: string
  rootPadding: string

  rootMaxWidth: string
  rootMinWidth: string

  rootWidth: string
  rootWidthLarge: string
  rootWidthLargeBreakpoint: string
  rootWidthMedium: string
  rootWidthBreakpointMedium: string

  contentMargin: string

  headerMargin: string

  overlayBackground: string
  overlayZIndex: number

  boxShadow: string
  foregroundColor: string

  headerFontSize: string
  headerFontWeight: number

  headerActionMargin: string
}

export default (siteVariables): Partial<DialogVariables> => ({
  rootBackground: siteVariables.colors.white,
  rootBorderRadius: pxToRem(3),

  rootWidth: 'auto',
  rootWidthLarge: 'auto',
  rootWidthLargeBreakpoint: '@media (min-width: 1280px)',
  rootWidthMedium: 'auto',
  rootWidthBreakpointMedium: '@media (min-width: 768px)',

  rootMaxWidth: pxToRem(600),
  rootMinWidth: pxToRem(320),

  rootPadding: `${pxToRem(27)} ${pxToRem(32)} ${pxToRem(20)} ${pxToRem(32)}`,

  contentMargin: `0 0 ${pxToRem(20)} 0`,

  boxShadow: siteVariables.shadowLevel4,
  foregroundColor: siteVariables.colors.grey[900],

  headerFontSize: siteVariables.fontSizes.large,
  headerFontWeight: siteVariables.fontWeightBold,
  headerMargin: `0 0 ${pxToRem(8)} 0`,

  overlayBackground: 'rgba(37, 36, 36, .75)', // todo: update to a palette value when daisy has mapped one
  overlayZIndex: 1000,

  headerActionMargin: `${pxToRem(-3)} ${pxToRem(-8)} 0 0`,
})
