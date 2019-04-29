import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { extendColorObject } from 'src/index'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: extendColorObject(siteVars.colorSchemeWIP, {
    primary: {
      foregroundActive: siteVars.colors.white,
      // backgroundFocus: siteVars.colors.primary[300],
    },
  }),

  color: siteVars.colors.grey[250],
  colorActive: siteVars.colors.white,
  colorDisabled: siteVars.colors.grey[450],

  primaryBorderColor: siteVars.colors.grey[600],
  pointingIndicatorBackgroundColor: siteVars.colors.primary[400],

  verticalBackgroundColor: siteVars.colors.grey[600],
  verticalBackgroundColorFocus: siteVars.colors.grey[550],
})
