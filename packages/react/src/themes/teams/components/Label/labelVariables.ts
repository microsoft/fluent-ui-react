import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared, ColorSchemeMapping } from '../../../types'

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

  const colorScheme = {
    ...siteVars.colorScheme,
    default: {
      ...siteVars.colorScheme.default,
      foregroundDefault: color,
      backgroundDefault: 'rgb(232, 232, 232)',
    },
  }

  return {
    colorScheme,
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    iconColor: color,
  }
}
