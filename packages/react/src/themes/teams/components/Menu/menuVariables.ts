import { pxToRem } from '../../../../lib'
import { ColorSchemeMapping } from '../../../types'

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

  outlineFocus: string
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

  underlinedBottomBorderWidth: string
  primaryBorderColor: string

  dividerHeight: string
  borderWidth: string
}

export default (siteVars: any): MenuVariables => {
  return {
    colorScheme: siteVars.colorScheme,
    color: siteVars.colors.grey.light02,
    colorActive: siteVars.colors.black,
    colorFocus: siteVars.colors.white,
    colorDisabled: siteVars.colors.grey.light06,

    borderColor: undefined,
    borderColorHover: undefined,
    borderColorActive: undefined,
    borderColorFocus: siteVars.colors.white,

    outlineFocus: siteVars.colors.black,

    backgroundColor: undefined,
    backgroundColorFocus: undefined,
    backgroundColorHover: undefined,
    backgroundColorActive: undefined,

    iconOnlyColorActive: siteVars.colors.primary[500],

    underlinedBorderColor: siteVars.colors.grey.light08,

    lineHeightBase: siteVars.lineHeightMedium,
    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)} ${pxToRem(14)} ${pxToRem(18)}`,

    verticalBackgroundColor: undefined,
    verticalItemPadding: `${pxToRem(9)} ${pxToRem(16)} ${pxToRem(9)} ${pxToRem(16)}`,
    verticalBoxShadow: siteVars.shadowLevel3,
    verticalDividerMargin: `${pxToRem(8)} 0`,
    verticalItemBorderWidth: pxToRem(2),
    verticalItemBorderColor: 'transparent',
    verticalPointingBorderColor: siteVars.colorScheme.primary.borderActive, // TODO: why is the default having primary color?!

    underlinedBottomBorderWidth: pxToRem(2),
    primaryBorderColor: siteVars.colors.grey.light10,

    dividerHeight: pxToRem(1),
    borderWidth: pxToRem(1),
  }
}
