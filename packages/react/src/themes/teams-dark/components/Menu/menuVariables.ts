import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: siteVars.colorScheme,

  color: siteVars.colors.grey[250],
  colorActive: siteVars.colors.white,
  colorDisabled: siteVars.colors.grey[450],

  primaryBorderColor: siteVars.colors.grey[600],
  pointingIndicatorBackgroundColor: siteVars.colors.primary[400],

  verticalBackgroundColor: siteVars.colors.grey[600],
  verticalBackgroundColorFocus: siteVars.colors.grey[550],
})
