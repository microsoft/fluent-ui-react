import * as _ from 'lodash'

import {
  ColorPalette,
  ContextualColors,
  EmphasisColors,
  NaturalColors,
  ColorSchemeMapping,
  PrimitiveColors,
  ColorScheme,
} from '../types'

export const emphasisColors: EmphasisColors = {
  primary: {
    50: '#F4F4FC', // brand16
    100: '#E2E2F1', // brand15
    200: '#E2E2F6', // brand14, brand02-dark
    300: '#BDBDE6', // brand12, brand04-dark
    400: '#8b8cc7', // brand08, brand08-dark
    500: '#6264A7', // brand00, brand06, brand12-dark
    600: '#585a96', // brand05
    700: '#464775', // brand04, brand14-dark
    800: '#3A3B55', // brand15-dark
    900: '#33344A', // brand02, brand16-dark
  },
}

export const naturalColors: NaturalColors = {
  grey: {
    50: '#FAF9F8', // gray14
    100: '#F9F8F7', // gray14-agnostic
    200: '#F7F7F7', // gray19
    300: '#F3F2F1', // gray10
    400: '#EDEBE9', // gray09
    500: '#E1DFDD', // gray08
    600: '#C8C6C4', // gray06, gray02-dark
    700: '#B3B0AD', // gray03-dark
    800: '#B5B4B3', // gray20-agnostic
    900: '#979593', // gray04
  },
  darkgrey: {
    50: '#8A8886', // gray04-dark
    100: '#605e5c', // gray03, gray06-dark
    200: '#57575B', // gray15-dark
    300: '#484644', // gray02, gary08-dark
    400: '#3B3A39', // gray09-dark, gray12-dark
    500: '#3B3A3A', // app-bar-darktheme
    600: '#2D2C2C', // gray10-dark
    700: '#292828', // gray14-dark
    800: '#252424', // siteVariables.black
    900: '#201f1f', // app-black-darktheme
  },
  green: {
    50: '#fff',
    100: '#fff',
    200: '#fff',
    300: '#3ff23f', // acc-disabled-color
    400: '#fff',
    500: '#92c353', // green
    600: '#fff',
    700: '#fff',
    800: '#fff',
    900: '#237B4B', // green04
  },
  orange: {
    50: '#da846b', // post-orange02-dark
    100: '#833122', // orange01
    150: '#f7bbad', // post-orange12-dark
    200: '#a33d2a', // orange02
    300: '#bd432c', // orange03
    400: '#cc4a31', // orange04, orange-dark
    500: '#e97548', // orange, orange04-dark
    600: '#efdbd3', // orange14
    650: '#f8ded7', // post-orange08
    700: '#f9ecea', // orange16
    800: '#f8ded7', // post-orange08
    900: '#c7431d', // post-orange02
  },
  brown: {
    50: '#fff',
    100: '#7c5811', // post-gold02
    200: '#fff',
    300: '#664134', // orange14-dark
    400: '#fff',
    500: '#51332c', // orange16-dark
    600: '#fff',
    700: '#482f26', // post-orange08-dark
    800: '#fff',
    900: '#fff',
  },
  pink: {
    50: '#fff',
    100: '#fa70d8', // magenta01
    200: '#d092ba', // post-pink02
    300: '#943670', // orchid
    400: '#ae3d84', // orchid-dark
    500: '#b24782', // magenta
    600: '#e8cadd', // post-pink08
    700: '#a85883', // mulberry
    800: '#530738', // post-pink02
    850: '#ab3590', // app-oof
    900: '#cf6098', // magenta-dark
    950: '#3e1f32', // post-pink08
  },
  red: {
    50: '#fcf4f6', // red10
    100: '#f3d6db', // red08
    200: '#8e192e', // red02
    300: '#a72037', // red04
    400: '#c4314b', // red06
    500: '#C4314B', // red
    600: '#ed1b3e', // red-deep
    700: '#4f232b', // red08-dark
    800: '#1e060c', // red10-dark
    900: '#d74654', // red-dark
  },
  yellow: {
    50: '#fff4d6', // lightyellow
    100: '#fff',
    200: '#fbf5d9', // message-highlight-color
    300: '#fff',
    400: '#f1d499', // post-gold02-dark
    500: '#F8D22A', // siteVariables.yellow
    600: '#ffff01', // acc-hyperlink-color
    700: '#f9ec00', // acc-critical-ufd-icon-color
    800: '#f8eacd', // post-gold08
    900: '#4e4f22', // post-gold08-dark
  },
  purple: {
    50: '#fff',
    100: '#ada8d1', // post-purple02-dark
    200: '#d6d4e8', // post-purple08
    300: '#fff',
    400: '#fff',
    500: '#fff',
    600: '#fff',
    700: '#2c293d', // post-purple08-dark
    800: '#fff',
    900: '#272154', // post-purple02
  },
  blue: {
    50: '#fff',
    100: '#7fa3d0', // post-blue02-dark
    200: '#cddaea', // post-blue08
    300: '#fff',
    400: '#fff',
    500: '#fff',
    600: '#fff',
    700: '#164279', // post-blue02
    800: '#222f3f', // post-blue08-dark
    900: '#57d4ff', // blue02-dark
  },
  teal: {
    50: '#fff',
    100: '#166467', // post-teal02
    200: '#fff',
    300: '#1aebff', // acc-selection-background-color
    400: '#fff',
    500: '#cde3e4', // post-teal08
    600: '#fff',
    700: '#6baeb1', // post-teal02-dark
    800: '#fff',
    900: '#233839', // post-teal08-dark
  },
}

export const contextualColors: ContextualColors = {
  text: naturalColors.grey,
}

const emphasisAndNaturalColors: EmphasisColors & NaturalColors = {
  ...emphasisColors,
  ...naturalColors,
}

const lightBackgroundColors = ['orange', 'yellow']
const isLightBackground = (colorName: string) => _.includes(lightBackgroundColors, colorName)

export const colors: ColorPalette = {
  ...emphasisAndNaturalColors,
  ...contextualColors,

  // Primitive colors
  black: '#000',
  white: '#FFF', // siteVariables.white
}

const primitiveColorsScheme: Record<keyof PrimitiveColors, ColorScheme> = {
  black: {
    foreground: colors.white,
    border: colors.white,
    shadow: colors.white,
    background: colors.black,
  },
  white: {
    foreground: colors.black,
    border: colors.black,
    shadow: colors.black,
    background: colors.white,
  },
}

export const colorScheme: ColorSchemeMapping = {
  ...primitiveColorsScheme,
  ..._.mapValues(emphasisAndNaturalColors, (colorVariants, colorName) => {
    const foreground = isLightBackground(colorName) ? colors.black : colorVariants[50]

    return {
      foreground,
      border: foreground,
      shadow: foreground,
      background: colorVariants[500],
      default: {
        foreground: colors.grey[600],
        border: colors.grey[600],
        shadow: colors.grey[600],
        background: colors.grey[100],
      },
    }
  }),
}
