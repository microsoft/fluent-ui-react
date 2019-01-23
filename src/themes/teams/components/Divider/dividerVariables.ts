import * as _ from 'lodash'
import { FontWeightProperty } from 'csstype'

import { ColorValues } from '../../../types'
import { pxToRem, mapColorsToScheme } from '../../../../lib'

export interface DividerVariables {
  colors: ColorValues<string>
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  importantFontWeight: FontWeightProperty
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => {
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVars, colorVariant),
    dividerColor: siteVars.gray09,
    textColor: siteVars.gray03,
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: pxToRem(4),
  }
}
