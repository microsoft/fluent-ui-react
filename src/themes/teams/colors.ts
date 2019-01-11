import * as _ from 'lodash'

import {
  ColorPalette,
  ContextualColors,
  EmphasisColors,
  NaturalColors,
  ColorSchemeMapping,
} from '../types'

export const emphasisColors: EmphasisColors = {
  primary: {
    50: '#F4F4FC',
    100: '#E2E2F6',
    200: '#BDBDE6',
    300: '#8F90C1',
    400: '#6E70AE',
    500: '#6264A7',
    600: '#55578D',
    700: '#4A4C78',
    800: '#414265',
    900: '#33344A',
  },
}

export const naturalColors: NaturalColors = {
  green: {
    50: '#D3E4DB',
    100: '#C4DCCF',
    200: '#B3D1C1',
    300: '#9DC4AF',
    400: '#8CBAA1',
    500: '#7BB093',
    600: '#68A584',
    700: '#579A75',
    800: '#458F67',
    900: '#237B4B',
  },
  grey: {
    50: '#FFFFFF',
    100: '#E6E6E6',
    200: '#CDCCCC',
    300: '#B8B8B8',
    400: '#A2A2A2',
    500: '#8C8C8C',
    600: '#747373',
    700: '#5F5E5E',
    800: '#404040',
    900: '#252424',
  },
  orange: {
    50: '#FEF9F7',
    100: '#FDF0EB',
    200: '#FAE3DA',
    300: '#F8D3C5',
    400: '#F5C6B3',
    500: '#F4B8A1',
    600: '#F2AD92',
    700: '#F0A081',
    800: '#ED8E6A',
    900: '#E97548',
  },
  pink: {
    50: '#E8BDD5',
    100: '#E1ABC8',
    200: '#DA9EBF',
    300: '#D693B8',
    400: '#D28BB2',
    500: '#CA7BA6',
    600: '#C775A3',
    700: '#C06597',
    800: '#BA598F',
    900: '#B34A84',
  },
  red: {
    50: '#F2D1D7',
    100: '#ECBDC5',
    200: '#E8AFB9',
    300: '#E39EAA',
    400: '#DE8D9B',
    500: '#D97B8C',
    600: '#D56B7E',
    700: '#D05B70',
    800: '#CC4B61',
    900: '#C4314B',
  },
  yellow: {
    50: '#FEF5D0',
    100: '#FDF1BE',
    200: '#FDEEAE',
    300: '#FBEA9D',
    400: '#FCE78E',
    500: '#FAE37C',
    600: '#FAE06C',
    700: '#F9DC58',
    800: '#F9D844',
    900: '#F8D22A',
  },
  darkOrange: {
    50: '#F9ECEA',
    100: '#ECBCB3',
    200: '#E29C8F',
    300: '#D97B69',
    400: '#CC4A31',
    500: '#C5472F',
    600: '#B7432D',
    700: '#A73D29',
    800: '#983927',
    900: '#833122',
  },
  lightGreen: {
    50: '#E7F2D9',
    100: '#DFEECD',
    200: '#D8EAC1',
    300: '#CDE3B0',
    400: '#C6DFA4',
    500: '#BDDB96',
    600: '#B4D689',
    700: '#ACD17B',
    800: '#A1CC6B',
    900: '#92C353',
  },
  magenta: {
    50: '#E8D4E0',
    100: '#DEC0D2',
    200: '#D4ADC5',
    300: '#CDA0BC',
    400: '#C491B0',
    500: '#BB7FA4',
    600: '#B26E98',
    700: '#AA5F8D',
    800: '#A14F82',
    900: '#953872',
  },
  postOrange: {
    50: '#FDF6F7',
    100: '#FBF2F3',
    200: '#FAEEEF',
    300: '#F9ECED',
    400: '#F8E9EA',
    500: '#F7E5E6',
    600: '#F7E2E4',
    700: '#F5DEE0',
    800: '#F5DBDD',
    900: '#F3D6D8',
  },
}

export const contextualColors: ContextualColors = {
  text: naturalColors.grey,
}

const emphasisAndNaturalColors: EmphasisColors & NaturalColors = {
  ...emphasisColors,
  ...naturalColors,
}

const lightBackgroundColors = ['orange', 'yellow', 'lightGreen', 'postOrange']
const isLightBackground = (colorName: string) => _.includes(lightBackgroundColors, colorName)

export const colors: ColorPalette = {
  ...emphasisAndNaturalColors,
  ...contextualColors,

  // Primitive colors
  black: naturalColors.grey[900],
  white: naturalColors.grey[50],
}

export const colorScheme: ColorSchemeMapping = _.mapValues(
  emphasisAndNaturalColors,
  (colorVariants, colorName) => {
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
  },
)
