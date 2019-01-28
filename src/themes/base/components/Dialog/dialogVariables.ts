import { pxToRem } from '../../../../lib'

export interface DialogVariables {
  rootBackground: string
  rootBorderRadius: string
  rootPadding: string
  rootWidth: string

  contentMargin: string

  headerFontSize: string
  headerFontWeight: number
  headerMargin: string

  overlayBackground: string
  overlayZIndex: number
}

export default (siteVariables): DialogVariables => ({
  rootBackground: siteVariables.colors.white,
  rootBorderRadius: pxToRem(3),
  rootPadding: pxToRem(24),
  rootWidth: '50vw',

  contentMargin: `0 0 ${pxToRem(20)} 0`,

  headerFontSize: pxToRem(20),
  headerFontWeight: 700,
  headerMargin: `0 0 ${pxToRem(20)} 0`,

  overlayBackground: 'rgba(0,0,0,.33)',
  overlayZIndex: 1000,
})
