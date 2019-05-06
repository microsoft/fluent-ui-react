import { colors } from '../teams/siteVariables'
import { ColorSchemeMapping } from '../../themes/types'

const createColorScheme = (color: string, customValues = {}) => {
  return {
    foreground: colors[color][600],
    background: colors[color][50],
    border: colors[color][600],
    shadow: colors[color][600],

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
    foreground: colors.white,
    foreground1: colors.grey[250],
    foreground3: colors.grey[300],
    foreground4: colors.white,

    background: colors.grey[650],
    background1: colors.grey[700],
    background2: colors.grey[800],
    background3: colors.grey[550],

    border1: colors.grey[850],
    border2: colors.grey[900],
    border: colors.grey[450], // buttons

    shadow: colors.black, // opacity 25%
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
  brand: {
    foreground: colors.brand[400],
    foreground1: colors.brand[400],
    foreground2: colors.brand[400],
    foreground3: colors.brand[200],

    background: colors.brand[600],
    background1: colors.brand[900],
    background2: colors.brand[900],
    background3: colors.brand[1000],

    border1: colors.brand[800],
    border2: colors.brand[800],
    border: colors.grey[450],

    shadow: colors.black,
    shadowHover: colors.black,

    foregroundHover: colors.brand[400],

    borderHover: colors.brand[600],

    backgroundHover: colors.brand[500],
    backgroundHover1: colors.brand[900],

    foregroundPressed: colors.brand[200],
    backgroundPressed: colors.brand[700],
    borderPressed: colors.brand[800],
    shadowPressed: undefined,

    foregroundActive: colors.brand[400],
    foregroundActive1: colors.brand[400],
    foregroundActive2: colors.brand[200],

    backgroundActive: colors.brand[400],
    backgroundActive1: colors.brand[400],

    // active border no change (just copied)
    borderActive1: colors.brand[800],
    borderActive2: colors.brand[800],
    borderActive: colors.grey[450], // buttons

    shadowActive: undefined,

    foregroundFocus: colors.brand[400],
    foregroundFocus1: colors.brand[400],
    foregroundFocus2: colors.brand[400],
    foregroundFocus3: colors.brand[200],

    backgroundFocus: colors.brand[600],
    backgroundFocus1: colors.brand[900],
    backgroundFocus2: colors.brand[900],
    backgroundFocus3: colors.brand[1000],

    borderFocus: colors.black,
    borderFocus1: colors.brand[400], // only input
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
    foreground: colors.black,
    background: colors.white,
    border: colors.black,
    shadow: colors.black,

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
    foreground: colors.white,
    background: colors.black,
    border: colors.white,
    shadow: colors.white,

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
    background: colors.black,
    foregroundHover: colors.black,
    foregroundActive: colors.black,
    foregroundFocus: colors.black,
    foregroundFocusWithin: colors.black,
    foregroundDisabled: colors.black,
  }),
  pink: createColorScheme('pink'),
  red: createColorScheme('red'),
  yellow: createColorScheme('yellow', {
    background: colors.black,
    foregroundHover: colors.black,
    foregroundActive: colors.black,
    foregroundFocus: colors.black,
    foregroundFocusWithin: colors.black,
    foregroundDisabled: colors.black,
  }),
}
