import { StrictColorSchemeMapping, StrictColorScheme } from '../../../types'
import { TeamsColorNames } from '../../colors'
import { generateComponentAreas, pickValuesFromColorScheme } from '../../../colorUtils'

const headerColorComponentAreas = generateComponentAreas('foreground')
export type HeaderColorComponentAreas = typeof headerColorComponentAreas[number]

export type HeaderColorSchemeMapping = StrictColorSchemeMapping<
  StrictColorScheme<HeaderColorComponentAreas>,
  TeamsColorNames
>
export interface HeaderVariables {
  colorScheme?: HeaderColorSchemeMapping
  color: string
  descriptionColor: string
}

export default (siteVars: any): HeaderVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, headerColorComponentAreas),
    color: siteVars.colors.grey[750],
    descriptionColor: undefined,
  }
}
