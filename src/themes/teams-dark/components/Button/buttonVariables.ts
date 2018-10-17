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

  primaryColor: string
  primaryBackgroundColor: string
  primaryBackgroundColorActive: string
  primaryBackgroundColorHover: string
  primaryBackgroundColorFocus: string
  primaryBorderColor: string
  primaryBorderColorActive: string
  primaryBorderColorHover: string
  primaryBorderColorFocus: string
  primaryBorderColorFocusIndicator: string

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
    colorActive: siteVars.white,
    colorHover: siteVars.white,
    colorFocus: siteVars.white,
    colorDisabled: siteVars.gray06,
    backgroundColor: 'transparent',
    backgroundColorActive: siteVars.gray08,
    backgroundColorHover: siteVars.gray14,
    backgroundColorFocus: siteVars.gray08,
    backgroundColorDisabled: siteVars.gray09,
    borderColor: siteVars.gray08,
    borderColorActive: siteVars.gray06,
    borderColorHover: siteVars.gray06,
    borderColorFocus: siteVars.black,
    borderColorFocusIndicator: siteVars.white,
    borderColorDisabled: 'transparent',

    primaryColor: siteVars.white,
    primaryBackgroundColor: siteVars.brand,
    primaryBackgroundColorActive: siteVars.brand08,
    primaryBackgroundColorHover: siteVars.brand08,
    primaryBackgroundColorFocus: siteVars.brand14,
    primaryBorderColor: 'transparent',
    primaryBorderColorActive: 'transparent',
    primaryBorderColorHover: 'transparent',
    primaryBorderColorFocus: siteVars.black,
    primaryBorderColorFocusIndicator: siteVars.white,

    primaryCircularBorderColorFocusIndicator: siteVars.white,

    circularColor: siteVars.gray02,
    circularColorActive: siteVars.black,
    circularBackgroundColor: 'transparent',
    circularBackgroundColorActive: siteVars.gray02,
    circularBackgroundColorHover: siteVars.gray03,
    circularBackgroundColorFocus: siteVars.gray02,
    circularBorderColor: siteVars.gray02,
    circularBorderColorActive: 'transparent',
    circularBorderColorHover: 'transparent',
    circularBorderColorFocus: 'transparent',
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
