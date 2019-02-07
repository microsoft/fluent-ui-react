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
  color: siteVars.brand,
  colorChecked: siteVars.white,
  colorDisabled: siteVars.gray06,

  colorBorder: siteVars.white,
  colorBorderChecked: siteVars.accessibleCyan,

  colorBackground: siteVars.white,
  colorBackgroundChecked: siteVars.accessibleCyan,
  colorFocusShadow: siteVars.accessibleYellow,
})
