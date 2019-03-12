import { colors, naturalColors } from '../teams/siteVariables'

//
// COLORS
//

export const accessibleYellow = '#ffff01'
export const accessibleGreen = '#3ff23f'
export const accessibleCyan = '#1aebff'

export const red = '#f00'
export const green04 = naturalColors.lightGreen[900]

//
// STATUS COLORS
//
// TODO: bcalvery - color alone is not an adequate means for differentiating in an accessible way.
export const successStatusBackgroundColor = accessibleGreen
export const successStatusTextColor = colors.grey.fullBlack
export const infoStatusBackgroundColor = accessibleCyan
export const infoStatusTextColor = colors.grey.fullBlack
export const warningStatusBackgroundColor = accessibleYellow
export const warningStatusTextColor = colors.grey.fullBlack
export const errorStatusBackgroundColor = red
export const errorStatusTextColor = colors.grey.fullBlack
export const unknownStatusBackgroundColor = colors.white
export const unknownStatusTextColor = colors.grey.fullBlack

//
// SEMANTIC ASSIGNMENTS
//
export const bodyBackground = colors.grey.fullBlack
export const bodyColor = colors.white
