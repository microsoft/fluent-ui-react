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

export const colorSchemeWIP = {
  default: {
    foregroundDefault1: colors.white,
    foregroundDefault2: colors.grey[250],
    foregroundDefault3: colors.grey[300],
    foregroundDefault4: colors.white,

    backgroundDefault1: colors.grey[650],
    backgroundDefault2: colors.grey[700],
    backgroundDefault3: colors.grey[800],
    backgroundDefault4: colors.grey[550],

    borderDefault1: colors.grey[850], // menu borders are too dark?
    borderDefault2: colors.grey[900],
    borderDefault3: colors.grey[450], // buttons

    shadowDefault: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.white,

    backgroundHover1: colors.grey[550],
    backgroundHover2: colors.grey[550],

    borderHover3: colors.grey[400],

    foregroundActive1: colors.white,
    foregroundActive2: colors.primary[400],

    backgroundActive2: colors.grey[500], // backgroundActive1 swapped with 2
    backgroundActive1: colors.grey[800],

    // active border no change (just copied)
    borderActive1: colors.grey[850],
    borderActive2: colors.grey[900],
    borderActive3: colors.grey[450], // buttons

    foregroundFocus1: colors.white,
    foregroundFocus2: colors.grey[250],
    foregroundFocus3: colors.grey[300],
    foregroundFocus4: colors.white,

    backgroundFocus1: colors.grey[650],
    backgroundFocus2: colors.grey[700],
    backgroundFocus3: colors.grey[800],
    backgroundFocus4: colors.grey[550],

    borderFocus: colors.black,
    borderFocusWithin: colors.white,
    borderFocus1: colors.primary[400],

    foregroundDisabled1: colors.grey[450],
    foregroundDisabled2: colors.grey[450],

    backgroundDisabled1: colors.grey[550],
    backgroundDisabled2: colors.grey[550],

    borderDisabled: colors.grey[550],
    shadowDisabled: undefined,
  },
  primary: {
    foregroundDefault1: colors.primary[400],
    foregroundDefault2: colors.primary[400],
    foregroundDefault3: colors.primary[400],
    foregroundDefault4: colors.primary[200],

    backgroundDefault1: colors.primary[600],
    backgroundDefault2: colors.primary[900],
    backgroundDefault3: colors.primary[900],
    backgroundDefault4: colors.primary[1000],
    backgroundDefault5: colors.primary[600],

    borderDefault1: colors.primary[800],
    borderDefault2: colors.primary[800],
    // borderDefault3: colors.grey[200], // buttons

    foregroundHover: colors.primary[400],

    borderHover3: colors.primary[400],

    backgroundHover1: colors.primary[500], // in the button we have 50 :(
    backgroundHover2: colors.primary[900],

    foregroundPressed: colors.primary[200],
    backgroundPressed: colors.primary[700], // it's 900 on the button - 800 is same as hover
    borderPressed: colors.primary[800],

    foregroundActive1: colors.primary[400],
    foregroundActive2: colors.primary[400],
    foregroundActive3: colors.primary[200],

    backgroundActive1: colors.primary[400],
    borderFocus: colors.primary[400], // input field only

    // TODO added by me
    backgroundActive2: colors.primary[400],
    backgroundFocus2: colors.primary[300],
    foregroundFocus4: colors.white,
    // copied from the default
    borderDisabled: colors.grey[550],
    foregroundDisabled1: colors.grey[450],
    foregroundDisabled2: colors.grey[450],
    backgroundDisabled1: colors.grey[550],
    backgroundDisabled2: colors.grey[550],
  },
}
