export default (siteVars: any, props, pxToRem) => {
  return {
    backgroundColor: siteVars.bodyBackground,
    border: `${pxToRem(1)} solid ${siteVars.bodyColor}`,
    boxShadow: `0 ${pxToRem(1)} 0 ${siteVars.accessibleYellow}`,
    fontColor: siteVars.bodyColor,
    iconColor: siteVars.bodyColor,
    inputFocusBorderBottomColor: siteVars.accessibleYellow,
  }
}
