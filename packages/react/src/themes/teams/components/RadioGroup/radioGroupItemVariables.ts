import { pxToRem } from '../../../../lib'

export type RadioGroupItemVariables = {
  colorDisabled: string

  // can these be global colors so we don't have to define for every component?
  focusInnerBorderColor: string
  focusOuterBorderColor: string

  textFontSize: string

  textColorDefault: string
  textColorDefaultHoverFocus: string
  textColorChecked: string

  iconBorderColorDefaultHover: string
  iconBorderColorChecked: string

  iconBackgroundColorDefault: string
  iconBackgroundColorChecked: string

  iconColorBoxShadowFocus: string

  padding: string
}

export default (siteVars: any): RadioGroupItemVariables => ({
  colorDisabled: siteVars.gray06,
  focusInnerBorderColor: siteVars.colors.white,
  focusOuterBorderColor: siteVars.colors.black,

  textFontSize: siteVars.fontSizes.medium,

  textColorDefault: siteVars.gray02,
  textColorDefaultHoverFocus: siteVars.colors.grey[900],
  textColorChecked: siteVars.colors.grey[900],

  iconBorderColorDefaultHover: siteVars.colors.grey[900],
  iconBorderColorChecked: siteVars.colors.primary[500],

  iconBackgroundColorDefault: siteVars.colors.white,
  iconBackgroundColorChecked: siteVars.colors.primary[500],

  iconColorBoxShadowFocus: siteVars.brand07,

  padding: `0 ${pxToRem(4)}`,
})
