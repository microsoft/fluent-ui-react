export interface IButtonVariables {
  [key: string]: string | number

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
}

export default (siteVars: any): IButtonVariables => {
  return {
    color: siteVars.white,
    colorActive: siteVars.black,
    colorHover: siteVars.black,
    colorFocus: siteVars.black,
    colorDisabled: siteVars.black,
    backgroundColor: 'transparent',
    backgroundColorActive: siteVars.accessibleYellow,
    backgroundColorHover: siteVars.accessibleYellow,
    backgroundColorFocus: siteVars.accessibleYellow,
    backgroundColorDisabled: siteVars.accessibleGreen,
    borderColor: siteVars.white,
    borderColorActive: 'transparent',
    borderColorHover: 'transparent',
    borderColorFocus: siteVars.black,
    borderColorFocusIndicator: siteVars.white,
    borderColorDisabled: 'transparent',
    borderWidth: 1,

    primaryColor: siteVars.white,
    primaryColorActive: siteVars.black,
    primaryColorHover: siteVars.black,
    primaryColorFocus: siteVars.black,
    primaryBackgroundColor: siteVars.black,
    primaryBackgroundColorActive: siteVars.accessibleYellow,
    primaryBackgroundColorHover: siteVars.accessibleYellow,
    primaryBackgroundColorFocus: siteVars.accessibleYellow,
    primaryBorderColor: siteVars.white,
    primaryBorderColorActive: 'transparent',
    primaryBorderColorHover: 'transparent',
    primaryBorderColorFocus: siteVars.black,
    primaryBorderColorFocusIndicator: siteVars.white,
    primaryBorderWidth: 2,

    primaryCircularBorderColorFocusIndicator: siteVars.white,

    circularColor: siteVars.white,
    circularColorActive: siteVars.black,
    circularBackgroundColor: siteVars.black,
    circularBackgroundColorActive: siteVars.accessibleYellow,
    circularBackgroundColorHover: siteVars.accessibleYellow,
    circularBackgroundColorFocus: siteVars.accessibleYellow,
    circularBorderColor: siteVars.white,
    circularBorderColorActive: siteVars.white,
    circularBorderColorHover: siteVars.white,
    circularBorderColorFocus: siteVars.white,
    circularBorderColorFocusIndicator: siteVars.black,

    textColor: siteVars.brand,
    textColorHover: siteVars.brand04,
    textPrimaryColor: siteVars.brand,
    textPrimaryColorHover: siteVars.brand04,
    textSecondaryColor: siteVars.gray03,
    textSecondaryColorHover: siteVars.brand04,

    boxShadow: siteVars.shadowLevel1,
  }
}
