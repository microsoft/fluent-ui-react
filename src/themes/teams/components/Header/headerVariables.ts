export interface HeaderVariables {
  color: string
  descriptionColor: string
}

export default (siteVars: any): HeaderVariables => {
  return {
    color: siteVars.black,
    descriptionColor: undefined,
  }
}
