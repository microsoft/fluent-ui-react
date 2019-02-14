export interface TreeTitleVariables {
  defaultColor: string
}

export default (siteVars: any): TreeTitleVariables => {
  return {
    defaultColor: siteVars.colors.grey[900],
  }
}
