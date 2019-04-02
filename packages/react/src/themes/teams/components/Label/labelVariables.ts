import { pxToRem, getColorSchemeWithCustomDefaults } from '../../../../lib'
import { ColorValues, ColorScheme, SiteVariablesPrepared } from '../../../types'

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
  const color = siteVars.colors.black

  return {
    colorScheme: getColorSchemeWithCustomDefaults(siteVars.colorScheme, {
      foreground: color,
      background: 'rgb(232, 232, 232)',
    }),
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(6)} 0 ${pxToRem(6)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(24),

    // variables for 'icon' part
    iconColor: siteVars.gray02,
  }
}
