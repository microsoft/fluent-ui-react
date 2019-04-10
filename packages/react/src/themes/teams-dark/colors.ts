import { colors } from '../teams/siteVariables'
import { ColorSchemeMapping } from '../../themes/types'

const createColorScheme = (color: string, customValues = {}) => {
  return {
    foregroundDefault: colors[color][600],
    backgroundDefault: colors[color][50],
    borderDefault: colors[color][600],
    shadowDefault: colors[color][600],

    foregroundHover: colors[color][50],
    backgroundHover: colors[color][600],
    borderHover: colors[color][600],
    shadowHover: colors[color][600],

    foregroundActive: colors[color][50],
    backgroundActive: colors[color][600],
    borderActive: colors[color][600],
    shadowActive: colors[color][600],

    foregroundFocus: colors[color][50],
    backgroundFocus: colors[color][600],
    borderFocus: colors[color][600],
    shadowFocus: colors[color][600],

    foregroundFocusWithin: colors[color][50],
    backgroundFocusWithin: colors[color][600],
    borderFocusWithin: colors[color][600],
    shadowFocusWithin: colors[color][600],

    foregroundDisabled: colors[color][50],
    backgroundDisabled: colors[color][600],
    borderDisabled: colors[color][600],
    shadowDisabled: colors[color][600],
    ...customValues,
  }
}

export const colorScheme: ColorSchemeMapping = {
  default: createColorScheme('grey', {
    foregroundDefault: colors.grey[500],
    backgroundDefault: colors.grey[400],
    borderDefault: colors.grey[500],

    foregroundHover: colors.black,
    backgroundHover: colors.grey[500],

    foregroundActive: colors.black,
    backgroundActive: colors.grey[500],

    foregroundFocus: colors.black,
    backgroundFocus: colors.grey[500],

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
    backgroundHover: colors.primary[300],

    foregroundActive: colors.white,
    backgroundActive: colors.primary[500],
    shadowActive: colors.primary[50],

    foregroundFocus: colors.white,
    backgroundFocus: colors.primary[300],
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
}
