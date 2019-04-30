import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { extendColorScheme } from '../../../colorUtils'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: extendColorScheme(siteVars.colorScheme, {
    primary: {
      foregroundActive: siteVars.colors.black,
    },
  }),
  color: siteVars.colors.white,
  colorActive: siteVars.colors.black,
  backgroundColorFocus: siteVars.accessibleYellow,
  backgroundColorActive: siteVars.accessibleCyan,
  primaryBorderColor: siteVars.colors.white,

  verticalBackgroundColor: siteVars.colors.black,
})
