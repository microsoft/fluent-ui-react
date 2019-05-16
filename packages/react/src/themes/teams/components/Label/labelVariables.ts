import { pxToRem } from '../../../../lib'
import {
  SiteVariablesPrepared,
  StrictColorSchemeMapping,
  StrictColorScheme,
  ComponentAreaName,
} from '../../../types'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'
import { TeamsColorNames } from '../../colors'

// TODO extract this to a util
const tuple = <T extends ComponentAreaName>(...args: T[]) => args
const labelColorComponentAreas = tuple('background', 'foreground')
type LabelColorComponentAreas = typeof labelColorComponentAreas[number]

type LabelColorSchemeMapping = StrictColorSchemeMapping<
  StrictColorScheme<LabelColorComponentAreas>,
  TeamsColorNames
>

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
    colorScheme: pickValuesFromColorScheme(colorScheme, labelColorComponentAreas),
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    iconColor: color,
  }
}
