import { pxToRem } from '../../lib'
import { colors } from './colors'

//
// VARIABLES
//
export const htmlFontSize = '10px' // what 1rem represents

//
// COLORS
//
export { colors, contextualColors, emphasisColors, naturalColors, colorScheme } from './colors'

export const black = colors.black
export const gray02 = '#484644'
export const gray03 = '#605E5C'
export const gray04 = '#979593'
export const gray06 = '#C8C6C4'
export const gray08 = '#E1DFDD'
export const gray09 = '#EDEBE9'
export const gray10 = '#F3F2F1'
export const gray14 = '#FAF9F8'

export const white = colors.white

export const brand = colors.primary[500]
export const brand02 = colors.primary[900]
export const brand04 = '#464775'
export const brand06 = colors.primary[500]
export const brand08 = '#8B8CC7'
export const brand12 = colors.primary[200]
export const brand14 = colors.primary[100]
export const brand16 = colors.primary[50]

export const orange04 = '#CC4A31'
export const magenta = '#B24782'
export const orchid = '#943670'
export const red = '#C4314B'
export const red08 = '#F3D6DB'
export const yellow = '#F8D22A'
export const green = '#92C353'
export const green04 = '#237b4b'

//
// SHADOW LEVELS
//
export const shadowLevel1 = '0 .2rem .4rem -.075rem rgba(0, 0, 0, 0.1)'

//
// FONT SIZES
//
export const fontSizes = {
  smaller: pxToRem(10),
  small: pxToRem(12),
  medium: pxToRem(14),
  large: pxToRem(18),
  larger: pxToRem(24),
}

//
// STATUS COLORS
//
export const successStatusBackgroundColor = green
export const successStatusTextColor = white
export const infoStatusBackgroundColor = 'blue'
export const infoStatusTextColor = white
export const warningStatusBackgroundColor = yellow
export const warningStatusTextColor = white
export const errorStatusBackgroundColor = red
export const errorStatusTextColor = white
export const unknownStatusBackgroundColor = gray04
export const unknownStatusTextColor = white

//
// FONT WEIGHTS
//
export const fontWeightLight = 200
export const fontWeightSemilight = 300
export const fontWeightRegular = 400
export const fontWeightSemibold = 600
export const fontWeightBold = 700

//
// LINE HEIGHTS
//
export const lineHeightBase = 1.4286
export const lineHeightSmall = 1.3333
export const lineHeightExtraSmall = 1.2

//
// SEMANTIC ASSIGNMENTS
//
export const bodyPadding = 0
export const bodyMargin = 0
export const bodyFontFamily =
  '"Segoe UI", "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", Helvetica, Arial, sans-serif'
export const bodyFontSize = '1.4rem'
export const bodyBackground = white
export const bodyColor = black
export const bodyLineHeight = lineHeightBase
