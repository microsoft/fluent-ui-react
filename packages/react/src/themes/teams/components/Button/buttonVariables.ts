import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'

export interface ButtonVariables {
  height: string
  minWidth: string
  maxWidth: string
  paddingLeftRightValue: number
  contentFontWeight: FontWeightProperty

  color: string
  colorHover: string
  colorFocus: string
  colorDisabled: string
  backgroundColor: string
  backgroundColorHover: string
  backgroundColorFocus: string
  backgroundColorDisabled: string
  borderColor: string
  borderColorHover: string
  borderColorDisabled: string

  primaryColor: string
  primaryColorHover: string
  primaryColorFocus: string
  primaryBackgroundColor: string
  primaryBackgroundColorHover: string
  primaryBackgroundColorFocus: string
  primaryBorderColor: string

  circularBorderRadius: string
  circularColor: string
  circularColorActive: string
  circularBackgroundColor: string
  circularBackgroundColorHover: string
  circularBackgroundColorFocus: string
  circularBorderColor: string
  circularBorderColorHover: string
  circularBorderColorFocus: string

  textColor: string
  textColorHover: string
  textPrimaryColor: string
  textPrimaryColorHover: string
  textSecondaryColor: string
  textSecondaryColorHover: string

  boxShadow: string
}

export default (siteVars: any): ButtonVariables => {
  return {
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    contentFontWeight: siteVars.fontWeightSemibold,
    paddingLeftRightValue: 20,

    color: siteVars.colors.grey[900],
    colorHover: siteVars.colors.grey[900],
    colorFocus: siteVars.colors.grey[900],
    colorDisabled: siteVars.gray06,
    backgroundColor: siteVars.colors.white,
    backgroundColorHover: siteVars.gray14,
    backgroundColorFocus: siteVars.gray08,
    backgroundColorDisabled: siteVars.gray09,
    borderColor: siteVars.gray08,
    borderColorHover: siteVars.gray06,
    borderColorDisabled: 'transparent',

    primaryColor: siteVars.colors.white,
    primaryColorHover: siteVars.colors.white,
    primaryColorFocus: siteVars.colors.white,
    primaryBackgroundColor: siteVars.colors.primary[500],
    primaryBackgroundColorHover: siteVars.brand04,
    primaryBackgroundColorFocus: siteVars.brand04,
    primaryBorderColor: 'transparent',

    circularBorderRadius: pxToRem(999),
    circularColor: siteVars.gray02,
    circularColorActive: siteVars.colors.white,
    circularBackgroundColor: 'transparent',
    circularBackgroundColorHover: siteVars.gray03,
    circularBackgroundColorFocus: siteVars.gray03,
    circularBorderColor: siteVars.gray02,
    circularBorderColorHover: 'transparent',
    circularBorderColorFocus: 'transparent',

    textColor: siteVars.colors.primary[500],
    textColorHover: siteVars.brand04,
    textPrimaryColor: siteVars.colors.primary[500],
    textPrimaryColorHover: siteVars.brand04,
    textSecondaryColor: siteVars.gray03,
    textSecondaryColorHover: siteVars.brand04,

    boxShadow: siteVars.shadowLevel1,
  }
}
