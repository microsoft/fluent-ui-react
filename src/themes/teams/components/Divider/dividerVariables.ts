import { pxToRem } from '../../../../lib'
import { ColorPalette } from '../../../types'

export interface DividerVariables {
  colors: Partial<ColorPalette>
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  importantFontWeight: string
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => ({
  colors: siteVars.colors,
  dividerColor: siteVars.gray09,
  textColor: siteVars.gray03,
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),
})
