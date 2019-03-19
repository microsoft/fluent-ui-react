import { ColorSchemeMapping } from '../../../types'

export interface HeaderDescriptionVariables {
  colorScheme?: ColorSchemeMapping
  color: string
}

export default (siteVariables: any): HeaderDescriptionVariables => ({
  colorScheme: siteVariables.colorScheme,
  color: siteVariables.colors.grey.light04,
})
