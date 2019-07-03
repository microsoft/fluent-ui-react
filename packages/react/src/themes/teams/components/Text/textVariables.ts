import { TextVariables } from '../../../base/components/Text/textVariables'
import { ItemType } from '../../../../themes/types'
import { TeamsSchemeMappingWithAreas } from '../../types'
import { stringLiteralsArray } from '../../../../lib'
import { pickValuesFromColorScheme } from '../../../colorUtils'

export const textColorAreas = stringLiteralsArray('foreground')
export type TextColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof textColorAreas>>

export interface TeamsTextVariables extends TextVariables<TextColorSchemeMapping> {
  atMentionMeFontWeight: number
  importantWeight: number
  timestampHoverColor: string
}

export default (siteVariables): Partial<TeamsTextVariables> => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, textColorAreas),
    atMentionOtherColor: siteVariables.colors.brand[600],
    atMentionMeColor: siteVariables.colors.orange[400],
    atMentionMeFontWeight: siteVariables.fontWeightBold,
    disabledColor: siteVariables.colors.grey[250],
    errorColor: siteVariables.colors.red[400],
    importantWeight: siteVariables.fontWeightBold,
    importantColor: siteVariables.colors.red[400],
    successColor: siteVariables.colors.green[600],
    timestampColor: siteVariables.colors.grey[350],
    timestampHoverColor: siteVariables.colors.grey[500],
  }
}
