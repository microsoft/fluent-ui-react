import { ColorValues, ColorScheme } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'
import { pxToRem } from '../../utils'

type LabelColorScheme = Pick<ColorScheme, 'color' | 'backgroundColor'>

export interface LabelVariables {
  colors: ColorValues<LabelColorScheme>
  circularRadius: string
  padding: string
  color: string
  backgroundColor: string
  startPaddingLeft: string
  endPaddingRight: string
  height: string
  iconColor: string
}

export default (siteVars: any): LabelVariables => {
  const color = 'rgba(0, 0, 0, 0.6)'

  return {
    colors: mapColorsToScheme(siteVars, colorVariants => ({
      color: colorVariants[50],
      backgroundColor: colorVariants[500],
    })),
    color,
    backgroundColor: 'rgb(232, 232, 232)',
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    iconColor: color,
  }
}
