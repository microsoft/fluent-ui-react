import * as _ from 'lodash'

import { EmphasisColors, NaturalColors } from '../../../types'
import { pxToRem } from '../../../../lib'

export interface DividerVariables {
  colors: Record<keyof (EmphasisColors & NaturalColors), string>
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  importantFontWeight: string
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => {
  const colorVariant = '500'

  return {
    colors: _.mapValues({ ...siteVars.emphasisColors, ...siteVars.naturalColors }, colorVariant),
    dividerColor: siteVars.gray09,
    textColor: siteVars.gray03,
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: pxToRem(4),
  }
}
