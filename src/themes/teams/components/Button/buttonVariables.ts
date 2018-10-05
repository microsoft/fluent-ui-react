import { pxToRem } from '../../../../lib'

export interface IButtonVariables {
  [key: string]: string | number

  height: string
  minWidth: string
  maxWidth: string
  borderRadius: string
  circularRadius: string
  paddingLeftRightValue: number

  color: string
  colorDisabled: string
  backgroundColor: string
  backgroundColorActive: string
  backgroundColorHover: string
  backgroundColorFocus: string
  backgroundColorDisabled: string
  borderColor: string
  borderColorActive: string
  borderColorHover: string
  borderColorFocus: string
  borderColorFocusIndicator: string
  borderColorDisabled: string

  primaryColor: string
  primaryColorDisabled: string
  primaryBackgroundColor: string
  primaryBackgroundColorActive: string
  primaryBackgroundColorHover: string
  primaryBackgroundColorFocus: string
  primaryBackgroundColorDisabled: string
  primaryBorderColor: string
  primaryBorderColorActive: string
  primaryBorderColorHover: string
  primaryBorderColorFocus: string
  primaryBorderColorFocusIndicator: string
  primaryBorderColorDisabled: string

  secondaryCircularColor: string
  secondaryCircularColorActive: string
  secondaryCircularColorDisabled: string
  secondaryCircularBackgroundColor: string
  secondaryCircularBackgroundColorActive: string
  secondaryCircularBackgroundColorHover: string
  secondaryCircularBackgroundColorFocus: string
  secondaryCircularBackgroundColorDisabled: string
  secondaryCircularBorderColor: string
  secondaryCircularBorderColorActive: string
  secondaryCircularBorderColorHover: string
  secondaryCircularBorderColorFocus: string
  secondaryCircularBorderColorFocusIndicator: string
  secondaryCircularBorderColorDisabled: string

  textColorHover: string
  textPrimaryColor: string
  textPrimaryColorHover: string
  textSecondaryColor: string
  textSecondaryColorHover: string
}

export default (siteVars: any): IButtonVariables => {
  return {
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    borderRadius: pxToRem(2),
    circularRadius: pxToRem(999),
    fontWeight: siteVars.fontWeightSemibold,
    paddingLeftRightValue: 20,

    color: siteVars.black,
    colorDisabled: siteVars.gray06,
    backgroundColor: siteVars.white,
    backgroundColorActive: siteVars.gray08,
    backgroundColorHover: siteVars.gray14,
    backgroundColorFocus: siteVars.gray08,
    backgroundColorDisabled: siteVars.gray09,
    borderColor: siteVars.gray08,
    borderColorActive: siteVars.gray06,
    borderColorHover: siteVars.gray06,
    borderColorFocus: siteVars.white,
    borderColorFocusIndicator: siteVars.black,
    borderColorDisabled: 'transparent',

    primaryColor: siteVars.white,
    primaryColorDisabled: siteVars.white,
    primaryBackgroundColor: siteVars.brand,
    primaryBackgroundColorActive: siteVars.brand02,
    primaryBackgroundColorHover: siteVars.brand04,
    primaryBackgroundColorFocus: siteVars.brand04,
    primaryBackgroundColorDisabled: siteVars.brand04,
    primaryBorderColor: 'transparent',
    primaryBorderColorActive: 'transparent',
    primaryBorderColorHover: 'transparent',
    primaryBorderColorFocus: siteVars.white,
    primaryBorderColorFocusIndicator: siteVars.black,
    primaryBorderColorDisabled: siteVars.white,

    secondaryCircularColor: siteVars.gray02,
    secondaryCircularColorActive: siteVars.white,
    secondaryCircularColorDisabled: siteVars.gray06,
    secondaryCircularBackgroundColor: 'transparent',
    secondaryCircularBackgroundColorActive: siteVars.gray02,
    secondaryCircularBackgroundColorHover: siteVars.gray03,
    secondaryCircularBackgroundColorFocus: siteVars.gray03,
    secondaryCircularBackgroundColorDisabled: 'transparent',
    secondaryCircularBorderColor: siteVars.gray02,
    secondaryCircularBorderColorActive: 'transparent',
    secondaryCircularBorderColorHover: 'transparent',
    secondaryCircularBorderColorFocus: 'transparent',
    secondaryCircularBorderColorFocusIndicator: siteVars.white,
    secondaryCircularBorderColorDisabled: 'transparent',

    textColorHover: siteVars.brand04,
    textPrimaryColor: siteVars.brand,
    textPrimaryColorHover: siteVars.brand04,
    textSecondaryColor: siteVars.gray03,
    textSecondaryColorHover: siteVars.brand04,
  }
}
