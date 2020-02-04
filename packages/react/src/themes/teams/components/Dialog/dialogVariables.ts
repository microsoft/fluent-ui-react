import { pxToRem } from '../../../../utils'

export interface DialogVariables {
  rootBackground: string
  rootBorderRadius: string
  rootPadding: string

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

  rootWidth: '90vw',
  rootWidthLarge: '50vw',
  rootWidthLargeBreakpoint: '@media (min-width: 1280px)',
  rootWidthMedium: '75vw',
  rootWidthBreakpointMedium: '@media (min-width: 768px)',

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
