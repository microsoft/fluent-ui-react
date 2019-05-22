import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'
import { StrictColorSchemeMapping, StrictColorScheme } from '../../../types'
import { TeamsColorNames } from '../../colors'
import { generateComponentAreas, pickValuesFromColorScheme } from '../../../colorUtils'

export const dividerColorComponentAreas = generateComponentAreas('foreground')
export type DividerColorComponentAreas = typeof dividerColorComponentAreas[number]

export type DividerColorSchemeMapping = StrictColorSchemeMapping<
  StrictColorScheme<DividerColorComponentAreas>,
  TeamsColorNames
>

export interface DividerVariables {
  colorScheme: DividerColorSchemeMapping
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  importantFontWeight: FontWeightProperty
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, dividerColorComponentAreas),
  dividerColor: siteVars.colors.grey[150],
  textColor: siteVars.colors.grey[450],
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),
})
