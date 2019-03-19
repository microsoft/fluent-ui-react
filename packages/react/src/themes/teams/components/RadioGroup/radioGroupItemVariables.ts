import { pxToRem } from '../../../../lib'

export type RadioGroupItemVariables = {
  color: string
  colorChecked: string
  colorDisabled: string

  colorBorder: string
  colorBorderChecked: string

  colorBackground: string
  colorBackgroundChecked: string

  padding: string
}

export default (siteVars: any): RadioGroupItemVariables => ({
  color: siteVars.colors.primary[500],
  colorChecked: siteVars.colors.white,
  colorDisabled: siteVars.gray06,

  colorBorder: siteVars.colors.primary[500],
  colorBorderChecked: siteVars.colors.white,

  colorBackground: siteVars.colors.white,
  colorBackgroundChecked: siteVars.colors.primary[500],

  padding: `0 ${pxToRem(4)}`,
})
