import { SiteVariablesPrepared } from '../../../types'
import { LabelVariables, invertColorScheme } from '../../../teams/components/Label/labelVariables'
import { extendColorScheme } from '../../../colorUtils'

export default (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    colorScheme: extendColorScheme(invertColorScheme(siteVars.colorScheme), {
      brand: {
        foreground: siteVars.colorScheme.brand.foreground4,
      },
      red: {
        foreground: siteVars.colorScheme.red.foreground1,
      },
    }),
  }
}
