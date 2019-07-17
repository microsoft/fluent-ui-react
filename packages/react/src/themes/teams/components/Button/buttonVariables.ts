import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'

export interface ButtonVariables {
  height: string
  minWidth: string
  loadingMinWidth: string
  maxWidth: string
  borderRadius: string
  paddingLeftRightValue: number
  contentFontWeight: FontWeightProperty

  color: string
  colorHover: string
  colorFocus: string
  colorDisabled: string
  backgroundColor: string
  backgroundColorActive: string
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
  primaryBackgroundColorActive: string
  primaryBackgroundColorHover: string
  primaryBackgroundColorFocus: string
  primaryBorderColor: string

  circularBorderRadius: string
  circularColor: string
  circularColorActive: string
  circularBackgroundColor: string
  circularBackgroundColorActive: string
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

export default (siteVars: any): ButtonVariables => ({
  height: pxToRem(32),
  minWidth: pxToRem(96),
  loadingMinWidth: pxToRem(118),
  maxWidth: pxToRem(280),
  borderRadius: siteVars.borderRadius,
  contentFontWeight: siteVars.fontWeightSemibold,
  paddingLeftRightValue: 20,

  color: siteVars.colors.grey[750],
  colorHover: siteVars.colors.grey[750],
  colorFocus: siteVars.colors.grey[750],
  colorDisabled: siteVars.colors.grey[250],
  backgroundColor: siteVars.colors.white,
  backgroundColorActive: siteVars.colors.grey[200],
  backgroundColorHover: siteVars.colors.grey[50],
  backgroundColorFocus: siteVars.colors.grey[200],
  backgroundColorDisabled: siteVars.colors.grey[150],
  borderColor: siteVars.colors.grey[200],
  borderColorHover: siteVars.colors.grey[250],
  borderColorDisabled: 'transparent',

  primaryColor: siteVars.colors.white,
  primaryColorHover: siteVars.colors.white,
  primaryColorFocus: siteVars.colors.white,
  primaryBackgroundColor: siteVars.colors.brand[600],
  primaryBackgroundColorActive: siteVars.colors.brand[900],
  primaryBackgroundColorHover: siteVars.colors.brand[800],
  primaryBackgroundColorFocus: siteVars.colors.brand[800],
  primaryBorderColor: 'transparent',

  circularBorderRadius: pxToRem(999),
  circularColor: siteVars.colors.grey[500],
  circularColorActive: siteVars.colors.white,
  circularBackgroundColor: 'transparent',
  circularBackgroundColorActive: siteVars.colors.grey[500],
  circularBackgroundColorHover: siteVars.colors.grey[450],
  circularBackgroundColorFocus: siteVars.colors.grey[450],
  circularBorderColor: siteVars.colors.grey[500],
  circularBorderColorHover: 'transparent',
  circularBorderColorFocus: 'transparent',

  textColor: siteVars.colors.brand[600],
  textColorHover: siteVars.colors.brand[800],
  textPrimaryColor: siteVars.colors.brand[600],
  textPrimaryColorHover: siteVars.colors.brand[800],
  textSecondaryColor: siteVars.colors.grey[450],
  textSecondaryColorHover: siteVars.colors.brand[800],

  boxShadow: siteVars.shadowLevel1,
})
