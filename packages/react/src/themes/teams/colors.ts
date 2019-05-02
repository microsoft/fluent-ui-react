import {
  ColorPalette,
  EmphasisColors,
  NaturalColors,
  PrimitiveColors,
  ColorSchemeMapping,
  ColorVariants,
} from '../types'

export const emphasisColors: EmphasisColors = {
  primary: {
    50: '#F4F4FC', // siteVariables.brand16, same as prev
    100: '#E5E5F1', // brand15
    200: '#E2E2F6', // 100, light brand14, dark theme brand02
    300: '#BDBDE6', // 200, light brand12, dark theme brand04
    400: '#A6A7DC', // dark theme brand06 (dark06)
    500: '#8B8CC7', // light08, dark08
    600: '#6264A7', // 500, siteVariables.brand, siteVariables.brand06, dark theme brand, brand12
    700: '#585A96', // light05
    800: '#464775', // light04, dark14
    900: '#33344A', // siteVariables.brand02, dark theme brand16, same as 900 prev
    1000: '#373644',
  },
}

export const naturalColors: NaturalColors = {
  grey: {
    0: '#FFFFFF', // white
    25: '#FCFCFB', // old $app-density-message-initial-hover-focus
    50: '#FAF9F8', // light14
    100: '#F3F2F1', // light10, old $app-density-message-background-replay-hover-focus
    150: '#EDEBE9', // light09, old $app-density-border-gray
    200: '#E1DFDD', // light08
    250: '#C8C6C4', // light06, dark02
    300: '#B3B0AD', // dark03
    350: '#979593', // light04
    400: '#8A8886', // dark04
    450: '#605E5C', // light03, dark06, $app-gray-20-theme-agnostic, old $message-highlight-color-darktheme
    500: '#484644', // light02, dark08
    550: '#3B3A39', // dark09
    600: '#323131', // dark10, in call audio only grid slot 4
    650: '#2D2C2C', // in call audio only grid slot 3
    700: '#292828', // dark14, in call audio only grid slot 2, old $app-density-message-background-initial-hover-focus-darktheme
    750: '#252423', // 900 - different [#252424] , old $app-black, in call audio only grid slot 1, old $app-density-message-background-replay-hover-focus-darktheme
    800: '#201F1F', // app black darktheme, in call title bar, in call audio only pip
    850: '#1B1A1A', // in call background behind presented doc, old $app-density-message-border-darktheme
    900: '#11100F', // dark theme borders
    1000: '#000000', // black
  },
  orange: {
    50: '#F9ECEA', // darkOrange[50]
    100: '#EFDBD3', // app orange14
    200: '#EDC2A7', // old message highlight border
    300: '#E97548', // orange[900]
    400: '#CC4A31', // app orange04 darkOrange[400]
    500: '#BD432C', // app orange03
    600: '#A33D2A', // app orange02
    700: '#833122', // app orange01 darkOrange[900]
    800: '#664134', // app orange14 dark
    900: '#51332C', // app orange16 dark
  },
  pink: {
    50: '#FCF2FA', // app orchid opacity, oof message, oof banner bg
    100: '#F1DFEE', // new oof banner border default theme
    200: '#EC6FAE', // new oof text for better contrast in dark theme
    300: '#DE569A', // magenta dark theme
    400: '#E959D9', // oof presence icon dark theme
    500: '#B4009E', // merge oof presence icon, odl $app-magenta
    600: '#943670', // old $app-orchid, use for oof banner text
    700: undefined, //
    800: '#3E2D3B', // old @app orchid opacity, oof message bg, oof banner bg
    900: '#1F191D', // new oof banner border dark theme
  },
  red: {
    50: '#FCF4F6', // app red 10
    100: '#F3D6D8', // postOrange[900] app red 08
    200: '#F9526B', // new, error banner string
    300: '#E73550', // merge old @app-red-dark-theme
    400: '#C4314B', // red[900], app red 06, siteVariables.red
    500: '#A72037', // app red 04
    600: '#8E192E', // app red 02
    700: '#4F222B', // old app red 10 dark
    800: '#3E1F25', // new error banner bg
    900: '#1E040A', // app red08 dark
  },
  green: {
    50: undefined,
    100: undefined,
    200: '#92C353', // lightGreen[900] old $app-green, available presence dark theme, siteVars.green
    300: '#6BB700', // new Available presence
    400: '#13A40E', // dual presence Available
    500: undefined,
    600: '#237B4B', // old $app-green-04, siteVariables.green04, green[900]
    700: undefined,
    800: undefined,
    900: undefined,
  },
  yellow: {
    50: undefined,
    100: '#FBF6D9', // old message highlight color
    200: undefined,
    300: '#F9EC02', // old acc critical ufd icon color
    400: '#F8D22A', // old siteVariables.yellow, $app-yellow, yellow[900]
    500: '#FFB900', // old $bcast pre live color
    600: '#FFAA44', // new away presence
    700: undefined,
    800: undefined,
    900: undefined,
  },
}

