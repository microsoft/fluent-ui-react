import {
  toolbarColorAreas,
  ToolbarVariables,
} from '../../../teams/components/Toolbar/toolbarVariables'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'

export default (siteVars: any): Partial<ToolbarVariables> => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      default: {
        foregroundHover: siteVars.colorScheme.brand.foregroundHover,
        borderFocus: undefined,
        foregroundActive: siteVars.accessibleYellow,
        backgroundFocus: siteVars.colorScheme.default.backgroundHover,
      },
    }),
    toolbarColorAreas,
  ),

  borderWidth: '0',
  borderRadius: undefined,
})
