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
  primaryBackgroundColor: string
  primaryBackgroundColorActive: string
  primaryBackgroundColorHover: string
  primaryBackgroundColorFocus: string
  primaryBorderColor: string
  primaryBorderColorActive: string
  primaryBorderColorHover: string
  primaryBorderColorFocus: string
  primaryBorderColorFocusIndicator: string

  secondaryTintedColor: string
  secondaryTintedColorActive: string
  secondaryTintedColorHover: string
  secondaryTintedColorFocus: string
  secondaryTintedBackgroundColor: string
  secondaryTintedBackgroundColorActive: string
  secondaryTintedBackgroundColorHover: string
  secondaryTintedBackgroundColorFocus: string
  secondaryTintedBorderColor: string
  secondaryTintedBorderColorActive: string
  secondaryTintedBorderColorHover: string
  secondaryTintedBorderColorFocus: string
  secondaryTintedBorderColorFocusIndicator: string

  primaryCircularBorderColorFocusIndicator: string

  secondaryCircularColor: string
  secondaryCircularColorActive: string
  secondaryCircularBackgroundColor: string
  secondaryCircularBackgroundColorActive: string
  secondaryCircularBackgroundColorHover: string
  secondaryCircularBackgroundColorFocus: string
  secondaryCircularBorderColor: string
  secondaryCircularBorderColorActive: string
  secondaryCircularBorderColorHover: string
  secondaryCircularBorderColorFocus: string
  secondaryCircularBorderColorFocusIndicator: string

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

    secondaryTintedColor: siteVars.brand06,
    secondaryTintedColorActive: siteVars.brand04,
    secondaryTintedColorHover: siteVars.brand04,
    secondaryTintedColorFocus: siteVars.brand02,
    secondaryTintedBackgroundColor: siteVars.black,
    secondaryTintedBackgroundColorActive: siteVars.brand14,
    secondaryTintedBackgroundColorHover: siteVars.brand16,
    secondaryTintedBackgroundColorFocus: siteVars.brand14,
    secondaryTintedBorderColor: siteVars.brand14,
    secondaryTintedBorderColorActive: siteVars.brand12,
    secondaryTintedBorderColorHover: siteVars.brand12,
    secondaryTintedBorderColorFocus: siteVars.black,
    secondaryTintedBorderColorFocusIndicator: siteVars.brand02,

    primaryCircularBorderColorFocusIndicator: siteVars.white,

    secondaryCircularColor: siteVars.gray02,
    secondaryCircularColorActive: siteVars.black,
    secondaryCircularBackgroundColor: 'transparent',
    secondaryCircularBackgroundColorActive: siteVars.gray02,
    secondaryCircularBackgroundColorHover: siteVars.gray03,
    secondaryCircularBackgroundColorFocus: siteVars.gray02,
    secondaryCircularBorderColor: siteVars.gray02,
    secondaryCircularBorderColorActive: 'transparent',
    secondaryCircularBorderColorHover: 'transparent',
    secondaryCircularBorderColorFocus: 'transparent',
    secondaryCircularBorderColorFocusIndicator: siteVars.black,

    textColorHover: siteVars.brand04,
    textPrimaryColor: siteVars.brand,
    textPrimaryColorHover: siteVars.brand04,
    textSecondaryColor: siteVars.gray03,
    textSecondaryColorHover: siteVars.brand04,

    boxShadow: siteVars.shadowLevel1,
  }
}
