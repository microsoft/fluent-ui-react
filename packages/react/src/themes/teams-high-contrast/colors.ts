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
}

export const colorSchemeWIP = {
  default: {
    foregroundDefault1: colors.white,
    foregroundDefault2: colors.white,
    foregroundDefault3: colors.white,
    foregroundDefault4: colors.white,

    backgroundDefault1: colors.black,
    backgroundDefault2: colors.black,
    backgroundDefault3: colors.black,
    backgroundDefault4: colors.black,

    borderDefault1: colors.white,
    borderDefault2: colors.white,
    borderDefault3: colors.white, // buttons

    shadowDefault: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.black,

    backgroundHover1: accessibleYellow,
    backgroundHover2: accessibleYellow,

    borderHover3: accessibleYellow,

    foregroundActive1: accessibleCyan,
    foregroundActive2: accessibleCyan,

    backgroundActive2: accessibleCyan,
    backgroundActive1: colors.black,

    // active border no change (just copied)
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,
    borderActive3: accessibleCyan, // buttons

    foregroundFocus1: colors.black,
    foregroundFocus2: colors.black,
    foregroundFocus3: colors.black,
    foregroundFocus4: colors.black,

    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,
    backgroundFocus4: accessibleCyan,

    borderFocus: accessibleCyan,
    borderFocusWithin: accessibleCyan,
    borderFocus1: accessibleCyan,

    foregroundDisabled1: accessibleGreen,
    foregroundDisabled2: colors.black,

    backgroundDisabled1: accessibleGreen,
    backgroundDisabled2: colors.black,

    borderDisabled: accessibleGreen,
    shadowDisabled: undefined,
  },
  primary: {
    foregroundDefault1: accessibleYellow,
    foregroundDefault2: accessibleYellow,
    foregroundDefault3: colors.white,
    foregroundDefault4: accessibleYellow,

    backgroundDefault1: colors.white,
    backgroundDefault2: colors.black,
    backgroundDefault3: colors.black,
    backgroundDefault4: colors.black,
    backgroundDefault5: colors.black,

    borderDefault1: colors.white,
    borderDefault2: colors.white,
    // borderDefault3: colors.grey[200], // buttons

    foregroundHover: colors.black,

    borderHover3: accessibleYellow,

    backgroundHover1: accessibleYellow, // in the button we have 50 :(
    backgroundHover2: accessibleYellow,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleYellow, // it's 900 on the button - 800 is same as hover
    borderPressed: accessibleYellow,

    foregroundActive1: accessibleCyan,
    foregroundActive2: colors.white,
    foregroundActive3: accessibleCyan,

    backgroundActive1: accessibleCyan,
    borderFocus: accessibleCyan, // input field only

    // TODO added by me
    backgroundActive2: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    foregroundFocus4: colors.black,
    borderDisabled: accessibleGreen,

    foregroundDisabled1: accessibleGreen,
    foregroundDisabled2: colors.black,

    backgroundDisabled1: accessibleGreen,
    backgroundDisabled2: colors.black,
  },
}
