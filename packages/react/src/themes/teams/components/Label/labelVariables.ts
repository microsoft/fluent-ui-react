import { pxToRem, stringLiteralsArray } from '../../../../lib'
import { SiteVariablesPrepared, ItemType } from '../../../types'
import { TeamsSchemeMappingWithAreas } from '../../types'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'

export const labelColorAreas = stringLiteralsArray('foreground', 'background')
export type LabelColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof labelColorAreas>>

export interface LabelVariables {
  colorScheme: LabelColorSchemeMapping
  circularRadius: string
  padding: string
  startPaddingLeft: string
  endPaddingRight: string
  height: string
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  const colorScheme = extendColorScheme(siteVars.colorScheme, {
    default: {
      background: siteVars.colors.grey[100],
      foreground: siteVars.colors.grey[750],
    },
    brand: {
      background: siteVars.colorScheme.brand.foreground4,
    },
    red: {
      background: siteVars.colorScheme.red.foreground1,
    },
  })

  return {
    colorScheme: pickValuesFromColorScheme(colorScheme, labelColorAreas),
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),
  }
}
