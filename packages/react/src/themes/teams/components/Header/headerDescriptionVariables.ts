import { ItemType, TeamsSchemeMappingWithAreas } from '../../../types'
import { pickValuesFromColorScheme } from '../../../colorUtils'
import { stringLiteralsArray } from '../../../../lib'

export const headerDescriptionColorAreas = stringLiteralsArray('foreground')
export type HeaderDescriptionColorSchemeMapping = TeamsSchemeMappingWithAreas<
  ItemType<typeof headerDescriptionColorAreas>
>

export interface HeaderDescriptionVariables {
  colorScheme?: HeaderDescriptionColorSchemeMapping
  color: string
}

export default (siteVariables: any): HeaderDescriptionVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, headerDescriptionColorAreas),
  color: siteVariables.colors.grey[350],
})
