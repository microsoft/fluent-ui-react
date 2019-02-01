export type RadioGroupItemVariables = {
  color: string
  colorChecked: string
  colorDisabled: string

  colorBorder: string
  colorBorderChecked: string

  colorBackground: string
  colorBackgroundChecked: string
  colorFocusShadow: string
}

export default (siteVars: any): RadioGroupItemVariables => ({
  color: siteVars.gray02,
  colorChecked: siteVars.black,
  colorDisabled: siteVars.gray06,

  colorBorder: siteVars.brand,
  colorBorderChecked: siteVars.brand,

  colorBackground: siteVars.white,
  colorBackgroundChecked: siteVars.brand,
  colorFocusShadow: '#a6a7dc', // brand06 dark theme
})
