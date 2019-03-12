import { pxToRem } from '../../../../lib'

export interface ButtonVariables {
  [key: string]: string | number

  height: string
  minWidth: string
  maxWidth: string
  borderRadius: string
  circularRadius: string
  paddingLeftRightValue: number
  contentFontWeight: string

  color: string
  colorActive: string
  colorHover: string
  colorFocus: string
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
  borderWidth: number

  primaryColor: string
  primaryColorActive: string
  primaryColorHover: string
  primaryColorFocus: string
  primaryBackgroundColor: string
  primaryBackgroundColorActive: string
  primaryBackgroundColorHover: string
  primaryBackgroundColorFocus: string
  primaryBorderColor: string
  primaryBorderColorActive: string
  primaryBorderColorHover: string
  primaryBorderColorFocus: string
  primaryBorderColorFocusIndicator: string
  primaryBorderWidth: number

  primaryCircularBorderColorFocusIndicator: string

  circularColor: string
  circularColorActive: string
  circularBackgroundColor: string
  circularBackgroundColorActive: string
  circularBackgroundColorHover: string
  circularBackgroundColorFocus: string
  circularBorderColor: string
  circularBorderColorActive: string
  circularBorderColorHover: string
  circularBorderColorFocus: string
  circularBorderColorFocusIndicator: string

  textColor: string
  textColorHover: string
  textPrimaryColor: string
  textPrimaryColorHover: string
  textSecondaryColor: string
  textSecondaryColorHover: string

  boxShadow: string
  borderRadiusFocused: string
}

export default (siteVars: any): ButtonVariables => {
  return {
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    borderRadius: pxToRem(2),
    circularRadius: pxToRem(999),
    contentFontWeight: siteVars.fontWeightSemibold,
    paddingLeftRightValue: 20,

    color: siteVars.colors.grey[900],
    colorActive: siteVars.colors.grey[900],
    colorHover: siteVars.colors.grey[900],
    colorFocus: siteVars.colors.grey[900],
    colorDisabled: siteVars.colors.grey.light06,
    backgroundColor: siteVars.colors.white,
    backgroundColorActive: siteVars.colors.grey.light08,
    backgroundColorHover: siteVars.colors.grey.light14,
    backgroundColorFocus: siteVars.colors.grey.light08,
    backgroundColorDisabled: siteVars.colors.grey.light09,
    borderColor: siteVars.colors.grey.light08,
    borderColorActive: siteVars.colors.grey.light06,
    borderColorHover: siteVars.colors.grey.light06,
    borderColorFocus: siteVars.colors.white,
    borderColorFocusIndicator: siteVars.colors.grey[900],
    borderColorDisabled: 'transparent',
    borderWidth: 1,

    primaryColor: siteVars.colors.white,
    primaryColorActive: siteVars.colors.white,
    primaryColorHover: siteVars.colors.white,
    primaryColorFocus: siteVars.colors.white,
    primaryBackgroundColor: siteVars.colors.primary[500],
    primaryBackgroundColorActive: siteVars.colors.primary[900],
    primaryBackgroundColorHover: siteVars.brand04,
    primaryBackgroundColorFocus: siteVars.brand04,
    primaryBorderColor: 'transparent',
    primaryBorderColorActive: 'transparent',
    primaryBorderColorHover: 'transparent',
    primaryBorderColorFocus: siteVars.colors.white,
    primaryBorderColorFocusIndicator: siteVars.colors.grey[900],
    primaryBorderWidth: 1,

    primaryCircularBorderColorFocusIndicator: siteVars.colors.white,

    circularColor: siteVars.colors.grey.light02,
    circularColorActive: siteVars.colors.white,
    circularBackgroundColor: 'transparent',
    circularBackgroundColorActive: siteVars.colors.grey.light02,
    circularBackgroundColorHover: siteVars.colors.grey.light03,
    circularBackgroundColorFocus: siteVars.colors.grey.light03,
    circularBorderColor: siteVars.colors.grey.light02,
    circularBorderColorActive: 'transparent',
    circularBorderColorHover: 'transparent',
    circularBorderColorFocus: 'transparent',
    circularBorderColorFocusIndicator: siteVars.colors.white,

    textColor: siteVars.colors.primary[500],
    textColorHover: siteVars.brand04,
    textPrimaryColor: siteVars.colors.primary[500],
    textPrimaryColorHover: siteVars.brand04,
    textSecondaryColor: siteVars.colors.grey.light03,
    textSecondaryColorHover: siteVars.brand04,

    boxShadow: siteVars.shadowLevel1,
    borderRadiusFocused: pxToRem(3),
  }
}
