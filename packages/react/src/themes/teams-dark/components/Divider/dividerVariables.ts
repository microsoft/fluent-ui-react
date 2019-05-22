import {
  DividerVariables,
  dividerColorComponentAreas,
} from '../../../teams/components/Divider/dividerVariables'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'

export default (siteVars: any): Partial<DividerVariables> => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      brand: {
        foreground: siteVars.colors.brand[400],
        border: siteVars.colors.brand[400],
      },
    }),
    dividerColorComponentAreas,
  ),
  textColor: siteVars.colors.grey[250],
  dividerColor: siteVars.colors.grey[550],
})
