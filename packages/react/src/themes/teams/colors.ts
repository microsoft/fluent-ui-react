import {
  ColorPalette,
  ContextualColors,
  EmphasisColors,
  NaturalColors,
  PrimitiveColors,
} from '../types'
import { ColorVariants, ColorSchemeMapping } from 'src/themes/types'

export const emphasisColors: EmphasisColors = {
  primary: {
    50: '#F4F4FC', // siteVariables.brand16
    100: '#E2E2F6', // siteVariables.brand14
    200: '#BDBDE6', // siteVariables.brand12
    300: '#8F90C1',
    400: '#6E70AE',
    500: '#6264A7', // siteVariables.brand, siteVariables.brand06 (same color?)
    600: '#55578D',
    700: '#4A4C78',
    800: '#414265',
    900: '#33344A', // siteVariables.brand02
    light04: '#464775', // no mapping color
    light08: '#8B8CC7',
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
    900: '#237B4B', // siteVariables.green04
  },
  grey: {
    light02: '#484644',
    light03: '#605E5C',
    light04: '#979593',
    light06: '#C8C6C4',
    light08: '#E1DFDD',
    light09: '#EDEBE9',
    light10: '#F3F2F1',
    light14: '#FAF9F8',

    dark02: '#c8c6c4',
    dark03: '#b3b0ad',
    dark04: '#8a8886',
    dark06: '#605e5c',
    dark08: '#484644',
    dark09: '#3b3a39',
    dark10: '#323130',
    dark14: '#292828',

    50: '#FFFFFF', // siteVariables.white
    100: '#E6E6E6',
    200: '#CDCCCC',
    300: '#B8B8B8',
    400: '#A2A2A2',
    500: '#8C8C8C',
    600: '#747373',
    700: '#5F5E5E',
    800: '#404040',
    900: '#252424', // siteVariables.black
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
    900: '#C4314B', // siteVariables.red
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
    900: '#F8D22A', // siteVariables.yellow
  },
  darkOrange: {
    50: '#F9ECEA',
    100: '#ECBCB3',
    200: '#E29C8F',
    300: '#D97B69',
    400: '#CC4A31', // siteVariables.orange04
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
    900: '#92C353', // siteVariables.green
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

export const primitiveColors: PrimitiveColors = {
  black: '#000',
  white: '#fff',
}

export type ThemeColors = Partial<{
  darkOrange: ColorVariants
  postOrange: ColorVariants
  lightGreen: ColorVariants
  magenta: ColorVariants
}>

export const colors: ColorPalette<ThemeColors> = {
  ...emphasisAndNaturalColors,
  ...contextualColors,
  ...primitiveColors,
}

const createColorScheme = (color: string, customValues = {}) => {
  return {
    foregroundDefault: colors[color][500],
    backgroundDefault: colors[color][50],
    borderDefault: colors[color][500],
    shadowDefault: colors[color][500],

    foregroundHover: colors[color][50],
    backgroundHover: colors[color][500],
    borderHover: colors[color][500],
    shadowHover: colors[color][500],

    foregroundActive: colors[color][50],
    backgroundActive: colors[color][500],
    borderActive: colors[color][500],
    shadowActive: colors[color][500],

    foregroundFocus: colors[color][50],
    backgroundFocus: colors[color][500],
    borderFocus: colors[color][500],
    shadowFocus: colors[color][500],

    foregroundFocusWithin: colors[color][50],
    backgroundFocusWithin: colors[color][500],
    borderFocusWithin: colors[color][500],
    shadowFocusWithin: colors[color][500],

    foregroundDisabled: colors[color][50],
    backgroundDisabled: colors[color][500],
    borderDisabled: colors[color][500],
    shadowDisabled: colors[color][500],
    ...customValues,
  }
}

const lightColorOverrides = {
  backgroundDefault: colors.black,
  foregroundHover: colors.black,
  foregroundActive: colors.black,
  foregroundFocus: colors.black,
  foregroundFocusWithin: colors.black,
  foregroundDisabled: colors.black,
}

export const colorScheme: ColorSchemeMapping = {
  default: createColorScheme('grey', {
    foregroundDefault: colors.grey.light02,
    backgroundDefault: colors.grey[500],
    borderDefault: colors.grey.light08,

    foregroundHover: colors.black,
    backgroundHover: colors.grey.light14,

    foregroundActive: colors.black,
    backgroundActive: colors.grey.light10,

    foregroundFocus: colors.black,
    backgroundFocus: colors.grey.light14,

    foregroundFocusWithin: colors.black,

    foregroundDisabled: colors.black,
  }),
  black: {
    foregroundDefault: colors.black,
    backgroundDefault: colors.white,
    borderDefault: colors.black,
    shadowDefault: colors.black,

    foregroundHover: colors.white,
    backgroundHover: colors.black,
    borderHover: colors.black,
    shadowHover: colors.black,

    foregroundActive: colors.white,
    backgroundActive: colors.black,
    borderActive: colors.black,
    shadowActive: colors.black,

    foregroundFocus: colors.white,
    backgroundFocus: colors.black,
    borderFocus: colors.black,
    shadowFocus: colors.black,

    foregroundFocusWithin: colors.white,
    backgroundFocusWithin: colors.black,
    borderFocusWithin: colors.black,
    shadowFocusWithin: colors.black,

    foregroundDisabled: colors.white,
    backgroundDisabled: colors.black,
    borderDisabled: colors.black,
    shadowDisabled: colors.black,
  },
  white: {
    foregroundDefault: colors.white,
    backgroundDefault: colors.black,
    borderDefault: colors.white,
    shadowDefault: colors.white,

    foregroundHover: colors.black,
    backgroundHover: colors.white,
    borderHover: colors.white,
    shadowHover: colors.white,

    foregroundActive: colors.black,
    backgroundActive: colors.white,
    borderActive: colors.white,
    shadowActive: colors.white,

    foregroundFocus: colors.black,
    backgroundFocus: colors.white,
    borderFocus: colors.white,
    shadowFocus: colors.white,

    foregroundFocusWithin: colors.black,
    backgroundFocusWithin: colors.white,
    borderFocusWithin: colors.white,
    shadowFocusWithin: colors.white,

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.white,
    borderDisabled: colors.white,
    shadowDisabled: colors.white,
  },
  primary: createColorScheme('primary', {
    foregroundHover: colors.white,
    backgroundHover: colors.primary[200],

    foregroundActive: colors.white,
    backgroundActive: colors.primary.light08,
    shadowActive: colors.primary[50],

    foregroundFocus: colors.white,
    backgroundFocus: colors.primary[200],
  }),
  grey: createColorScheme('grey'),
  green: createColorScheme('green'),
  orange: createColorScheme('orange', lightColorOverrides),
  pink: createColorScheme('pink'),
  red: createColorScheme('red'),
  yellow: createColorScheme('yellow', lightColorOverrides),
  darkOrange: createColorScheme('darkOrange'),
  lightGreen: createColorScheme('lightGreen', lightColorOverrides),
  magenta: createColorScheme('magenta'),
  postOrange: createColorScheme('postOrange', lightColorOverrides),
}
