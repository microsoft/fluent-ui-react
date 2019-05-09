import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared, ColorSchemeMapping } from '../../../types'
import { extendColorScheme } from '../../../colorUtils'

export interface LabelVariables {
  colorScheme: ColorSchemeMapping
  circularRadius: string
  padding: string
  startPaddingLeft: string
  endPaddingRight: string
  height: string
  iconColor: string
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  const color = 'rgba(0, 0, 0, 0.6)'

  return {
    colorScheme: extendColorScheme(siteVars.colorScheme, {
      default: {
        background: color,
        foreground: 'rgb(232, 232, 232)',
      },
      brand: {
        background: siteVars.colorScheme.brand.foreground4,
      },
    }),
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    iconColor: color,
  }
}
