export interface MenuVariables {
  color: string
  activeColor: string
  activeBackgroundColor: string
  selectedBackgroundColor: string

  verticalMenuBackgroundColor: string,
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,
    activeColor: siteVars.black,
    activeBackgroundColor: siteVars.accessibleYellow,
    selectedBackgroundColor: siteVars.accessibleCyan,

    verticalMenuBackgroundColor: siteVars.colors.black,
  }
}
