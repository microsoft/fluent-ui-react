import { colors } from '../teams/siteVariables'
import { ColorSchemeMapping } from '../../themes/types'

export const accessibleYellow = '#ffff01'
export const accessibleGreen = '#3ff23f' // always disabled color in high contrast
export const accessibleCyan = '#1aebff'
export const red = '#f00'

// COLOR SCHEME
const createColorScheme = (customValues = {}) => {
  return {
    foregroundDefault: colors.white,
    backgroundDefault: colors.black,
    borderDefault: colors.white,
    shadowDefault: colors.white,

    foregroundHover: accessibleYellow,
    backgroundHover: colors.black,
    borderHover: accessibleYellow,
    shadowHover: accessibleYellow,

    foregroundActive: accessibleCyan,
    backgroundActive: colors.black,
    borderActive: accessibleCyan,
    shadowActive: accessibleCyan,

    foregroundFocus: colors.black,
    backgroundFocus: accessibleYellow,
    borderFocus: colors.white,
    shadowFocus: colors.white,

    foregroundFocusWithin: colors.black,
    backgroundFocusWithin: accessibleYellow,
    borderFocusWithin: colors.white,
    shadowFocusWithin: colors.white,

    foregroundDisabled: colors.black,
    backgroundDisabled: accessibleGreen,
    borderDisabled: colors.black,
    shadowDisabled: colors.black,
    ...customValues,
  }
}

export const colorScheme: ColorSchemeMapping = {
  default: {
    foregroundDefault: colors.white,
    foregroundDefault1: colors.white,
    foregroundDefault2: colors.white,
    foregroundDefault3: colors.white,

    backgroundDefault: colors.black,
    backgroundDefault1: colors.black,
    backgroundDefault2: colors.black,
    backgroundDefault3: colors.black,

    borderDefault1: colors.white,
    borderDefault2: colors.white,
    borderDefault: colors.white, // buttons

    shadowDefault: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.black,

    backgroundHover: accessibleYellow,
    backgroundHover1: accessibleYellow,

    borderHover: accessibleYellow,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleYellow,
    borderPressed: accessibleYellow,
    shadowPressed: undefined,

    foregroundActive: accessibleCyan,
    foregroundActive1: accessibleCyan,

    backgroundActive1: accessibleCyan,
    backgroundActive: colors.black,

    // active border no change (just copied)
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,
    borderActive: accessibleCyan, // buttons

    shadowActive: undefined,

    foregroundFocus: colors.black,
    foregroundFocus1: colors.black,
    foregroundFocus2: colors.black,
    foregroundFocus3: colors.black,

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocus: accessibleCyan,
    borderFocusWithin: accessibleCyan,
    shadowFocus: accessibleCyan,

    foregroundDisabled1: accessibleGreen,
    foregroundDisabled: colors.black,

    backgroundDisabled: accessibleGreen,
    backgroundDisabled1: colors.black,

    borderDisabled: accessibleGreen,
    shadowDisabled: undefined,
  },
  primary: {
    foregroundDefault: colors.white,
    foregroundDefault1: accessibleYellow,
    foregroundDefault2: accessibleYellow,
    foregroundDefault3: accessibleYellow,

    backgroundDefault: colors.white,
    backgroundDefault1: colors.black,
    backgroundDefault2: colors.black,
    backgroundDefault3: colors.black,

    borderDefault1: colors.white,
    borderDefault2: colors.white,
    borderDefault: colors.white, // buttons

    shadowDefault: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.black,

    borderHover: accessibleYellow,

    backgroundHover: accessibleYellow, // in the button we have 50 :(
    backgroundHover1: accessibleYellow,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleYellow, // it's 900 on the button - 800 is same as hover
    borderPressed: accessibleYellow,
    shadowPressed: undefined,

    foregroundActive: accessibleCyan,
    foregroundActive1: colors.black,
    foregroundActive2: accessibleCyan,

    backgroundActive1: accessibleCyan,
    backgroundActive: colors.black,

    // active border no change (just copied)
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,
    borderActive: accessibleCyan, // buttons

    shadowActive: undefined,

    foregroundFocus: colors.black,
    foregroundFocus1: colors.black,
    foregroundFocus2: colors.black,
    foregroundFocus3: colors.black,

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocus: accessibleCyan,
    borderFocus1: accessibleCyan,
    borderFocusWithin: accessibleCyan,
    shadowFocus: undefined,

    foregroundDisabled1: accessibleGreen,
    foregroundDisabled: colors.black,

    backgroundDisabled: accessibleGreen,
    backgroundDisabled1: colors.black,

    borderDisabled: accessibleGreen,
    shadowDisabled: undefined,
  },
  black: createColorScheme(),
  white: createColorScheme(),
  grey: createColorScheme(),
  green: createColorScheme(),
  orange: createColorScheme(),
  pink: createColorScheme(),
  red: createColorScheme(),
  yellow: createColorScheme(),
}
