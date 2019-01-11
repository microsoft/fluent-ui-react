export interface MenuVariables {
  color: string

  primaryActiveColor: string
  primaryFocusedColor: string

  backgroundColor: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,

    primaryActiveColor: siteVars.black,
    primaryFocusedColor: siteVars.black,

    backgroundColor: siteVars.black,
  }
}
