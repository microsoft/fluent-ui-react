import { ColorSchemeMapping } from '../../../types'

export interface HeaderVariables {
  colorScheme?: ColorSchemeMapping
  color: string
  descriptionColor: string
}

export default (siteVars: any): HeaderVariables => {
  return {
    colorScheme: siteVars.colorScheme,
    color: siteVars.colors.grey[900],
    descriptionColor: undefined,
  }
}
