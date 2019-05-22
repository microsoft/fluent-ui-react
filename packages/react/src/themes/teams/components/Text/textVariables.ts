import { TextVariables } from '../../../base/components/Text/textVariables'
import { StrictColorSchemeMapping, StrictColorScheme } from '../../../../themes/types'
import { TeamsColorNames } from '../../colors'
import { generateComponentAreas } from '../../../colorUtils'

const textColorComponentAreas = generateComponentAreas('foreground')
export type TextColorComponentAreas = typeof textColorComponentAreas[number]

export type TextColorSchemeMapping = StrictColorSchemeMapping<
  StrictColorScheme<TextColorComponentAreas>,
  TeamsColorNames
>

export interface TeamsTextVariables extends TextVariables {
  atMentionMeFontWeight: number
  importantWeight: number
  timestampHoverColor: string
}

export default (siteVariables): Partial<TeamsTextVariables> => {
  return {
    // TODO: how can we specify these typings here, when this is already defined and used in the base theme!?
    colorScheme: siteVariables.colorScheme,
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
