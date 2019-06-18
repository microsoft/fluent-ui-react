import { ItemType } from '../../../../themes/types'
import { TeamsSchemeMappingWithAreas } from '../../types'
import { pickValuesFromColorScheme } from '../../../colorUtils'
import { stringLiteralsArray } from '../../../../lib'

export const segmentColorAreas = stringLiteralsArray('foreground')
export type SegmentColorSchemeMapping = TeamsSchemeMappingWithAreas<
  ItemType<typeof segmentColorAreas>
>

export interface SegmentVariables {
  colorScheme: SegmentColorSchemeMapping
  color: string
  colorDisabled: string
  backgroundColor: string
  backgroundColorDisabled: string
  borderColorDisabled: string
  borderRadius: string | number
  borderStyle: string
  borderWidth: string
  boxShadow: string
  padding: string
}

export default (siteVariables): SegmentVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, segmentColorAreas),
    color: siteVariables.bodyColor,
    colorDisabled: siteVariables.colors.grey[250],

    backgroundColor: siteVariables.bodyBackground,
    backgroundColorDisabled: siteVariables.colors.grey[150],

    borderColorDisabled: 'transparent',
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: '2px 0 0 0',

    boxShadow: '0 1px 1px 1px rgba(34,36,38,.15)',
    padding: '1em',
  }
}
