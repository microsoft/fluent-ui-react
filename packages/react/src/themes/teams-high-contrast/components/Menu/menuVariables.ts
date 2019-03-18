import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  color: siteVars.white,
  colorActive: siteVars.black,
  backgroundColorFocus: siteVars.accessibleYellow,
  backgroundColorActive: siteVars.accessibleCyan,

  verticalBackgroundColor: siteVars.colors.black,
})
