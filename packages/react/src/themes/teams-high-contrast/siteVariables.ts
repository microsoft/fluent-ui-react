import { colors, naturalColors } from '../teams/siteVariables'

//
// COLORS
//
export const black = '#000'
export const white = '#fff'

export const accessibleYellow = '#ffff01'
export const accessibleGreen = '#3ff23f' // always disabled color in high contrast
export const accessibleCyan = '#1aebff'

export const red = '#f00'
export const green04 = naturalColors.lightGreen[900]

//
// STATUS COLORS
//
// TODO: bcalvery - color alone is not an adequate means for differentiating in an accessible way.
export const successStatusBackgroundColor = accessibleGreen
export const successStatusTextColor = black
export const infoStatusBackgroundColor = accessibleCyan
export const infoStatusTextColor = black
export const warningStatusBackgroundColor = accessibleYellow
export const warningStatusTextColor = black
export const errorStatusBackgroundColor = red
export const errorStatusTextColor = black
export const unknownStatusBackgroundColor = colors.white
export const unknownStatusTextColor = black

//
// BORDER STYLES
//
export const focusInnerBorderColor = colors.black
export const focusOuterBorderColor = colors.white

//
// SEMANTIC ASSIGNMENTS
//
export const bodyBackground = black
export const bodyColor = colors.white
