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

  iconBackgroundColorChecked: string

  padding: string
}

export default (siteVars: any): RadioGroupItemVariables => ({
  colorDisabled: siteVars.colors.grey[250],
  focusInnerBorderColor: siteVars.colors.white,
  focusOuterBorderColor: siteVars.colors.black,

  textFontSize: siteVars.fontSizes.medium,

  textColorDefault: siteVars.colors.grey[500],
  textColorDefaultHoverFocus: siteVars.colors.grey[750],
  textColorChecked: siteVars.colors.grey[750],

  iconBorderColorDefaultHover: siteVars.colors.grey[750],
  iconBorderColorChecked: siteVars.colors.primary[600],

  iconBackgroundColorChecked: siteVars.colors.primary[600],

  padding: `0 ${pxToRem(4)}`,
})
