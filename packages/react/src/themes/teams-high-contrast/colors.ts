import { colors } from '../teams/siteVariables'
import { ColorSchemeMapping } from '../../themes/types'

export const accessibleYellow = '#ffff01'
export const accessibleGreen = '#3ff23f' // always disabled color in high contrast
export const accessibleCyan = '#1aebff'
export const red = '#f00'

// COLOR SCHEME
const createColorScheme = (customValues = {}) => {
  return {
    foreground: colors.white,
    background: colors.black,
    border: colors.white,
    shadow: colors.white,

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

    foregroundPressed: colors.black,
    backgroundPressed: accessibleYellow,
    borderPressed: colors.white,
    shadowPressed: colors.white,

    foregroundDisabled: colors.black,
    backgroundDisabled: accessibleGreen,
    borderDisabled: colors.black,
    shadowDisabled: colors.black,
    ...customValues,
  }
}

export const colorScheme: ColorSchemeMapping = {
  default: {
    foreground: colors.white,
    foreground1: colors.white,
    foreground2: colors.white,
    foreground3: colors.white,
    foreground4: colors.black,
    foreground5: colors.white,

    background: colors.black,
    background1: colors.black,
    background2: colors.black,
    background3: colors.black,
    background4: colors.white,

    border: colors.white,
    border1: colors.white,
    border2: colors.white,
    border3: colors.white,

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black, // opacity 25%

    foregroundHover: colors.black,
    foregroundHover1: colors.black,

    backgroundHover: accessibleYellow,
    backgroundHover1: accessibleYellow,

    borderHover: accessibleYellow,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleYellow,
    borderPressed: accessibleYellow,
    shadowPressed: undefined,

    foregroundActive: accessibleCyan,
    foregroundActive1: colors.black,

    backgroundActive: colors.black,
    backgroundActive1: accessibleCyan,

    borderActive: accessibleCyan, // buttons
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,
    borderActive3: accessibleCyan,

    shadowActive: undefined,

    foregroundFocus: colors.black,
    foregroundFocus1: colors.black,
    foregroundFocus2: colors.black,
    foregroundFocus3: colors.black,

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocusWithin: colors.black,
    borderFocus: accessibleCyan,

    shadowFocus: undefined,

    foregroundDisabled1: accessibleGreen,
    foregroundDisabled: colors.black,

    backgroundDisabled: accessibleGreen,
    backgroundDisabled1: colors.black,

    borderDisabled: accessibleGreen,
    shadowDisabled: undefined,
  },
  brand: {
    foreground: colors.white,
    foreground1: accessibleYellow,
    foreground2: accessibleYellow,
    foreground3: accessibleYellow,
    foreground4: colors.black,

    background: colors.white,
    background1: colors.black,
    background2: colors.black,
    background3: colors.black,

    border: colors.white, // buttons
    border1: colors.white,
    border2: colors.white,

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.black,
    foregroundHover1: colors.black,

    borderHover: accessibleYellow,

    backgroundHover: accessibleYellow,
    backgroundHover1: accessibleYellow,

    foregroundPressed: colors.black,
    foregroundPressed1: colors.black,
    backgroundPressed: accessibleYellow,
    borderPressed: accessibleYellow,
    shadowPressed: undefined,

    foregroundActive: accessibleCyan,
    foregroundActive1: colors.black,
    foregroundActive2: accessibleCyan,

    backgroundActive: colors.black,
    backgroundActive1: accessibleCyan,

    borderActive: accessibleCyan, // buttons
    borderActive1: accessibleCyan,
    borderActive2: accessibleCyan,

    shadowActive: undefined,

    foregroundFocus: colors.black,
    foregroundFocus1: colors.black,
    foregroundFocus2: colors.black,
    foregroundFocus3: colors.black,
    foregroundFocus4: colors.black,

    backgroundFocus: accessibleCyan,
    backgroundFocus1: accessibleCyan,
    backgroundFocus2: accessibleCyan,
    backgroundFocus3: accessibleCyan,

    borderFocus: accessibleCyan,
    borderFocusWithin: colors.black,
    borderFocus1: accessibleCyan,
    shadowFocus: undefined,

    foregroundDisabled: colors.black,
    foregroundDisabled1: accessibleGreen,

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
  red: {
    foreground: colors.white,
    foreground1: colors.black,
    foreground2: colors.black,

    background: colors.white,
    background1: colors.white,
    background2: colors.black,
    background3: colors.white,

    border: colors.white,

    shadow: undefined,

    foregroundHover: colors.black,
    backgroundHover: accessibleYellow,
    borderHover: undefined,
    shadowHover: undefined,

    foregroundActive: undefined,
    backgroundActive: undefined,
    borderActive: undefined,
    shadowActive: undefined,

    foregroundFocus: undefined,
    backgroundFocus: undefined,
    borderFocus: undefined,
    shadowFocus: undefined,

    foregroundPressed: colors.black,
    backgroundPressed: accessibleYellow,
    borderPressed: undefined,
    shadowPressed: undefined,

    foregroundDisabled: undefined,
    backgroundDisabled: undefined,
    borderDisabled: undefined,
    shadowDisabled: undefined,
  },
  yellow: createColorScheme(),
}
