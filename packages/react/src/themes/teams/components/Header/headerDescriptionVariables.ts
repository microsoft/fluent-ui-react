import { StrictColorSchemeMapping, StrictColorScheme } from '../../../types'
import { TeamsColorNames } from '../../colors'
import { generateComponentAreas, pickValuesFromColorScheme } from '../../../colorUtils'

export const headerDescriptionColorComponentAreas = generateComponentAreas('foreground')
export type HeaderDescriptionColorComponentAreas = typeof headerDescriptionColorComponentAreas[number]

export type HeaderDescriptionColorSchemeMapping = StrictColorSchemeMapping<
  StrictColorScheme<HeaderDescriptionColorComponentAreas>,
  TeamsColorNames
>
export interface HeaderDescriptionVariables {
  colorScheme?: HeaderDescriptionColorSchemeMapping
  color: string
}

export default (siteVariables: any): HeaderDescriptionVariables => ({
  colorScheme: pickValuesFromColorScheme(
    siteVariables.colorScheme,
    headerDescriptionColorComponentAreas,
  ),
  color: siteVariables.colors.grey[350],
})
