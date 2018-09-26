import { pxToRem } from '../../../../lib'

export interface IButtonVariables {
  [key: string]: string | number

  color: string
  backgroundColor: string
  backgroundColorHover: string
  typePrimaryColor: string
  typePrimaryBackgroundColor: string
  typePrimaryBackgroundColorActive: string
  typePrimaryBackgroundColorHover: string
  typePrimaryBorderColor: string
  typePrimaryBorderColorFocus: string
  typePrimaryBorderColorInsetFocus: string
  typeSecondaryColor: string
  typeSecondaryBackgroundColor: string
  typeSecondaryBackgroundColorActive: string
  typeSecondaryBackgroundColorHover: string
  typeSecondaryBackgroundColorFocus: string
  typeSecondaryBorderColor: string
  typeSecondaryBorderColorActive: string
  typeSecondaryBorderColorHover: string
  typeSecondaryBorderColorFocus: string
  typeSecondaryBorderColorInsetFocus: string
  typeDisabledButtonColor: string
  typeDisabledButtonBackgroundColor: string
  typeTextColorHover: string
  typeTextPrimaryColor: string
  typeTextPrimaryColorHover: string
  typeTextSecondaryColor: string
  typeTextSecondaryColorHover: string
}

export default (siteVars: any): IButtonVariables => {
  return {
    color: siteVars.black,
    backgroundColor: siteVars.gray08,
    backgroundColorHover: siteVars.gray06,
    typePrimaryColor: siteVars.white,
    typePrimaryBackgroundColor: siteVars.brand,
    typePrimaryBackgroundColorActive: siteVars.brand02,
    typePrimaryBackgroundColorHover: siteVars.brand04,
    typePrimaryBackgroundColorFocus: siteVars.brand04,
    typePrimaryBorderColor: 'transparent',
    typePrimaryBorderColorFocus: siteVars.black,
    typePrimaryBorderColorInsetFocus: siteVars.white,
    typeSecondaryColor: siteVars.white,
    typeSecondaryBackgroundColor: siteVars.black,
    typeSecondaryBackgroundColorActive: siteVars.gray08,
    typeSecondaryBackgroundColorHover: siteVars.brand04,
    typeSecondaryBackgroundColorFocus: siteVars.gray08,
    typeSecondaryBorderColor: siteVars.white,
    typeSecondaryBorderColorActive: siteVars.gray06,
    typeSecondaryBorderColorHover: siteVars.gray06,
    typeSecondaryBorderColorFocus: siteVars.black,
    typeSecondaryBorderColorInsetFocus: siteVars.white,
    typeDisabledButtonColor: siteVars.gray08,
    typeDisabledButtonBackgroundColor: siteVars.gray09,
    typeTextColorHover: siteVars.brand04,
    typeTextPrimaryColor: siteVars.brand,
    typeTextPrimaryColorHover: siteVars.brand04,
    typeTextSecondaryColor: siteVars.gray03,
    typeTextSecondaryColorHover: siteVars.brand04,
  }
}
