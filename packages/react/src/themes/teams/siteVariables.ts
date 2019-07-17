import { pxToRem } from '../../lib'
import { colors } from './colors'

//
// COLORS
//
export {
  colors,
  contextualColors,
  naturalColors,
  primitiveColors,
  colorScheme,
  transparentColors,
} from './colors'

//
// BORDER STYLES
//
export const borderWidth = '1px'
export const borderRadius = '2px'
export const focusInnerBorderColor = colors.white
export const focusOuterBorderColor = colors.black

//
// SHADOW LEVELS
//
export const shadowLevel1 = '0 .2rem .4rem -.075rem rgba(0, 0, 0, .1)'
export const shadowLevel2 = '0 .4rem 0.7rem -0.1rem rgba(0, 0, 0, .1)'
export const shadowLevel3 = '0 .8rem 1rem -0.2rem rgba(0, 0, 0, .1)'
export const shadowLevel4 = '0 .6rem 1.8rem -0.4rem rgba(0, 0, 0, .1)'

export const shadowLevel1Darker = '0 .2rem .4rem -.075rem rgba(0, 0, 0, 0.5)'

//
// GLOW GRADIENT
// Glow is used in certain cases to highlight a selected item
//
// TODO: is this different for different themes?
export const glowGradientBottom =
  'linear-gradient(90deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(135deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 70%),linear-gradient(180deg,rgba(60,62,93,.6) 70%,rgba(60,62,93,0) 94%),linear-gradient(225deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 73%),linear-gradient(270deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(0deg,rgba(98,100,167,.75) 6%,rgba(98,100,167,0) 70%)'

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
export const bodyFontSize = fontSizes.medium
export const bodyBackground = colors.white
export const bodyColor = colors.grey[750]
export const bodyLineHeight = lineHeightMedium
