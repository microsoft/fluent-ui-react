import { StrictColorSchemeMapping, StrictColorScheme } from '../../../../themes/types'
import { generateComponentAreas, pickValuesFromColorScheme } from '../../../colorUtils'
import { TeamsColorNames } from '../../colors'

const segmentColorComponentAreas = generateComponentAreas('foreground')
export type SegmentColorComponentAreas = typeof segmentColorComponentAreas[number]

export type SegmentColorSchemeMapping = StrictColorSchemeMapping<
  StrictColorScheme<SegmentColorComponentAreas>,
  TeamsColorNames
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
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, segmentColorComponentAreas),
    color: siteVariables.bodyColor,
    backgroundColor: siteVariables.bodyBackground,
    padding: '1em',
    borderRadius: 0,
    boxShadowColor: 'rgba(34,36,38,.15)',
  }
}
