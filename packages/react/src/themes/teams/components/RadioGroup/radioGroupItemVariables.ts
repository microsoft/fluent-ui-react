export type RadioGroupItemVariables = {
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
  labelColorChecked: siteVars.black,

  iconColorBorderDefault: siteVars.brand,
  iconColorBorderChecked: siteVars.brand,

  iconcolorBackgroundDefault: siteVars.white,
  iconColorBackgroundChecked: siteVars.brand,
  iconColorBoxShadowFocus: '#a6a7dc', // brand06 dark theme

  colorDisabled: siteVars.gray06,
})