const emphasisAndNaturalColors: EmphasisColors & NaturalColors = {
  ...emphasisColors,
  ...naturalColors,
}

export const primitiveColors: PrimitiveColors = {
  black: '#000',
  white: '#fff',
}

export const transparentColors = {
  silver: {
    100: undefined,
    200: 'rgba(255,255,255,0.75)',
    300: 'rgba(255,255,255,0.65)',
    400: 'rgba(255,255,255,0.5)',
    500: undefined,
    600: 'rgba(255,255,255,0.3)',
    700: undefined,
    800: 'rgba(255,255,255,0.15)',
    900: 'rgba(255,255,255,0.05)',
  },
  ruby: {
    100: undefined,
    200: undefined,
    300: undefined,
    400: undefined,
    500: 'rgba(196,49,75,0.9)',
    600: 'rgba(167,32,55,0.9)',
    700: 'rgba(142,25,46,0.9)',
    800: undefined,
    900: undefined,
  },
  onyx: {
    100: 'rgba(59,58,57,0.9)',
    200: undefined,
    300: undefined,
    400: undefined,
    500: 'rgba(41,40,40,0.9)',
    600: undefined,
    700: undefined,
    800: 'rgba(27,26,26,0.9)',
    900: undefined,
  },
}

type TransparentColors = Partial<{
  silver: ColorVariants
  ruby: ColorVariants
  onyx: ColorVariants
}>

export const colors: ColorPalette<TransparentColors> = {
  ...emphasisAndNaturalColors,
  ...primitiveColors,
  ...transparentColors,
}

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

const lightColorOverrides = {
  backgroundDefault: colors.black,
  foregroundHover: colors.black,
  foregroundActive: colors.black,
  foregroundFocus: colors.black,
  foregroundFocusWithin: colors.black,
  foregroundDisabled: colors.black,
}

