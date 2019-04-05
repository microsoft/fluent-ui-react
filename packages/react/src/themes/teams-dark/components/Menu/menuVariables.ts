import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: siteVars.colorScheme,

  color: siteVars.colors.grey.dark02,
  colorActive: siteVars.colors.white,

  primaryBorderColor: siteVars.colors.grey.dark10,
  pointingIndicatorBackgroundColor: siteVars.brand06,

  backgroundColorHover: siteVars.colors.grey.dark08,

  verticalBackgroundColor: siteVars.colors.grey.dark10,
})
