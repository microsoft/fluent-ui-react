import { pxToRem } from '../../../../lib'

export default (siteVars: any) => {
  return {
    backgroundColor: siteVars.bodyBackground,
    borderStyle: `${pxToRem(1)} solid ${siteVars.bodyColor}`,
    fontColor: siteVars.bodyColor,
    inputFocusBorderColor: siteVars.accessibleYellow,
    iconColor: siteVars.bodyColor,
  }
}