export const colorScheme: ColorSchemeMapping = {
  default: {
    foregroundDefault: colors.grey[750],
    foregroundDefault1: colors.grey[500],
    foregroundDefault2: colors.grey[450],
    foregroundDefault3: colors.white,

    backgroundDefault: colors.white,
    backgroundDefault1: colors.grey[50],
    backgroundDefault2: colors.grey[100],
    backgroundDefault3: colors.grey[150],

    borderDefault1: colors.grey[150],
    borderDefault2: colors.grey[200],
    borderDefault: colors.grey[200], // buttons

    shadowDefault: colors.black, // opacity 10%
    shadowHover: colors.black,

    foregroundHover: colors.grey[750],

    backgroundHover: colors.grey[100],
    backgroundHover1: colors.grey[150],

    borderHover: colors.grey[250], // buttons

    foregroundPressed: colors.grey[750],
    backgroundPressed: colors.grey[200],
    borderPressed: colors.grey[250],
    shadowPressed: undefined,

    foregroundActive: colors.grey[750],
    foregroundActive1: colors.white,

    backgroundActive: colors.grey[100],
    backgroundActive1: colors.grey[150],

    borderActive1: colors.grey[150],
    borderActive2: colors.grey[200],
    borderActive: colors.grey[200], // buttons

    shadowActive: undefined,

    foregroundFocus: colors.grey[750],
    foregroundFocus1: colors.grey[500],
    foregroundFocus2: colors.grey[450],
    foregroundFocus3: colors.white,

    backgroundFocus: colors.white,
    backgroundFocus1: colors.grey[50],
    backgroundFocus2: colors.grey[100],
    backgroundFocus3: colors.grey[150],

    borderFocus: colors.black,
    borderFocusWithin: colors.white,
    shadowFocus: undefined,

    foregroundDisabled1: colors.grey[250],
    foregroundDisabled: colors.grey[250],

    backgroundDisabled1: colors.grey[150],
    backgroundDisabled: colors.grey[150],

    borderDisabled: colors.grey[150],
    shadowDisabled: undefined,
  },
  primary: {
    foregroundDefault: colors.primary[600],
    foregroundDefault1: colors.primary[600],
    foregroundDefault2: colors.primary[700],
    foregroundDefault3: colors.primary[200],

    backgroundDefault: colors.primary[600],
    backgroundDefault1: colors.primary[100],
    backgroundDefault2: colors.primary[900],
    backgroundDefault3: colors.primary[1000],

    borderDefault1: colors.primary[200],
    borderDefault2: colors.primary[300],
    borderDefault: colors.grey[200],

    shadowDefault: colors.black,
    shadowHover: colors.black,

    foregroundHover: colors.primary[600],

    borderHover: colors.primary[300],

    backgroundHover: colors.primary[700],
    backgroundHover2: colors.primary[50],

    foregroundPressed: colors.primary[800],
    backgroundPressed: colors.primary[800], // it's 900 on the button - 800 is same as hover
    borderPressed: colors.primary[300],
    shadowPressed: undefined,

    foregroundActive: colors.primary[600],
    foregroundActive1: colors.primary[600],
    foregroundActive2: colors.primary[200],

    backgroundActive: colors.primary[600],
    backgroundActive1: colors.primary[600],

    borderActive1: colors.primary[200],
    borderActive2: colors.primary[300],
    borderActive: colors.grey[200],

    shadowActive: undefined,

    foregroundFocus: colors.primary[600],
    foregroundFocus1: colors.primary[600],
    foregroundFocus2: colors.primary[700],
    foregroundFocus3: colors.primary[200],

    backgroundFocus: colors.primary[600],
    backgroundFocus1: colors.primary[100],
    backgroundFocus2: colors.primary[900],
    backgroundFocus3: colors.primary[1000],

    borderFocus: colors.black,
    borderFocus1: colors.primary[600], // only input
    borderFocusWithin: colors.white,
    shadowFocus: undefined,

    foregroundDisabled1: colors.grey[250],
    foregroundDisabled: colors.grey[250],

    backgroundDisabled1: colors.grey[150],
    backgroundDisabled: colors.grey[150],

    borderDisabled: colors.grey[150],
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
  orange: createColorScheme('orange', lightColorOverrides),
  pink: createColorScheme('pink'),
  red: createColorScheme('red'),
  yellow: createColorScheme('yellow', lightColorOverrides),
}

export const availableColors = [
  'default',
  'black',
  'white',
  'primary',
  'grey',
  'red',
  'yellow',
  'green',
  'pink',
  'orange',
]

export const isValidColor = (color: string): boolean => {
  return color && availableColors.indexOf(color) >= 0
}

export const getColorSchemeKey = (color: string, primary?: boolean): string => {
  return color && isValidColor(color) ? color : primary ? 'primary' : 'default'
}

export const getColorScheme = (
  colorScheme: ColorSchemeMapping,
  color: string,
  primary?: boolean,
) => {
  return colorScheme[getColorSchemeKey(color, primary)]
}
