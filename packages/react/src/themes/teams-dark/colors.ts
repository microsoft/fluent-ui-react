import { categoryColors, colors } from '../teams/siteVariables'
import { ColorSchemeMapping, CategoryColorSchemeMapping } from '../../themes/types'

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
    foreground2: colors.grey[300],
    foreground3: colors.white,

    background: colors.grey[650],
    background1: colors.grey[700],
    background2: colors.grey[800],
    background3: colors.grey[550],
    background4: colors.grey[600],

    border: colors.grey[450], // buttons
    border1: colors.grey[850],
    border2: colors.grey[900],
    border3: colors.grey[650],

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black, // opacity 25%

    foregroundHover: colors.white,
    foregroundHover1: colors.white,

    backgroundHover: colors.grey[550],
    backgroundHover1: colors.grey[550],

    borderHover: colors.grey[400],

    foregroundPressed: colors.white,
    backgroundPressed: colors.grey[500],
    borderPressed: colors.grey[400],
    shadowPressed: undefined,

    foregroundActive: colors.white,
    foregroundActive1: colors.white,

    backgroundActive: colors.grey[800],
    backgroundActive1: colors.grey[500],

    borderActive: colors.grey[450], // buttons
    borderActive1: colors.grey[850],
    borderActive2: colors.grey[900],
    borderActive3: colors.grey[650],

    shadowActive: undefined,

    foregroundFocus: colors.white,
    foregroundFocus1: colors.grey[250],
    foregroundFocus2: colors.grey[300],
    foregroundFocus3: colors.white,

    backgroundFocus: colors.grey[650],
    backgroundFocus1: colors.grey[700],
    backgroundFocus2: colors.grey[800],
    backgroundFocus3: colors.grey[550],

    borderFocusWithin: colors.black,
    borderFocus: colors.white,

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
    foreground4: colors.white,

    background: colors.brand[600],
    background1: colors.brand[900],
    background2: colors.brand[900],
    background3: colors.brand[1000],
    background4: colors.grey[650],

    border: colors.grey[450],
    border1: colors.brand[800],
    border2: colors.brand[800],

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.brand[400],
    foregroundHover1: colors.white,

    borderHover: colors.brand[600],

    backgroundHover: colors.brand[500],
    backgroundHover1: colors.brand[900],

    foregroundPressed: colors.brand[200],
    foregroundPressed1: colors.white,
    backgroundPressed: colors.brand[700],
    borderPressed: colors.brand[800],
    shadowPressed: undefined,

    foregroundActive: colors.brand[400],
    foregroundActive1: colors.brand[400],
    foregroundActive2: colors.brand[200],

    backgroundActive: colors.brand[400],
    backgroundActive1: colors.brand[400],

    // active border no change (just copied)
    borderActive: colors.grey[450], // buttons
    borderActive1: colors.brand[800],
    borderActive2: colors.brand[800],

    shadowActive: undefined,

    foregroundFocus: colors.brand[400],
    foregroundFocus1: colors.brand[400],
    foregroundFocus2: colors.brand[400],
    foregroundFocus3: colors.brand[200],
    foregroundFocus4: colors.white,

    backgroundFocus: colors.brand[600],
    backgroundFocus1: colors.brand[900],
    backgroundFocus2: colors.brand[900],
    backgroundFocus3: colors.brand[1000],

    borderFocus: colors.white,
    borderFocusWithin: colors.black,
    borderFocus1: colors.brand[400], // only input
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
  grey: createColorScheme('grey', { foreground: colors.grey[250] }),
  green: createColorScheme('green', {
    background: colors.white,
  }),
  orange: createColorScheme('orange'),
  pink: createColorScheme('pink'),
  red: {
    foreground: colors.red[200],
    foreground1: colors.white,
    foreground2: colors.grey[800],

    background: colors.red[300],
    background1: colors.red[800],
    background2: colors.ruby[500],
    background3: colors.red[400],

    border: colors.red[900],

    shadow: undefined,

    foregroundHover: colors.white,
    backgroundHover: colors.ruby[600],
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

    foregroundPressed: colors.white,
    backgroundPressed: colors.ruby[600],
    borderPressed: undefined,
    shadowPressed: undefined,

    foregroundDisabled: undefined,
    backgroundDisabled: undefined,
    borderDisabled: undefined,
    shadowDisabled: undefined,
  },
  yellow: createColorScheme('yellow', {
    background: colors.yellow[100],
  }),
}

const createCategoryColorScheme = (color: string, customValues = {}) => {
  return {
    foreground1: categoryColors[color][250],
    foreground2: categoryColors[color][550],
    background: categoryColors[color][800],
    ...customValues,
  }
}

export const categoryColorSchemes: CategoryColorSchemeMapping = {
  redDark: createCategoryColorScheme('redDark'),
  red: createCategoryColorScheme('red'),
  orangeDark: createCategoryColorScheme('orangeDark'),
  orange: createCategoryColorScheme('orange'),
  orangeLight: createCategoryColorScheme('orangeLight'),
  yellowDark: createCategoryColorScheme('yellowDark'),
  yellow: createCategoryColorScheme('yellow'),
  brown: createCategoryColorScheme('brown'),
  oliveDark: createCategoryColorScheme('oliveDark'),
  olive: createCategoryColorScheme('olive'),
  greenDark: createCategoryColorScheme('greenDark'),
  green: createCategoryColorScheme('green'),
  tealDark: createCategoryColorScheme('tealDark'),
  teal: createCategoryColorScheme('teal'),
  tealLight: createCategoryColorScheme('tealLight'),
  blueDark: createCategoryColorScheme('blueDark'),
  blue: createCategoryColorScheme('blue'),
  purpleDark: createCategoryColorScheme('purpleDark'),
  purple: createCategoryColorScheme('purple'),
  maroon: createCategoryColorScheme('maroon'),
  pink: createCategoryColorScheme('pink'),
  smokeDark: createCategoryColorScheme('smokeDark'),
  smokeLight: createCategoryColorScheme('smokeLight'),
  steelDark: createCategoryColorScheme('steelDark'),
  steelLight: createCategoryColorScheme('steelLight'),
}
