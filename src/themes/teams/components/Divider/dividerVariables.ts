import { pxToRem } from '../../utils'
import { EmphasisColors, NaturalColors } from '../../../types'

export interface DividerVariables {
  colors: EmphasisColors & NaturalColors
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  primaryColor: string
  importantFontWeight: string
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => {
  return {
    colors: { ...siteVars.emphasisColors, ...siteVars.naturalColors },
    dividerColor: siteVars.gray09,
    textColor: siteVars.gray03,
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    primaryColor: siteVars.brand,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: pxToRem(4),
  }
}
