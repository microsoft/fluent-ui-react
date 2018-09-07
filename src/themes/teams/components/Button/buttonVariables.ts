import { pxToRem } from '../../../../lib'

export interface IButtonVariables {
  [key: string]: string | number

  height: string
  minWidth: string
  maxWidth: string
  borderRadius: string
  color: string
  backgroundColor: string
  backgroundColorHover: string
  circularRadius: string
  paddingLeftRightValue: number
  typePrimaryColor: string
  typePrimaryBackgroundColor: string
  typePrimaryBackgroundColorHover: string
  typePrimaryBorderColor: string
  typePrimaryBorderFocusColor: string
  typeSecondaryColor: string
  typeSecondaryBackgroundColor: string
  typeSecondaryBackgroundColorHover: string
  typeSecondaryBorderColor: string
  typeSecondaryBorderFocusColor: string
  typeTextColorHover: string
  typeTextPrimaryColor: string
  typeTextPrimaryColorHover: string
  typeTextSecondaryColor: string
  typeTextSecondaryColorHover: string
}

export default (siteVars: any): IButtonVariables => {
  return {
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    borderRadius: pxToRem(2),
    color: siteVars.black,
    backgroundColor: siteVars.gray08,
    backgroundColorHover: siteVars.gray06,
    circularRadius: pxToRem(999),
    paddingLeftRightValue: 20,
    typePrimaryColor: siteVars.white,
    typePrimaryBackgroundColor: siteVars.brand,
    typePrimaryBackgroundColorHover: siteVars.brand04,
    typePrimaryBorderColor: 'transparent',
    typePrimaryBorderFocusColor: siteVars.white,
    typeSecondaryColor: siteVars.black,
    typeSecondaryBackgroundColor: siteVars.white,
    typeSecondaryBackgroundColorHover: siteVars.gray06,
    typeSecondaryBorderColor: siteVars.gray06,
    typeSecondaryBorderFocusColor: siteVars.black,
    typeTextColorHover: siteVars.brand04,
    typeTextPrimaryColor: siteVars.brand,
    typeTextPrimaryColorHover: siteVars.brand04,
    typeTextSecondaryColor: siteVars.gray03,
    typeTextSecondaryColorHover: siteVars.brand04,
  }
}
