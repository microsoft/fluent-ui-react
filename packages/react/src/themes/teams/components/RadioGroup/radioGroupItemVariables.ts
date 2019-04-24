import { pxToRem } from '../../../../lib'

export type RadioGroupItemVariables = {
  colorDisabled: string

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
  colorDisabled: siteVars.gray06,

  textFontSize: siteVars.fontSizes.medium,

  textColorDefault: siteVars.gray02,
  textColorDefaultHoverFocus: siteVars.colors.grey[900],
  textColorChecked: siteVars.colors.grey[900],

  iconBorderColorDefaultHover: siteVars.colors.grey[900],
  iconBorderColorChecked: siteVars.colors.primary[500],

  iconBackgroundColorChecked: siteVars.colors.primary[500],

  padding: `0 ${pxToRem(4)}`,
})
