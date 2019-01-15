export interface MenuVariables {
  color: string
  backgroundColor: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,
    backgroundColor: siteVars.black,
  }
}
