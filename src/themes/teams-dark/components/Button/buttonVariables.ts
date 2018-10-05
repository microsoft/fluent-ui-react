export interface IButtonVariables {
  [key: string]: string | number

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
    color: siteVars.white,
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
    primaryColorDisabled: 'red',
    primaryBackgroundColor: siteVars.brand,
    primaryBackgroundColorActive: siteVars.brand08,
    primaryBackgroundColorHover: siteVars.brand08,
    primaryBackgroundColorFocus: siteVars.brand14,
    primaryBackgroundColorDisabled: 'red',
    primaryBorderColor: 'transparent',
    primaryBorderColorActive: 'transparent',
    primaryBorderColorHover: 'transparent',
    primaryBorderColorFocus: siteVars.black,
    primaryBorderColorFocusIndicator: siteVars.white,
    primaryBorderColorDisabled: 'transparent',

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
