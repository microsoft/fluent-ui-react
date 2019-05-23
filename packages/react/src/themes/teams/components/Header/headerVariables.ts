import { ItemType, TeamsSchemeMappingWithAreas } from '../../../types'
import { pickValuesFromColorScheme } from '../../../colorUtils'
import { stringLiteralsArray } from '../../../../lib'

export const headerColorAreas = stringLiteralsArray('foreground')
export type HeaderColorSchemeMapping = TeamsSchemeMappingWithAreas<
  ItemType<typeof headerColorAreas>
>

export interface HeaderVariables {
  colorScheme?: HeaderColorSchemeMapping
  color: string
  descriptionColor: string
}

export default (siteVars: any): HeaderVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, headerColorAreas),
    color: siteVars.colors.grey[750],
    descriptionColor: undefined,
  }
}
