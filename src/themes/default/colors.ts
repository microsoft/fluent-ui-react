import { createColorVariants } from '../../lib'
import { ColorPalette, ContextualColors, EmphasisColors, NaturalColors } from '../types'

export const naturalColors: NaturalColors = {
  blue: createColorVariants('#0a84ff'),
  green: createColorVariants('#30e60b'),
  grey: createColorVariants('#737373'),
  orange: createColorVariants('#ff9400'),
  pink: createColorVariants('#ff1ad9'),
  purple: createColorVariants('#9400ff'),
  teal: createColorVariants('#00feff'),
  red: createColorVariants('#ff0039'),
  yellow: createColorVariants('#ffe900'),
}

export const emphasisColors: EmphasisColors = {
  primary: createColorVariants('#0a84ff'),
  secondary: naturalColors.grey,
}

export const contextualColors: ContextualColors = {
  text: naturalColors.grey,
  info: naturalColors.blue,
  danger: naturalColors.red,
  success: naturalColors.green,
  warning: naturalColors.yellow,
}

export const colors: ColorPalette = {
  ...contextualColors,
  ...emphasisColors,
  ...naturalColors,

  black: '#000',
  white: '#fff',
}
