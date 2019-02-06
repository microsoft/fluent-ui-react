export interface MenuVariables {
  color: string
  activeColor: string
  activeBackgroundColor: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,
    activeColor: siteVars.black,
    activeBackgroundColor: siteVars.accessibleYellow,
  }
}
