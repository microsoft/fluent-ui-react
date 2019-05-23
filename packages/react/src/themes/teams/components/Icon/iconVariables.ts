import { pxToRem, stringLiteralsArray } from '../../../../lib'
import { IconVariables as BaseIconVariables } from '../../../base/components/Icon/iconVariables'
import { ItemType, TeamsSchemeMappingWithAreas } from '../../../types'
import { pickValuesFromColorScheme } from '../../../colorUtils'

export type IconSizeModifier = 'x' | 'xx'
export const iconColorAreas = stringLiteralsArray('foreground')
export type IconColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof iconColorAreas>>

export interface IconVariables extends BaseIconVariables {
  colorScheme?: IconColorSchemeMapping
  brandColor?: string
  secondaryColor: string
  redColor?: string

  sizeModifier?: IconSizeModifier
}

export default (siteVars): Partial<IconVariables> => ({
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, iconColorAreas),
  color: undefined,
  borderColor: undefined,
  brandColor: siteVars.brandColor,
  secondaryColor: siteVars.colors.white,
  redColor: siteVars.colors.red[400],
  disabledColor: siteVars.colors.grey[250],

  horizontalSpace: pxToRem(10),
})
