import { pxToRem } from '../../../../lib'
import { ColorSchemeMapping } from '../../../types'
import { IconVariables as BaseIconVariables } from 'src/themes/base/components/Icon/iconVariables'

export type IconSizeModifier = 'x' | 'xx'

export interface IconVariables extends BaseIconVariables {
  colorScheme?: ColorSchemeMapping
  brandColor?: string
  secondaryColor: string
  redColor?: string

  sizeModifier?: IconSizeModifier
}

export default (siteVars): Partial<IconVariables> => ({
  colorScheme: siteVars.colorScheme,
  color: undefined,
  borderColor: undefined,
  brandColor: siteVars.brandColor,
  secondaryColor: siteVars.colors.white,
  redColor: siteVars.colors.red[400],
  disabledColor: siteVars.colors.grey[250],

  horizontalSpace: pxToRem(10),
})
