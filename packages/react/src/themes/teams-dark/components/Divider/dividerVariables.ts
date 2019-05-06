import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'
import { extendColorScheme } from '../../../colorUtils'

export default (siteVars: any): Partial<DividerVariables> => ({
  colorScheme: extendColorScheme(siteVars.colorScheme, {
    brand: {
      foreground: siteVars.colors.brand[400],
      border: siteVars.colors.brand[400],
    },
  }),
  textColor: siteVars.colors.grey[250],
  dividerColor: siteVars.colors.grey[550],
})
