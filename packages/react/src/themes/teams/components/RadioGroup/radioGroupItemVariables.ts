export interface RadioGroupItemVariables {
  labelColorDefault: string
  labelColorChecked: string

  iconColorBorderDefault: string
  iconColorBorderChecked: string

  iconcolorBackgroundDefault: string
  iconColorBackgroundChecked: string
  iconColorBoxShadowFocus: string

  colorDisabled: string
}

export default (siteVars: any): RadioGroupItemVariables => ({
  labelColorDefault: siteVars.gray02,
  labelColorChecked: siteVars.colors.black,

  iconColorBorderDefault: siteVars.colors.primary[500],
  iconColorBorderChecked: siteVars.colors.primary[500],

  iconcolorBackgroundDefault: siteVars.colors.white,
  iconColorBackgroundChecked: siteVars.colors.primary[500],
  iconColorBoxShadowFocus: siteVars.brand07,

  colorDisabled: siteVars.gray06,
})
