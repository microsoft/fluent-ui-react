import { SiteVariablesPrepared } from '../../../types'
import { LabelVariables } from '../../../teams/components/Label/labelVariables'
import { extendColorScheme } from '../../../colorUtils'

export default (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    colorScheme: extendColorScheme(siteVars.colorScheme, {
      brand: {
        background: siteVars.colorScheme.brand.foreground4,
      },
      red: {
        background: siteVars.colorScheme.red.foreground1,
      },
    }),
  }
}
