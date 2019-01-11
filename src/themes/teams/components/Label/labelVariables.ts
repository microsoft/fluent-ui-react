import { ColorValues, ColorScheme, SiteVariablesPrepared } from '../../../types'
import { pxToRem, getColorSchemeWithCustomDefaults } from '../../utils'

type LabelColorScheme = Pick<ColorScheme, 'foreground' | 'background'>

export interface LabelVariables {
  colorScheme: ColorValues<LabelColorScheme>
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
    colorScheme: getColorSchemeWithCustomDefaults(
      {
        foreground: color,
        background: 'rgb(232, 232, 232)',
      },
      siteVars.colorScheme,
    ),
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    iconColor: color,
  }
}
