import { pxToRem } from '../../../../lib'

export interface IButtonVariables {
  [key: string]: string | number

  height: string
  minWidth: string
  maxWidth: string
  color: string
  backgroundColor: string
  backgroundColorHover: string
  circularRadius: string
  paddingLeftRightValue: number
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
}

export default (siteVars: any): IButtonVariables => {
  return {
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    color: siteVars.black,
    backgroundColor: siteVars.gray08,
    backgroundColorHover: siteVars.gray06,
    circularRadius: pxToRem(999),
    paddingLeftRightValue: 20,
    typePrimaryColor: siteVars.white,
    typePrimaryBackgroundColor: siteVars.brand,
    typePrimaryBackgroundColorActive: siteVars.brand02,
    typePrimaryBackgroundColorHover: siteVars.brand04,
    typePrimaryBackgroundColorFocus: siteVars.brand04,
    typePrimaryBorderColor: 'transparent',
    typePrimaryBorderColorFocus: siteVars.black,
    typePrimaryBorderColorInsetFocus: siteVars.white,
    typeSecondaryColor: siteVars.black,
    typeSecondaryBackgroundColor: siteVars.white,
    typeSecondaryBackgroundColorActive: siteVars.gray08,
    typeSecondaryBackgroundColorHover: siteVars.gray09,
    typeSecondaryBackgroundColorFocus: siteVars.gray08,
    typeSecondaryBorderColor: siteVars.gray08,
    typeSecondaryBorderColorActive: siteVars.gray06,
    typeSecondaryBorderColorHover: siteVars.gray06,
    typeSecondaryBorderColorFocus: siteVars.black,
    typeSecondaryBorderColorInsetFocus: siteVars.white,
    typeDisabledButtonColor: siteVars.gray08,
    typeDisabledButtonBackgroundColor: siteVars.gray09,
  }
}
