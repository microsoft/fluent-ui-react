import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: siteVars.colorScheme,

  color: siteVars.colors.grey.dark02,
  colorActive: siteVars.colors.white,
  colorDisabled: siteVars.colors.grey.dark06,

  primaryBorderColor: siteVars.colors.grey.dark10,
  pointingIndicatorBackgroundColor: siteVars.brand06,

  verticalBackgroundColor: siteVars.colors.grey.dark10,
  verticalBackgroundColorFocus: siteVars.colors.grey.dark09,
})
