export default (siteVars: any) => {
  return {
    backgroundColor: siteVars.bodyBackground,
    borderColor: 'white',
    borderBottomColor: siteVars.accessibleYellow,
    fontColor: siteVars.bodyColor,
    iconColor: siteVars.bodyColor,
    inputFocusBorderColor: siteVars.accessibleYellow,
  }
}
