import { pxToRem } from '../../../../lib'

export default (siteVars: any) => {
  return {
    backgroundColor: siteVars.bodyBackground,
    border: `${pxToRem(1)} solid ${siteVars.bodyColor}`,
    borderBottom: `${pxToRem(2)} solid ${siteVars.accessibleYellow}`,
    fontColor: siteVars.bodyColor,
    iconColor: siteVars.bodyColor,
  }
}
