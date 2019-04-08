import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: siteVars.colorScheme,

  color: siteVars.colors.grey[250],
  colorActive: siteVars.colors.white,
  colorDisabled: siteVars.colors.grey[450],

  primaryBorderColor: siteVars.colors.grey[650],
  pointingIndicatorBackgroundColor: siteVars.brand06,

  verticalBackgroundColor: siteVars.colors.grey[650],
  verticalBackgroundColorFocus: siteVars.colors.grey[550],
})
