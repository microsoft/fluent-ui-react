import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { extendColorScheme } from '../../../colorUtils'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: extendColorScheme(siteVars.colorScheme, {
    default: {
      foregroundDefault: siteVars.colors.grey[500],
      backgroundDefault: siteVars.colors.grey[400],
      borderDefault: siteVars.colors.grey[500], // 450 in the color scheme

      foregroundHover: siteVars.colors.black,
      backgroundHover: siteVars.colors.grey[500], // 550 in the color scheme

      borderActive: siteVars.colors.grey[600],
      foregroundActive: siteVars.colors.black, // white in the scheme...
      backgroundActive: siteVars.colors.grey[500],

      foregroundFocus: siteVars.colors.black,
      backgroundFocus1: siteVars.colors.grey[500],

      foregroundFocusWithin: siteVars.colors.black,

      foregroundDisabled: siteVars.colors.black,
    },
    primary: {
      foregroundHover: siteVars.colors.white,
      backgroundHover: siteVars.colors.primary[300],

      borderActive: siteVars.colors.primary[400],
      foregroundActive: siteVars.colors.white,
      backgroundActive: siteVars.colors.primary[500],
      shadowActive: siteVars.colors.primary[50],

      foregroundFocus: siteVars.colors.white,
      backgroundFocus1: siteVars.colors.primary[300],
    },
  }),

  color: siteVars.colors.grey[250],
  colorActive: siteVars.colors.white,
  colorDisabled: siteVars.colors.grey[450],

  primaryBorderColor: siteVars.colors.grey[600],
  pointingIndicatorBackgroundColor: siteVars.colors.primary[400],

  verticalBackgroundColor: siteVars.colors.grey[600],
  verticalBackgroundColorFocus: siteVars.colors.grey[550],
  iconOnlyColorActive: siteVars.colors.primary[400],
})
