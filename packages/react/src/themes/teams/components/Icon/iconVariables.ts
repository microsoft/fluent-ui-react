import { pxToRem } from '../../../../lib'
import { IconVariables as BaseIconVariables } from '../../../base/components/Icon/iconVariables'
import { StrictColorSchemeMapping, StrictColorScheme } from '../../../types'
import { TeamsColorNames } from '../../colors'
import { generateComponentAreas, pickValuesFromColorScheme } from '../../../colorUtils'

export type IconSizeModifier = 'x' | 'xx'
export const iconColorComponentAreas = generateComponentAreas('foreground')
export type IconColorComponentAreas = typeof iconColorComponentAreas[number]

export type IconColorSchemeMapping = StrictColorSchemeMapping<
  StrictColorScheme<IconColorComponentAreas>,
  TeamsColorNames
>
export interface IconVariables extends BaseIconVariables {
  colorScheme?: IconColorSchemeMapping
  brandColor?: string
  secondaryColor: string
  redColor?: string

  sizeModifier?: IconSizeModifier
}

export default (siteVars): Partial<IconVariables> => ({
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, iconColorComponentAreas),
  color: undefined,
  borderColor: undefined,
  brandColor: siteVars.brandColor,
  secondaryColor: siteVars.colors.white,
  redColor: siteVars.colors.red[400],
  disabledColor: siteVars.colors.grey[250],

  horizontalSpace: pxToRem(10),
})
