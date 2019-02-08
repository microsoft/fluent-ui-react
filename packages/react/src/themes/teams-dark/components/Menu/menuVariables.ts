export interface MenuVariables {
  color: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,
  }
}
