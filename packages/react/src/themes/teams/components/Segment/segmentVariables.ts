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
  backgroundColor: string
  padding: string
  borderRadius: string | number
  boxShadowColor: string
}

export default (siteVariables): SegmentVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, segmentColorAreas),
    color: siteVariables.bodyColor,
    backgroundColor: siteVariables.bodyBackground,
    padding: '1em',
    borderRadius: 0,
    boxShadowColor: 'rgba(34,36,38,.15)',
  }
}
