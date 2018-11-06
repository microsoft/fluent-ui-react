import { pxToRem } from '../../../../lib'
import { ColorPaletteVariables } from '../../../types'

export interface DividerVariables extends ColorPaletteVariables {
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  importantFontWeight: string
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => ({
  dividerColor: siteVars.gray09,
  textColor: siteVars.gray03,
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),

  colorPrimary: siteVars.primary,
  colorSecondary: siteVars.secondary,
  colorRed: siteVars.red,
  colorOrange: siteVars.orange,
  colorYellow: siteVars.yellow,
  colorOlive: siteVars.olive,
  colorGreen: siteVars.green,
  colorTeal: siteVars.teal,
  colorBlue: siteVars.blue,
  colorViolet: siteVars.violet,
  colorPurple: siteVars.purple,
  colorPink: siteVars.pink,
  colorBrown: siteVars.brown,
  colorGrey: siteVars.white,
  colorBlack: siteVars.black,
  colorWhite: siteVars.white,
})
