import { pxToRem } from '../../../../lib'
import { ColorSchemeMapping } from '../../../types'

export type IconSizeModifier = 'x' | 'xx'

export interface IconVariables {
  [key: string]: object | string | number | boolean | undefined
  colorScheme?: ColorSchemeMapping
  color?: string
  backgroundColor?: string
  borderColor?: string
  brandColor?: string
  secondaryColor: string
  redColor?: string
  disabledColor: string

  horizontalSpace: string
  sizeModifier?: IconSizeModifier
}

export default (siteVars): IconVariables => ({
  colorScheme: siteVars.colorScheme,
  color: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
  brandColor: siteVars.brandColor,
  secondaryColor: siteVars.colors.white,
  redColor: siteVars.colors.red[900],
  disabledColor: siteVars.colors.grey.light06,

  horizontalSpace: pxToRem(10),
})
