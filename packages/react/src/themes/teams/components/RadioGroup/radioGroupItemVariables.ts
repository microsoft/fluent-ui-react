export type RadioGroupItemVariables = {
  color: string
  colorChecked: string
  colorDisabled: string

  colorBorder: string
  colorBorderChecked: string

  colorBackground: string
  colorBackgroundChecked: string
}

export default (siteVars: any): RadioGroupItemVariables => ({
  color: siteVars.brand,
  colorChecked: siteVars.white,
  colorDisabled: siteVars.gray06,

  colorBorder: siteVars.brand,
  colorBorderChecked: siteVars.white,

  colorBackground: siteVars.white,
  colorBackgroundChecked: siteVars.brand,
})
