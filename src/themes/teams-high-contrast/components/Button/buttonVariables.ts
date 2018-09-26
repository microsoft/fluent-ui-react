export interface IButtonVariables {
  [key: string]: string | number

  color: string
  backgroundColor: string
  backgroundColorHover: string
  typePrimaryColor: string
  typePrimaryBackgroundColor: string
  typePrimaryBackgroundColorHover: string
  typeSecondaryColor: string
  typeSecondaryBackgroundColor: string
  typeSecondaryBackgroundColorHover: string
}

export default (siteVars: any): IButtonVariables => {
  return {
    color: siteVars.white,
    backgroundColor: siteVars.black,
    backgroundColorHover: siteVars.yellow,
    typePrimaryColor: siteVars.white,
    typePrimaryBackgroundColor: siteVars.black,
    typePrimaryBackgroundColorHover: siteVars.yellow,
    typeSecondaryColor: siteVars.white,
    typeSecondaryBackgroundColor: siteVars.black,
    typeSecondaryBackgroundColorHover: siteVars.yellow,
  }
}
