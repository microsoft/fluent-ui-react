import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'
import { ColorSchemeMapping } from '../../../types'

export interface DividerVariables {
  colorScheme: ColorSchemeMapping
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  importantFontWeight: FontWeightProperty
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => ({
  colorScheme: siteVars.colorScheme,
  dividerColor: siteVars.colors.grey.light09,
  textColor: siteVars.colors.grey.light03,
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),
})
