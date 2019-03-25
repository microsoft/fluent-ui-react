import { colors, naturalColors } from '../teams/siteVariables'
import { ColorSchemeMapping } from '../../themes/types'
//
// COLORS
//

export const accessibleYellow = '#ffff01'
export const accessibleGreen = '#3ff23f'
export const accessibleCyan = '#1aebff'

export const red = '#f00'
export const green04 = naturalColors.lightGreen[900]

export const white = colors.white
export const black = colors.black

//
// STATUS COLORS
//
// TODO: bcalvery - color alone is not an adequate means for differentiating in an accessible way.
export const successStatusBackgroundColor = accessibleGreen
export const successStatusTextColor = black
export const infoStatusBackgroundColor = accessibleCyan
export const infoStatusTextColor = black
export const warningStatusBackgroundColor = accessibleYellow
export const warningStatusTextColor = black
export const errorStatusBackgroundColor = red
export const errorStatusTextColor = black
export const unknownStatusBackgroundColor = colors.white
export const unknownStatusTextColor = black

// COLOR SCHEME
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

//
// SEMANTIC ASSIGNMENTS
//
export const bodyBackground = black
export const bodyColor = white
