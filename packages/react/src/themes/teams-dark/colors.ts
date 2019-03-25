import { colors } from '../teams/siteVariables'
import { ColorSchemeMapping } from 'src/themes/types'

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
  orange: createColorScheme('orange', {
    backgroundDefault: colors.black,
    foregroundHover: colors.black,
    foregroundActive: colors.black,
    foregroundFocus: colors.black,
    foregroundFocusWithin: colors.black,
    foregroundDisabled: colors.black,
  }),
  pink: createColorScheme('pink'),
  red: createColorScheme('red'),
  yellow: createColorScheme('yellow', {
    backgroundDefault: colors.black,
    foregroundHover: colors.black,
    foregroundActive: colors.black,
    foregroundFocus: colors.black,
    foregroundFocusWithin: colors.black,
    foregroundDisabled: colors.black,
  }),
  darkOrange: createColorScheme('darkOrange'),
  lightGreen: createColorScheme('lightGreen', {
    backgroundDefault: colors.black,
    foregroundHover: colors.black,
    foregroundActive: colors.black,
    foregroundFocus: colors.black,
    foregroundFocusWithin: colors.black,
    foregroundDisabled: colors.black,
  }),
  magenta: createColorScheme('magenta'),
  postOrange: createColorScheme('postOrange', {
    backgroundDefault: colors.black,
    foregroundHover: colors.black,
    foregroundActive: colors.black,
    foregroundFocus: colors.black,
    foregroundFocusWithin: colors.black,
    foregroundDisabled: colors.black,
  }),
}
