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
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  return {
    colorScheme: extendColorScheme(siteVars.colorScheme, {
      // TODO use here some color scheme values, after the designs are delivered
      default: {
        background: 'rgba(0, 0, 0, 0.6)',
        foreground: 'rgb(232, 232, 232)',
      },
      brand: {
        background: siteVars.colorScheme.brand.foreground4,
      },
      red: {
        background: siteVars.colorScheme.red.foreground1,
      },
    }),
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),
  }
}
