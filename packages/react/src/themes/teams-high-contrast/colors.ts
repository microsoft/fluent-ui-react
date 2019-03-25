import { accessibleYellow, accessibleGreen, accessibleCyan, black, white } from './siteVariables'
import { ColorSchemeMapping } from 'src/themes/types'

const createColorScheme = (customValues = {}) => {
  return {
    foregroundDefault: white,
    backgroundDefault: black,
    borderDefault: white,
    shadowDefault: white,

    foregroundHover: accessibleYellow,
    backgroundHover: black,
    borderHover: accessibleYellow,
    shadowHover: accessibleYellow,

    foregroundActive: accessibleCyan,
    backgroundActive: black,
    borderActive: accessibleCyan,
    shadowActive: accessibleCyan,

    foregroundFocus: black,
    backgroundFocus: accessibleYellow,
    borderFocus: white,
    shadowFocus: white,

    foregroundFocusWithin: black,
    backgroundFocusWithin: accessibleYellow,
    borderFocusWithin: white,
    shadowFocusWithin: white,

    foregroundDisabled: black,
    backgroundDisabled: accessibleGreen,
    borderDisabled: black,
    shadowDisabled: black,
    ...customValues,
  }
}

export const colorScheme: ColorSchemeMapping = {
  default: createColorScheme(),
  black: createColorScheme(),
  white: createColorScheme(),
  primary: createColorScheme(),
  grey: createColorScheme(),
  green: createColorScheme(),
  orange: createColorScheme(),
  pink: createColorScheme(),
  red: createColorScheme(),
  yellow: createColorScheme(),
  darkOrange: createColorScheme(),
  lightGreen: createColorScheme(),
  magenta: createColorScheme(),
  postOrange: createColorScheme(),
}
