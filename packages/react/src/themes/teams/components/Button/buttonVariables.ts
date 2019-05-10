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

    color: siteVars.colors.grey[750],
    colorActive: siteVars.colors.grey[750],
    colorHover: siteVars.colors.grey[750],
    colorFocus: siteVars.colors.grey[750],
    colorDisabled: siteVars.colors.grey[250],
    backgroundColor: siteVars.colors.white,
    backgroundColorActive: siteVars.colors.grey[200],
    backgroundColorHover: siteVars.colors.grey[50],
    backgroundColorFocus: siteVars.colors.grey[200],
    backgroundColorDisabled: siteVars.colors.grey[150],
    borderColor: siteVars.colors.grey[200],
    borderColorActive: siteVars.colors.grey[250],
    borderColorHover: siteVars.colors.grey[250],
    borderColorFocus: siteVars.colors.white,
    borderColorFocusIndicator: siteVars.colors.grey[750],
    borderColorDisabled: 'transparent',
    borderWidth: 1,

    primaryColor: siteVars.colors.white,
    primaryColorActive: siteVars.colors.white,
    primaryColorHover: siteVars.colors.white,
    primaryColorFocus: siteVars.colors.white,
    primaryBackgroundColor: siteVars.colors.brand[600],
    primaryBackgroundColorActive: siteVars.colors.brand[900],
    primaryBackgroundColorHover: siteVars.colors.brand[800],
    primaryBackgroundColorFocus: siteVars.colors.brand[800],
    primaryBorderColor: 'transparent',
    primaryBorderColorActive: 'transparent',
    primaryBorderColorHover: 'transparent',
    primaryBorderColorFocus: siteVars.colors.white,
    primaryBorderColorFocusIndicator: siteVars.colors.grey[750],
    primaryBorderWidth: 1,

    primaryCircularBorderColorFocusIndicator: siteVars.colors.white,

    circularColor: siteVars.colors.grey[500],
    circularColorActive: siteVars.colors.white,
    circularBackgroundColor: 'transparent',
    circularBackgroundColorActive: siteVars.colors.grey[500],
    circularBackgroundColorHover: siteVars.colors.grey[450],
    circularBackgroundColorFocus: siteVars.colors.grey[450],
    circularBorderColor: siteVars.colors.grey[500],
    circularBorderColorActive: 'transparent',
    circularBorderColorHover: 'transparent',
    circularBorderColorFocus: 'transparent',
    circularBorderColorFocusIndicator: siteVars.colors.white,

    textColor: siteVars.colors.brand[600],
    textColorHover: siteVars.colors.brand[800],
    textPrimaryColor: siteVars.colors.brand[600],
    textPrimaryColorHover: siteVars.colors.brand[800],
    textSecondaryColor: siteVars.colors.grey[450],
    textSecondaryColorHover: siteVars.colors.brand[800],

    boxShadow: siteVars.shadowLevel1,
    borderRadiusFocused: pxToRem(3),
  }
}
