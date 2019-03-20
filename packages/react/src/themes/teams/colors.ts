import { ColorPalette, ContextualColors, EmphasisColors, NaturalColors } from '../types'
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

export type ThemeColors = Partial<{
  darkOrange: ColorVariants
  postOrange: ColorVariants
  lightGreen: ColorVariants
  magenta: ColorVariants
}>

export const colors: ColorPalette<ThemeColors> = {
  ...emphasisAndNaturalColors,
  ...contextualColors,

  // Primitive colors
  black: '#000',
  white: '#fff', // siteVariables.white
}

export const colorScheme: ColorSchemeMapping = {
  default: {
    foregroundDefault: colors.grey.light14,
    backgroundDefault: colors.grey.light02,
    borderDefault: colors.grey.light02,
    shadowDefault: colors.grey.light02,

    foregroundHover: colors.grey.light14,
    backgroundHover: colors.grey.light02,
    borderHover: colors.grey.light02,
    shadowHover: colors.grey.light02,

    foregroundActive: colors.grey.light14,
    backgroundActive: colors.grey.light02,
    borderActive: colors.grey.light02,
    shadowActive: colors.grey.light02,

    foregroundFocus: colors.grey.light14,
    backgroundFocus: colors.grey.light02,
    borderFocus: colors.grey.light02,
    shadowFocus: colors.grey.light02,

    foregroundFocusWithin: colors.grey.light14,
    backgroundFocusWithin: colors.grey.light02,
    borderFocusWithin: colors.grey.light02,
    shadowFocusWithin: colors.grey.light02,

    foregroundDisabled: colors.grey.light14,
    backgroundDisabled: colors.grey.light02,
    borderDisabled: colors.grey.light02,
    shadowDisabled: colors.grey.light02,
  },
  black: {
    foregroundDefault: colors.white,
    backgroundDefault: colors.black,
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
    foregroundDefault: colors.black,
    backgroundDefault: colors.white,
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
  primary: {
    foregroundDefault: colors.primary[500],
    backgroundDefault: colors.primary[50],
    borderDefault: colors.primary[500],
    shadowDefault: colors.primary[500],

    foregroundHover: colors.white,
    backgroundHover: colors.primary[200],
    borderHover: colors.primary[500],
    shadowHover: colors.primary[500],

    foregroundActive: colors.white,
    backgroundActive: colors.primary.light08,
    borderActive: colors.primary[500],
    shadowActive: colors.primary[50],

    foregroundFocus: colors.white,
    backgroundFocus: colors.primary[200],
    borderFocus: colors.primary[500],
    shadowFocus: colors.primary[500],

    foregroundFocusWithin: colors.primary[50],
    backgroundFocusWithin: colors.primary[500],
    borderFocusWithin: colors.primary[500],
    shadowFocusWithin: colors.primary[500],

    foregroundDisabled: colors.primary[50],
    backgroundDisabled: colors.primary[500],
    borderDisabled: colors.primary[500],
    shadowDisabled: colors.primary[500],
  },
  grey: {
    foregroundDefault: colors.grey.light02,
    backgroundDefault: colors.grey[500],
    borderDefault: colors.grey[500],
    shadowDefault: colors.grey[500],

    foregroundHover: colors.black,
    backgroundHover: colors.grey.light14,
    borderHover: colors.grey[500],
    shadowHover: colors.grey[500],

    foregroundActive: colors.black,
    backgroundActive: colors.grey.light10,
    borderActive: colors.grey[500],
    shadowActive: colors.grey[500],

    foregroundFocus: colors.black,
    backgroundFocus: colors.grey.light14,
    borderFocus: colors.grey[500],
    shadowFocus: colors.grey[500],

    foregroundFocusWithin: colors.black,
    backgroundFocusWithin: colors.grey[500],
    borderFocusWithin: colors.grey[500],
    shadowFocusWithin: colors.grey[500],

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.grey[500],
    borderDisabled: colors.grey[500],
    shadowDisabled: colors.grey[500],
  },
  green: {
    foregroundDefault: colors.green[50],
    backgroundDefault: colors.green[500],
    borderDefault: colors.green[500],
    shadowDefault: colors.green[500],

    foregroundHover: colors.green[50],
    backgroundHover: colors.green[500],
    borderHover: colors.green[500],
    shadowHover: colors.green[500],

    foregroundActive: colors.green[50],
    backgroundActive: colors.green[500],
    borderActive: colors.green[500],
    shadowActive: colors.green[500],

    foregroundFocus: colors.green[50],
    backgroundFocus: colors.green[500],
    borderFocus: colors.green[500],
    shadowFocus: colors.green[500],

    foregroundFocusWithin: colors.green[50],
    backgroundFocusWithin: colors.green[500],
    borderFocusWithin: colors.green[500],
    shadowFocusWithin: colors.green[500],

    foregroundDisabled: colors.green[50],
    backgroundDisabled: colors.green[500],
    borderDisabled: colors.green[500],
    shadowDisabled: colors.green[500],
  },
  orange: {
    foregroundDefault: colors.black,
    backgroundDefault: colors.orange[500],
    borderDefault: colors.orange[500],
    shadowDefault: colors.orange[500],

    foregroundHover: colors.black,
    backgroundHover: colors.orange[500],
    borderHover: colors.orange[500],
    shadowHover: colors.orange[500],

    foregroundActive: colors.black,
    backgroundActive: colors.orange[500],
    borderActive: colors.orange[500],
    shadowActive: colors.orange[500],

    foregroundFocus: colors.black,
    backgroundFocus: colors.orange[500],
    borderFocus: colors.orange[500],
    shadowFocus: colors.orange[500],

    foregroundFocusWithin: colors.black,
    backgroundFocusWithin: colors.orange[500],
    borderFocusWithin: colors.orange[500],
    shadowFocusWithin: colors.orange[500],

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.orange[500],
    borderDisabled: colors.orange[500],
    shadowDisabled: colors.orange[500],
  },
  pink: {
    foregroundDefault: colors.pink[50],
    backgroundDefault: colors.pink[500],
    borderDefault: colors.pink[500],
    shadowDefault: colors.pink[500],

    foregroundHover: colors.pink[50],
    backgroundHover: colors.pink[500],
    borderHover: colors.pink[500],
    shadowHover: colors.pink[500],

    foregroundActive: colors.pink[50],
    backgroundActive: colors.pink[500],
    borderActive: colors.pink[500],
    shadowActive: colors.pink[500],

    foregroundFocus: colors.pink[50],
    backgroundFocus: colors.pink[500],
    borderFocus: colors.pink[500],
    shadowFocus: colors.pink[500],

    foregroundFocusWithin: colors.pink[50],
    backgroundFocusWithin: colors.pink[500],
    borderFocusWithin: colors.pink[500],
    shadowFocusWithin: colors.pink[500],

    foregroundDisabled: colors.pink[50],
    backgroundDisabled: colors.pink[500],
    borderDisabled: colors.pink[500],
    shadowDisabled: colors.pink[500],
  },
  red: {
    // red02: colors.red[500],
    // red57: colors.red[500],
    // lightDefault: colors.red[50],
    // lightDefault: colors.red[50],
    // lightDefault: colors.red[50],
    // lightDefault: colors.red[50],
    // lightDefault: colors.red[50],
    // lightDefault: colors.red[50],
    // lightDefault: colors.red[50],
    // Default: colors.red[50],
    // darkDefault: colors.red[50],
    // darkerDefault: colors.red[500],
    // darkestDefault: colors.red[500],

    foregroundDefault: colors.red[50],
    backgroundDefault: colors.red[500],
    borderDefault: colors.red[500],
    shadowDefault: colors.red[500],

    foregroundHover: colors.red[50],
    backgroundHover: colors.red[500],
    borderHover: colors.red[500],
    shadowHover: colors.red[500],

    foregroundActive: colors.red[50],
    backgroundActive: colors.red[500],
    borderActive: colors.red[500],
    shadowActive: colors.red[500],

    foregroundFocus: colors.red[50],
    backgroundFocus: colors.red[500],
    borderFocus: colors.red[500],
    shadowFocus: colors.red[500],

    foregroundFocusWithin: colors.red[50],
    backgroundFocusWithin: colors.red[500],
    borderFocusWithin: colors.red[500],
    shadowFocusWithin: colors.red[500],

    foregroundDisabled: colors.red[50],
    backgroundDisabled: colors.red[500],
    borderDisabled: colors.red[500],
    shadowDisabled: colors.red[500],
  },
  yellow: {
    foregroundDefault: colors.black,
    backgroundDefault: colors.yellow[500],
    borderDefault: colors.yellow[500],
    shadowDefault: colors.yellow[500],

    foregroundHover: colors.black,
    backgroundHover: colors.yellow[500],
    borderHover: colors.yellow[500],
    shadowHover: colors.yellow[500],

    foregroundActive: colors.black,
    backgroundActive: colors.yellow[500],
    borderActive: colors.yellow[500],
    shadowActive: colors.yellow[500],

    foregroundFocus: colors.black,
    backgroundFocus: colors.yellow[500],
    borderFocus: colors.yellow[500],
    shadowFocus: colors.yellow[500],

    foregroundFocusWithin: colors.black,
    backgroundFocusWithin: colors.yellow[500],
    borderFocusWithin: colors.yellow[500],
    shadowFocusWithin: colors.yellow[500],

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.yellow[500],
    borderDisabled: colors.yellow[500],
    shadowDisabled: colors.yellow[500],
  },
  darkOrange: {
    foregroundDefault: colors.darkOrange[50],
    backgroundDefault: colors.darkOrange[500],
    borderDefault: colors.darkOrange[500],
    shadowDefault: colors.darkOrange[500],

    foregroundHover: colors.darkOrange[50],
    backgroundHover: colors.darkOrange[500],
    borderHover: colors.darkOrange[500],
    shadowHover: colors.darkOrange[500],

    foregroundActive: colors.darkOrange[50],
    backgroundActive: colors.darkOrange[500],
    borderActive: colors.darkOrange[500],
    shadowActive: colors.darkOrange[500],

    foregroundFocus: colors.darkOrange[50],
    backgroundFocus: colors.darkOrange[500],
    borderFocus: colors.darkOrange[500],
    shadowFocus: colors.darkOrange[500],

    foregroundFocusWithin: colors.darkOrange[50],
    backgroundFocusWithin: colors.darkOrange[500],
    borderFocusWithin: colors.darkOrange[500],
    shadowFocusWithin: colors.darkOrange[500],

    foregroundDisabled: colors.darkOrange[50],
    backgroundDisabled: colors.darkOrange[500],
    borderDisabled: colors.darkOrange[500],
    shadowDisabled: colors.darkOrange[500],
  },
  lightGreen: {
    foregroundDefault: colors.black,
    backgroundDefault: colors.lightGreen[500],
    borderDefault: colors.lightGreen[500],
    shadowDefault: colors.lightGreen[500],

    foregroundHover: colors.black,
    backgroundHover: colors.lightGreen[500],
    borderHover: colors.lightGreen[500],
    shadowHover: colors.lightGreen[500],

    foregroundActive: colors.black,
    backgroundActive: colors.lightGreen[500],
    borderActive: colors.lightGreen[500],
    shadowActive: colors.lightGreen[500],

    foregroundFocus: colors.black,
    backgroundFocus: colors.lightGreen[500],
    borderFocus: colors.lightGreen[500],
    shadowFocus: colors.lightGreen[500],

    foregroundFocusWithin: colors.black,
    backgroundFocusWithin: colors.lightGreen[500],
    borderFocusWithin: colors.lightGreen[500],
    shadowFocusWithin: colors.lightGreen[500],

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.lightGreen[500],
    borderDisabled: colors.lightGreen[500],
    shadowDisabled: colors.lightGreen[500],
  },
  magenta: {
    foregroundDefault: colors.magenta[50],
    backgroundDefault: colors.magenta[500],
    borderDefault: colors.magenta[500],
    shadowDefault: colors.magenta[500],

    foregroundHover: colors.magenta[50],
    backgroundHover: colors.magenta[500],
    borderHover: colors.magenta[500],
    shadowHover: colors.magenta[500],

    foregroundActive: colors.magenta[50],
    backgroundActive: colors.magenta[500],
    borderActive: colors.magenta[500],
    shadowActive: colors.magenta[500],

    foregroundFocus: colors.magenta[50],
    backgroundFocus: colors.magenta[500],
    borderFocus: colors.magenta[500],
    shadowFocus: colors.magenta[500],

    foregroundFocusWithin: colors.magenta[50],
    backgroundFocusWithin: colors.magenta[500],
    borderFocusWithin: colors.magenta[500],
    shadowFocusWithin: colors.magenta[500],

    foregroundDisabled: colors.magenta[50],
    backgroundDisabled: colors.magenta[500],
    borderDisabled: colors.magenta[500],
    shadowDisabled: colors.magenta[500],
  },
  postOrange: {
    foregroundDefault: colors.black,
    backgroundDefault: colors.postOrange[500],
    borderDefault: colors.postOrange[500],
    shadowDefault: colors.postOrange[500],

    foregroundHover: colors.black,
    backgroundHover: colors.postOrange[500],
    borderHover: colors.postOrange[500],
    shadowHover: colors.postOrange[500],

    foregroundActive: colors.black,
    backgroundActive: colors.postOrange[500],
    borderActive: colors.postOrange[500],
    shadowActive: colors.postOrange[500],

    foregroundFocus: colors.black,
    backgroundFocus: colors.postOrange[500],
    borderFocus: colors.postOrange[500],
    shadowFocus: colors.postOrange[500],

    foregroundFocusWithin: colors.black,
    backgroundFocusWithin: colors.postOrange[500],
    borderFocusWithin: colors.postOrange[500],
    shadowFocusWithin: colors.postOrange[500],

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.postOrange[500],
    borderDisabled: colors.postOrange[500],
    shadowDisabled: colors.postOrange[500],
  },
}
