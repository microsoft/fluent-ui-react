import { pxToRem } from '../../../../lib'
import { ColorSchemeMapping } from '../../../types'
import { extendColorScheme } from '../../../colorUtils'

export interface MenuVariables {
  colorScheme: ColorSchemeMapping
  color: string

  backgroundColor: string
  backgroundColorFocus: string
  backgroundColorHover: string
  backgroundColorActive: string

  borderColor: string
  borderColorHover: string
  borderColorActive: string
  borderColorFocus: string

  outlineColorFocus: string
  colorActive: string
  iconOnlyColorActive: string

  colorFocus: string
  underlinedBorderColor: string

  colorDisabled: string
  lineHeightBase: string
  horizontalPadding: string

  verticalBackgroundColor: string
  verticalItemPadding: string
  verticalBoxShadow: string
  verticalDividerMargin: string
  verticalItemBorderWidth: string
  verticalItemBorderColor: string
  verticalPointingBorderColor: string
  verticalBackgroundColorFocus: string

  pointingIndicatorBackgroundColor: string

  underlinedBottomBorderWidth: string
  primaryBorderColor: string

  dividerHeight: string
  borderWidth: string
}

export default (siteVars: any): MenuVariables => {
  return {
    colorScheme: extendColorScheme(siteVars.colorScheme, {
      default: {
        borderActive: siteVars.colors.grey[600],
      },
      primary: {
        foregroundHover: siteVars.colors.white,
        backgroundHover: siteVars.colors.primary[300],
        foregroundActive: siteVars.colors.white,
        borderActive: siteVars.colors.primary[600],
        backgroundActive1: siteVars.colors.primary[500], // it's 600 in the color scheme
        foregroundFocus: siteVars.colors.white,
        backgroundFocus1: siteVars.colors.primary[300],
      },
    }),
    color: siteVars.colors.grey[500],
    colorActive: siteVars.colors.black,
    colorFocus: siteVars.colors.white,
    colorDisabled: undefined,

    borderColor: undefined,
    borderColorHover: undefined,
    borderColorActive: undefined,
    borderColorFocus: siteVars.colors.white,

    outlineColorFocus: siteVars.colors.black,

    backgroundColor: undefined,
    backgroundColorFocus: undefined,
    backgroundColorHover: undefined,
    backgroundColorActive: undefined,

    iconOnlyColorActive: siteVars.colors.primary[600],

    underlinedBorderColor: siteVars.colors.grey[200],

    lineHeightBase: siteVars.lineHeightMedium,
    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)} ${pxToRem(14)} ${pxToRem(18)}`,

    verticalBackgroundColor: siteVars.colors.white,
    verticalItemPadding: `${pxToRem(9)} ${pxToRem(16)} ${pxToRem(9)} ${pxToRem(16)}`,
    verticalBoxShadow: siteVars.shadowLevel3,
    verticalDividerMargin: `${pxToRem(8)} 0`,
    verticalItemBorderWidth: pxToRem(2),
    verticalItemBorderColor: 'transparent',
    verticalPointingBorderColor: siteVars.colorScheme.primary.borderActive, // TODO: why is the default having primary color?!
    verticalBackgroundColorFocus: siteVars.colors.grey[150],

    pointingIndicatorBackgroundColor: siteVars.colors.primary[600],

    underlinedBottomBorderWidth: pxToRem(2),
    primaryBorderColor: siteVars.colors.grey[100],

    dividerHeight: pxToRem(1),
    borderWidth: pxToRem(1),
  }
}
