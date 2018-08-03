export interface IDividerVariables {
  [key: string]: string | number

  defaultColor: string
  defaultBackgroundColor: string
  typePrimaryColor: string
  typePrimaryBackgroundColor: string
  typeSecondaryColor: string
  typeSecondaryBackgroundColor: string
}

export default (siteVars: any): IDividerVariables => {
  return {
    defaultColor: siteVars.gray04,
    defaultBackgroundColor: siteVars.gray12,
    typePrimaryColor: siteVars.brand,
    typePrimaryBackgroundColor: siteVars.brand,
    typeSecondaryColor: siteVars.gray02,
    typeSecondaryBackgroundColor: siteVars.gray10,
  }
}
