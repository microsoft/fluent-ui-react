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

    foregroundPressed: colors[color][50],
    backgroundPressed: colors[color][600],
    borderPressed: colors[color][600],
    shadowPressed: colors[color][600],

    foregroundDisabled: colors[color][50],
    backgroundDisabled: colors[color][600],
    borderDisabled: colors[color][600],
    shadowDisabled: colors[color][600],
    ...customValues,
  }
}

export const colorScheme: ColorSchemeMapping = {
  default: {
    foregroundDefault: colors.white,
    foregroundDefault1: colors.grey[250],
    foregroundDefault3: colors.grey[300],
    foregroundDefault4: colors.white,

    backgroundDefault: colors.grey[650],
    backgroundDefault1: colors.grey[700],
    backgroundDefault2: colors.grey[800],
    backgroundDefault3: colors.grey[550],

    borderDefault1: colors.grey[850],
    borderDefault2: colors.grey[900],
    borderDefault: colors.grey[450], // buttons

    shadowDefault: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.white,

    backgroundHover: colors.grey[550],
    backgroundHover2: colors.grey[550],

    borderHover: colors.grey[400],

    foregroundPressed: colors.white,
    backgroundPressed: colors.grey[500],
    borderPressed: colors.grey[450],
    shadowPressed: undefined,

    foregroundActive: colors.white,
    foregroundActive1: colors.white,

    backgroundActive: colors.grey[800], // OK
    backgroundActive1: colors.grey[500],

    borderActive1: colors.grey[850],
    borderActive2: colors.grey[900],
    borderActive: colors.grey[450], // buttons

    shadowActive: undefined,

    foregroundFocus: colors.white,
    foregroundFocus1: colors.grey[250],
    foregroundFocus2: colors.grey[300],
    foregroundFocus3: colors.white,

    backgroundFocus: colors.grey[650],
    backgroundFocus1: colors.grey[700],
    backgroundFocus2: colors.grey[800],
    backgroundFocus3: colors.grey[550],

    borderFocus: colors.black,
    borderFocusWithin: colors.white,
    shadowFocus: undefined,

    foregroundDisabled1: colors.grey[450],
    foregroundDisabled: colors.grey[450],

    backgroundDisabled1: colors.grey[550],
    backgroundDisabled: colors.grey[550],

    borderDisabled: colors.grey[550],
    shadowDisabled: undefined,
  },
  primary: {
    foregroundDefault: colors.primary[400],
    foregroundDefault1: colors.primary[400],
    foregroundDefault2: colors.primary[400],
    foregroundDefault3: colors.primary[200],

    backgroundDefault: colors.primary[600],
    backgroundDefault1: colors.primary[900],
    backgroundDefault2: colors.primary[900],
    backgroundDefault3: colors.primary[1000],

    borderDefault1: colors.primary[800],
    borderDefault2: colors.primary[800],
    borderDefault: colors.grey[450],

    shadowDefault: colors.black,
    shadowHover: colors.black,

    foregroundHover: colors.primary[400],

    borderHover: colors.primary[600],

    backgroundHover: colors.primary[500],
    backgroundHover1: colors.primary[900],

    foregroundPressed: colors.primary[200],
    backgroundPressed: colors.primary[700],
    borderPressed: colors.primary[800],
    shadowPressed: undefined,

    foregroundActive: colors.primary[400],
    foregroundActive1: colors.primary[400],
    foregroundActive2: colors.primary[200],

    backgroundActive: colors.primary[400],
    backgroundActive1: colors.primary[400],

    // active border no change (just copied)
    borderActive1: colors.grey[850],
    borderActive2: colors.grey[900],
    borderActive: colors.grey[450], // buttons

    shadowActive: undefined,

    foregroundFocus: colors.primary[400],
    foregroundFocus1: colors.primary[400],
    foregroundFocus2: colors.primary[400],
    foregroundFocus3: colors.primary[200],

    backgroundFocus: colors.primary[600],
    backgroundFocus1: colors.primary[900],
    backgroundFocus2: colors.primary[900],
    backgroundFocus3: colors.primary[1000],

    borderFocus: colors.black,
    borderFocus1: colors.primary[400], // only input
    borderFocusWithin: colors.white,
    shadowFocus: undefined,

    foregroundDisabled1: colors.grey[450],
    foregroundDisabled: colors.grey[450],

    backgroundDisabled1: colors.grey[550],
    backgroundDisabled: colors.grey[550],

    borderDisabled: colors.grey[550],
    shadowDisabled: undefined,
  },
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

    foregroundPressed: colors.white,
    backgroundPressed: colors.black,
    borderPressed: colors.black,
    shadowPressed: colors.black,

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

    foregroundPressed: colors.black,
    backgroundPressed: colors.white,
    borderPressed: colors.white,
    shadowPressed: colors.white,

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.white,
    borderDisabled: colors.white,
    shadowDisabled: colors.white,
  },
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
