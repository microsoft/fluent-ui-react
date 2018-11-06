import { teamsPxToRem } from '../../utils'

export interface DividerVariables {
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
    dividerColor: siteVars.gray09,
    textColor: siteVars.gray03,
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    primaryColor: siteVars.brand,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: teamsPxToRem(4),
  }
}
