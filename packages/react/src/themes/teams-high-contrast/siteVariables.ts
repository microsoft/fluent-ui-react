import { colors, naturalColors } from '../teams/siteVariables'
export { colorScheme } from './colors'
//
// COLORS
//

export const accessibleYellow = '#ffff01'
export const accessibleGreen = '#3ff23f'
export const accessibleCyan = '#1aebff'

export const red = '#f00'
export const green04 = naturalColors.lightGreen[900]

export const white = colors.white
export const black = colors.black

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
// SEMANTIC ASSIGNMENTS
//
export const bodyBackground = black
export const bodyColor = white
