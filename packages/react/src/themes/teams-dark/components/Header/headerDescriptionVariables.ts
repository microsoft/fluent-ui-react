import { HeaderDescriptionVariables } from '../../../teams/components/Header/headerDescriptionVariables'

export default (siteVariables: any): Partial<HeaderDescriptionVariables> => ({
  colorScheme: siteVariables.colorScheme,
  color: siteVariables.colors.grey[250],
})
