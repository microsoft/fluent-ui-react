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
  return {
    colors: _.mapValues({ ...siteVars.emphasisColors, ...siteVars.naturalColors }, '500'),
    dividerColor: siteVars.gray09,
    textColor: siteVars.gray03,
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: pxToRem(4),
  }
}
