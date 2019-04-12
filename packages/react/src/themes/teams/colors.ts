import {
  ColorPalette,
  ContextualColors,
  EmphasisColors,
  NaturalColors,
  PrimitiveColors,
} from '../types'
import { ColorSchemeMapping } from 'src/themes/types'

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

export const contextualColors: ContextualColors = {
  text: naturalColors.grey,
}

const emphasisAndNaturalColors: EmphasisColors & NaturalColors = {
  ...emphasisColors,
  ...naturalColors,
}

export const primitiveColors: PrimitiveColors = {
  black: '#000',
  white: '#fff',
}

export const colors: ColorPalette = {
  ...emphasisAndNaturalColors,
  ...contextualColors,
  ...primitiveColors,
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

const lightColorOverrides = {
  backgroundDefault: colors.black,
  foregroundHover: colors.black,
  foregroundActive: colors.black,
  foregroundFocus: colors.black,
  foregroundFocusWithin: colors.black,
  foregroundDisabled: colors.black,
}

export const colorScheme: ColorSchemeMapping = {
  default: createColorScheme('grey', {
    foregroundDefault: colors.grey[500],
    backgroundDefault: colors.grey[400],
    borderDefault: colors.grey[200],

    foregroundHover: colors.black,
    backgroundHover: colors.grey[50],

    foregroundActive: colors.black,
    backgroundActive: colors.grey[100],

    foregroundFocus: colors.black,
    backgroundFocus: colors.grey[50],

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
  orange: createColorScheme('orange', lightColorOverrides),
  pink: createColorScheme('pink'),
  red: createColorScheme('red'),
  yellow: createColorScheme('yellow', lightColorOverrides),
}
