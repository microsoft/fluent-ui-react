import { pxToRem } from './../../lib'
import { colors } from './colors'

//
// VARIABLES
//
export const htmlFontSize = '10px' // what 1rem represents

//
// COLORS
//
export const red = colors.red[500]
export const yellow = colors.yellow[500]
export const green = colors.green[500]
export const grey = colors.grey[500]
export const blue = colors.blue[500]

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
