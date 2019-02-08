export default (siteVars: any) => {
  return {
    labelColorDefault: siteVars.brand,
    labelColorChecked: siteVars.white,

    iconColorBorderDefault: siteVars.white,
    iconColorBorderChecked: siteVars.accessibleCyan,

    iconcolorBackgroundDefault: siteVars.white,
    iconColorBackgroundChecked: siteVars.accessibleCyan,
    iconColorBoxShadowFocus: siteVars.accessibleYellow,

    colorDisabled: siteVars.gray06,
  }
}
