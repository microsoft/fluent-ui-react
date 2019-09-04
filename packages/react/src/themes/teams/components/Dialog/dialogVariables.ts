import { DialogVariables as BaseDialogVariables } from '../../../base/components/Dialog/dialogVariables'
import { pxToRem } from '../../../../lib'

export interface DialogVariables extends BaseDialogVariables {
  boxShadow: string
  foregroundColor: string

  headerFontSize: string
  headerFontWeight: number

  headerActionMargin: string
}

export default (siteVariables): Partial<DialogVariables> => ({
  boxShadow: siteVariables.shadowLevel4,
  foregroundColor: siteVariables.colors.grey[900],

  rootPadding: `${pxToRem(27)} ${pxToRem(32)} ${pxToRem(20)} ${pxToRem(32)}`,

  headerFontSize: siteVariables.fontSizes.large,
  headerFontWeight: siteVariables.fontWeightBold,
  headerMargin: `0 0 ${pxToRem(8)} 0`,

  overlayBackground: 'rgba(37, 36, 36, .75)', // todo: update to a palette value when daisy has mapped one

  headerActionMargin: `${pxToRem(-3)} ${pxToRem(-8)} 0 0`,
})
