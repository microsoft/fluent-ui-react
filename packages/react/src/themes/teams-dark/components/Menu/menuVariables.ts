import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { extendColorScheme } from '../../../colorUtils'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: extendColorScheme(siteVars.colorScheme, {
    default: {
      borderActive: siteVars.colors.grey[600],
      backgroundFocus1: siteVars.colors.grey[500],
    },
    brand: {
      foregroundHover: siteVars.colors.white,
      backgroundHover: siteVars.colors.brand[300],
      borderActive: siteVars.colors.brand[400],
      foregroundActive: siteVars.colors.white,
      foregroundFocus: siteVars.colors.white,
      backgroundFocus1: siteVars.colors.brand[300],
    },
  }),

  color: siteVars.colors.grey[250],
  colorActive: siteVars.colors.white,

  primaryBorderColor: siteVars.colors.grey[600],
  pointingIndicatorBackgroundColor: siteVars.colors.brand[400],

  verticalBackgroundColor: siteVars.colors.grey[600],
  verticalBackgroundColorFocus: siteVars.colors.grey[550],
  iconOnlyColorActive: siteVars.colors.brand[400],
})
