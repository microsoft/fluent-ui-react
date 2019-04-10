import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  color: siteVars.colors.white,
  colorActive: siteVars.colors.black,
  backgroundColorFocus: siteVars.accessibleYellow,
  backgroundColorActive: siteVars.accessibleCyan,
  primaryBorderColor: siteVars.colors.white,

  verticalBackgroundColor: siteVars.colors.black,
})
