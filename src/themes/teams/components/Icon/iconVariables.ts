import { ColorValues } from '../../../types'
import { mapColorsToScheme, pxToRem } from '../../../../lib'

export type IconSizeModifier = 'x' | 'xx'

export interface IconVariables {
  [key: string]: object | string | number | boolean | undefined

  colors: ColorValues<string>
  color?: string
  backgroundColor?: string
  borderColor?: string
  brandColor?: string
  secondaryColor: string
  redColor?: string
  disabledColor: string

  horizontalSpace: string
  marginRight: string
  outline?: boolean
  sizeModifier?: IconSizeModifier
}

const colorVariant = 500

export default (siteVars): IconVariables => ({
  colors: mapColorsToScheme(siteVars, colorVariant),
  color: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
  brandColor: siteVars.brandColor,
  secondaryColor: siteVars.white,
  redColor: siteVars.red,
  disabledColor: siteVars.gray06,

  horizontalSpace: pxToRem(10),
  marginRight: pxToRem(8),
  outline: undefined,
})
