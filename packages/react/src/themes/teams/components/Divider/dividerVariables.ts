import { FontWeightProperty } from 'csstype'
import { pxToRem, stringLiteralsArray } from '../../../../lib'
import { ItemType, TeamsSchemeMappingWithAreas } from '../../../types'
import { pickValuesFromColorScheme } from '../../../colorUtils'

export const dividerColorAreas = stringLiteralsArray('foreground')
export type DividerColorSchemeMapping = TeamsSchemeMappingWithAreas<
  ItemType<typeof dividerColorAreas>
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
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, dividerColorAreas),
  dividerColor: siteVars.colors.grey[150],
  textColor: siteVars.colors.grey[450],
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),
})
