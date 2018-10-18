import { teamsPxToRem } from '../../utils'

export default (siteVars: any) => {
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
