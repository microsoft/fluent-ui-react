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
  height: string
  iconSpacing: string
  iconStartSpacingLeft: string
  iconStartSpacingRight: string
  imageStartSpacingLeft: string
  imageStartSpacingRight: string
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
    padding: `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
    iconSpacing: pxToRem(8),
    iconStartSpacingLeft: '0',
    iconStartSpacingRight: '0',
    imageStartSpacingLeft: '0',
    imageStartSpacingRight: '0',
    height: pxToRem(32),
  }
}
