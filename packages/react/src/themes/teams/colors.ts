import { ColorPalette, ContextualColors, EmphasisColors, NaturalColors } from '../types'

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
    fullWhite: '#ffffff',
    // fullBlack: '#000000',

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
    // dark08: '#484644',
    dark09: '#3b3a39',
    dark10: '#323130',
    dark14: '#292828',
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

// const lightBackgroundColors = ['orange', 'yellow', 'lightGreen', 'postOrange']
// const isLightBackground = (colorName: string) => _.includes(lightBackgroundColors, colorName)

export const colors: ColorPalette = {
  ...emphasisAndNaturalColors,
  ...contextualColors,

  // Primitive colors
  black: '#000',
  white: naturalColors.grey.light14, // siteVariables.white
}

// TODO: update typings
export const colorScheme: any = {
  undefined: {
    foregroundUndefined: colors.grey.light14,
    backgroundUndefined: colors.grey.light02,
    borderUndefined: colors.grey.light02,
    shadowUndefined: colors.grey.light02,

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

  red: {
    // red02: colors.red[500],
    // red57: colors.red[500],
    // lightUndefined: colors.red[50],
    // lightUndefined: colors.red[50],
    // lightUndefined: colors.red[50],
    // lightUndefined: colors.red[50],
    // lightUndefined: colors.red[50],
    // lightUndefined: colors.red[50],
    // lightUndefined: colors.red[50],
    // Undefined: colors.red[50],
    // darkUndefined: colors.red[50],
    // darkerUndefined: colors.red[500],
    // darkestUndefined: colors.red[500],

    foregroundUndefined: colors.red[50],
    backgroundUndefined: colors.red[500],
    borderUndefined: colors.red[500],
    shadowUndefined: colors.red[500],

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

  green: {
    foregroundUndefined: colors.green[50],
    backgroundUndefined: colors.green[500],
    borderUndefined: colors.green[500],
    shadowUndefined: colors.green[500],

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
}
