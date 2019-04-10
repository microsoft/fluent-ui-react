import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  color: siteVars.white,
  activeColor: siteVars.black,
  focusedBackgroundColor: siteVars.accessibleYellow,
  activeBackgroundColor: siteVars.accessibleCyan,

  verticalBackgroundColor: siteVars.colors.black,
})
