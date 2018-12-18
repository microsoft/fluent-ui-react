import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'
import { pxToRem } from '../../utils'

export interface LabelVariables {
  colors: ColorValues<string>
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
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVars, colorVariant),
    color,
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    backgroundColor: 'rgb(232, 232, 232)',
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    iconColor: color,
  }
}
