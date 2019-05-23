import { SiteVariablesPrepared } from '../../../types'
import { LabelVariables, labelColorAreas } from '../../../teams/components/Label/labelVariables'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'

export default (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    colorScheme: pickValuesFromColorScheme(
      extendColorScheme(siteVars.colorScheme, {
        brand: {
          background: siteVars.colorScheme.brand.foreground4,
        },
        red: {
          background: siteVars.colorScheme.red.foreground1,
        },
      }),
      labelColorAreas,
    ),
  }
}
