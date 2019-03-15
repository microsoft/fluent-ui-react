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

export const gray02 = colors.grey[800]
export const gray03 = colors.grey[700]
export const gray04 = colors.grey[600]
export const gray06 = colors.grey[500]
export const gray08 = colors.grey[400]
export const gray09 = colors.grey[300]
export const gray10 = colors.grey[200]
export const gray14 = colors.grey[100]

export const red = colors.red[900]
export const red08 = colors.red[100]
export const red10 = colors.red[50]

export const brand04 = '#464775' // no mapping color
export const brand08 = '#8B8CC7' // no mapping color

export const magenta = '#B24782' // no mapping color
export const orchid = '#943670' // no mapping color

//
// SHADOW LEVELS
//
export const shadowLevel1 = '0 .2rem .4rem -.075rem rgba(0, 0, 0, .1)'
export const shadowLevel2 = '0 .4rem 0.7rem -0.1rem rgba(0, 0, 0, .1)'
export const shadowLevel3 = '0 .8rem 1rem -0.2rem rgba(0, 0, 0, .1)'
export const shadowLevel4 = '0 .6rem 1.8rem -0.4rem rgba(0, 0, 0, .1)'

export const shadowLevel1Darker = '0 .2rem .4rem -.075rem rgba(0, 0, 0, 0.5)'

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
export const successStatusBackgroundColor = colors.grey[50] // $app-white
export const successStatusTextColor = colors.green[900] // $app-green-04
export const infoStatusBackgroundColor = colors.grey[300] // $app-gray09
export const infoStatusTextColor = colors.grey[900] // $app-black
export const warningStatusBackgroundColor = colors.grey[50] // $app-white
export const warningStatusTextColor = colors.grey[700]
export const errorStatusBackgroundColor = colors.red[50] // $app-red-10
export const errorStatusTextColor = colors.red[900] // $app-red
export const unknownStatusBackgroundColor = colors.grey[50] // $app-white
export const unknownStatusTextColor = gray04
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
export const lineHeightSmaller = 1.2
export const lineHeightSmall = 1.3333
export const lineHeightMedium = 1.4286
export const lineHeightLarge = 1.3333
export const lineHeightLarger = 1.3333

//
// SEMANTIC ASSIGNMENTS
//
export const bodyPadding = 0
export const bodyMargin = 0
export const bodyFontFamily =
  '"Segoe UI", "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", Helvetica, Arial, sans-serif'
export const bodyFontSize = '1.4rem'
export const bodyBackground = colors.white
export const bodyColor = colors.grey[900]
export const bodyLineHeight = lineHeightMedium
