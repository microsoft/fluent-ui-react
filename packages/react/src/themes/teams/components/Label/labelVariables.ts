import { pxToRem } from '../../../../lib'
import {
  SiteVariablesPrepared,
  ColorSchemeMapping,
  ColorScheme,
  ComponentAreaName,
} from '../../../types'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'

// TODO extract this to a util
const tuple = <T extends string[]>(...args: T) => args
const labelColorComponentAreasTuple = tuple<ComponentAreaName[]>('foreground', 'background')
type LabelColorComponentAreas = typeof labelColorComponentAreasTuple[number]

type LabelColorSchemeMapping = ColorSchemeMapping<ColorScheme<LabelColorComponentAreas>>

export interface LabelVariables {
  colorScheme: LabelColorSchemeMapping
  circularRadius: string
  padding: string
  startPaddingLeft: string
  endPaddingRight: string
  height: string
  iconColor: string
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  const color = 'rgba(0, 0, 0, 0.6)'

  const colorScheme = extendColorScheme(siteVars.colorScheme, {
    default: {
      background: color,
      foreground: 'rgb(232, 232, 232)',
    },
    brand: {
      background: siteVars.colorScheme.brand.foreground4,
    },
  })

  return {
    colorScheme: pickValuesFromColorScheme<LabelColorComponentAreas>(
      colorScheme,
      labelColorComponentAreasTuple,
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
