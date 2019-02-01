import * as _ from 'lodash'

import {
  ColorPalette,
  ContextualColors,
  EmphasisColors,
  NaturalColors,
  ColorSchemeMapping,
} from '../types'

export const naturalColors: NaturalColors = {
  blue: {
    50: '#E5F2FF',
    100: '#CCE5FF',
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#0a84ff',
    600: '#0066CC',
    700: '#004C99',
    800: '#003366',
    900: '#001933',
  },
  green: {
    50: '#EBFEE7',
    100: '#D6FDCE',
    200: '#ADFA9E',
    300: '#84F86D',
    400: '#5CF63C',
    500: '#30e60b',
    600: '#29C309',
    700: '#1E9207',
    800: '#146105',
    900: '#0A3102',
  },
  grey: {
    50: '#F2F2F2',
    100: '#E6E6E6',
    200: '#CCCCCC',
    300: '#B3B3B3',
    400: '#999999',
    500: '#737373',
    600: '#666666',
    700: '#4D4D4D',
    800: '#333333',
    900: '#1A1A1A',
  },
  orange: {
    50: '#FFF4E5',
    100: '#FFEACC',
    200: '#FFD499',
    300: '#FFBF66',
    400: '#FFA933',
    500: '#ff9400',
    600: '#CC7600',
    700: '#995900',
    800: '#663B00',
    900: '#331E00',
  },
  pink: {
    50: '#FFE5FB',
    100: '#FFCCF7',
    200: '#FF99EE',
    300: '#FF66E6',
    400: '#FF33DD',
    500: '#ff1ad9',
    600: '#CC00AA',
    700: '#990080',
    800: '#660055',
    900: '#33002B',
  },
  purple: {
    50: '#F4E5FF',
    100: '#EACCFF',
    200: '#D499FF',
    300: '#BF66FF',
    400: '#A933FF',
    500: '#9400ff',
    600: '#7600CC',
    700: '#590099',
    800: '#3B0066',
    900: '#1E0033',
  },
  teal: {
    50: '#E5FFFF',
    100: '#CCFFFF',
    200: '#99FFFF',
    300: '#66FEFF',
    400: '#33FEFF',
    500: '#00feff',
    600: '#00CBCC',
    700: '#009899',
    800: '#006666',
    900: '#003333',
  },
  red: {
    50: '#FFE5EB',
    100: '#FFCCD7',
    200: '#FF99B0',
    300: '#FF6688',
    400: '#FF3361',
    500: '#ff0039',
    600: '#CC002E',
    700: '#990022',
    800: '#660017',
    900: '#33000B',
  },
  yellow: {
    50: '#FFFDE5',
    100: '#FFFBCC',
    200: '#FFF699',
    300: '#FFF266',
    400: '#FFED33',
    500: '#ffe900',
    600: '#CCBA00',
    700: '#998C00',
    800: '#665D00',
    900: '#332F00',
  },
}

export const emphasisColors: EmphasisColors = {
  primary: {
    50: '#E5F2FF',
    100: '#CCE5FF',
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#0a84ff',
    600: '#0066CC',
    700: '#004C99',
    800: '#003366',
    900: '#001933',
  },
  secondary: naturalColors.grey,
}

export const contextualColors: ContextualColors = {
  text: naturalColors.grey,
  info: naturalColors.blue,
  danger: naturalColors.red,
  success: naturalColors.green,
  warning: naturalColors.yellow,
}

const emphasisAndNaturalColors: EmphasisColors & NaturalColors = {
  ...emphasisColors,
  ...naturalColors,
}

const lightBackgroundColors = ['teal', 'yellow']
const isLightBackground = (colorName: string) => _.includes(lightBackgroundColors, colorName)

export const colors: ColorPalette = {
  ...emphasisAndNaturalColors,
  ...contextualColors,

  black: '#000',
  white: '#fff',
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
