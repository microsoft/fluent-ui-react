import { pxToRem } from '../../../../lib'

export default (siteVars: any) => {
  return {
    backgroundColor: siteVars.bodyBackground,
    border: `${pxToRem(1)} solid ${siteVars.bodyColor}`,
    boxShadow: `0 ${pxToRem(1)} 0 ${siteVars.accessibleYellow}`,
    fontColor: siteVars.bodyColor,
    iconColor: siteVars.bodyColor,
    inputFocusBorderBottomColor: siteVars.accessibleYellow,
  }
}
