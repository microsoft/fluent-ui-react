import { pxToRem } from '../../lib'

//
// VARIABLES
//
export const htmlFontSize = '14px' // what 1rem represents

//
// COLORS
//
const blackRgbaFormat = (alpha: number): string => `rgba(37, 36, 36, ${alpha})`
export const black = blackRgbaFormat(1)
export const gray01 = blackRgbaFormat(0.95)
export const gray02 = blackRgbaFormat(0.75)
export const gray03 = blackRgbaFormat(0.65)
export const gray04 = blackRgbaFormat(0.5)
export const gray06 = blackRgbaFormat(0.3)
export const gray08 = blackRgbaFormat(0.15)
export const gray09 = '#EDEBE9'
export const gray10 = '#F3F2F1'
export const gray12 = blackRgbaFormat(0.05)
export const gray14 = '#FAF9F8'
export const fontBlack = '#252424'

export const white = '#FFF'

export const brand = '#6264A7'
export const brand02 = '#33344A'
export const brand04 = '#464775'
export const brand06 = '#6264A7'
export const brand08 = '#8B8CC7'
export const brand12 = '#BDBDE6'
export const brand14 = '#E2E2F6'
export const brand16 = '#F4F4FC'

export const orange04 = '#CC4A31'
export const magenta = '#B24782'
export const orchid = '#943670'
export const red = '#C4314B'
export const red08 = '#F3D6DB'
export const yellow = '#F8D22A'
export const green = '#92C353'
export const green04 = '#237b4b'

//
// SEMANTIC ASSIGNMENTS
//
export const bodyPadding = 0
export const bodyMargin = 0
export const bodyFontFamily = '"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif'
export const bodyFontSize = '1rem'
export const bodyColor = black
export const bodyLineHeight = pxToRem(20)

//
// Font sizes
//
export const fontSizeExtraLarge = pxToRem(24)
export const fontSizeLarge = pxToRem(18)
export const fontSizeBase = pxToRem(14)
export const fontSizeSmall = pxToRem(12)
export const fontSizeExtraSmall = pxToRem(10)

//
// Font weights
//
export const fontWeightLight = 200
export const fontWeightSemilight = 300
export const fontWeightRegular = 400
export const fontWeightSemibold = 600
export const fontWeightBold = 700

//
// Line Heights
//
export const lineHeightLarge = 1.4
export const lineHeightBase = 1.33
export const lineHeightSmall = 1.2
