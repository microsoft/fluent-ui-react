import { pxToRem } from '../../../../lib'
import { extendColorObject } from '../../../colorUtils'

export interface ButtonVariables {
  [key: string]: string | number | object

  colorScheme: any

  height: string
  minWidth: string
  maxWidth: string
  borderRadius: string
  circularRadius: string
  paddingLeftRightValue: number
  contentFontWeight: string

  color: string
  colorActive: string
  colorHover: string
  colorFocus: string
  colorDisabled: string
  backgroundColor: string
  backgroundColorActive: string
  backgroundColorHover: string
  backgroundColorFocus: string
  backgroundColorDisabled: string
  borderColor: string
  borderColorActive: string
  borderColorHover: string
  borderColorFocus: string
  borderColorFocusIndicator: string
  borderColorDisabled: string
  borderWidth: number

  primaryColor: string
  primaryColorActive: string
  primaryColorHover: string
  primaryColorFocus: string
  primaryBackgroundColor: string
  primaryBackgroundColorActive: string
  primaryBackgroundColorHover: string
  primaryBackgroundColorFocus: string
  primaryBorderColor: string
  primaryBorderColorActive: string
  primaryBorderColorHover: string
  primaryBorderColorFocus: string
  primaryBorderColorFocusIndicator: string
  primaryBorderWidth: number

  primaryCircularBorderColorFocusIndicator: string

  circularColor: string
  circularColorActive: string
  circularBackgroundColor: string
  circularBackgroundColorActive: string
  circularBackgroundColorHover: string
  circularBackgroundColorFocus: string
  circularBorderColor: string
  circularBorderColorActive: string
  circularBorderColorHover: string
  circularBorderColorFocus: string
  circularBorderColorFocusIndicator: string

  textColor: string
  textColorHover: string
  textPrimaryColor: string
  textPrimaryColorHover: string
  textSecondaryColor: string
  textSecondaryColorHover: string

  boxShadow: string
  borderRadiusFocused: string
}

export default (siteVars: any): ButtonVariables => {
  return {
    colorScheme: extendColorObject(siteVars.colorSchemeWIP, {
      primary: {
        foregroundDefault1: siteVars.colors.white,
        foregroundHover: siteVars.colors.white,
        foregroundFocus1: siteVars.colors.white,
        foregroundActive1: siteVars.colors.white,
        backgroundHover1: siteVars.colors.primary[800],
        borderDefault3: 'transparent',
        borderHover3: 'transparent',
      },
    }),
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    borderRadius: pxToRem(2),
    circularRadius: pxToRem(999),
    contentFontWeight: siteVars.fontWeightSemibold,
    paddingLeftRightValue: 20,

    color: siteVars.colors.grey[750],
    colorActive: siteVars.colors.grey[750], // OK
    colorHover: siteVars.colors.grey[750], // OK
    colorFocus: siteVars.colors.grey[750], // OK
    colorDisabled: siteVars.colors.grey[250], // OK
    backgroundColor: siteVars.colors.white, // OK
    backgroundColorActive: siteVars.colors.grey[200], // we don't have this :( (150, 100) - pressed
    backgroundColorHover: siteVars.colors.grey[50], // we don't have this :( (100, 150) - we want darker value, so it's ok
    backgroundColorFocus: siteVars.colors.grey[200], // it's just the button, so here override should be enpoughwe don't have this, but maybe it is ok if we are changing the focus indicator
    backgroundColorDisabled: siteVars.colors.grey[150], // OK
    borderColor: siteVars.colors.grey[200], // OK
    borderColorActive: siteVars.colors.grey[250], // pressed - we don't have this :( (150, 200, 200)
    borderColorHover: siteVars.colors.grey[250], // OK
    borderColorFocus: siteVars.colors.white, // OK
    borderColorFocusIndicator: siteVars.colors.grey[750], // shouldn't this be black?-yes
    borderColorDisabled: 'transparent',
    borderWidth: 1,

    primaryColor: siteVars.colors.white,
    primaryColorActive: siteVars.colors.white,
    primaryColorHover: siteVars.colors.white,
    primaryColorFocus: siteVars.colors.white,
    primaryBackgroundColor: siteVars.colors.primary[600],
    primaryBackgroundColorActive: siteVars.colors.primary[900],
    primaryBackgroundColorHover: siteVars.colors.primary[800],
    primaryBackgroundColorFocus: siteVars.colors.primary[800],
    primaryBorderColor: 'transparent',
    primaryBorderColorActive: 'transparent',
    primaryBorderColorHover: 'transparent',
    primaryBorderColorFocus: siteVars.colors.white,
    primaryBorderColorFocusIndicator: siteVars.colors.grey[750],
    primaryBorderWidth: 1,

    primaryCircularBorderColorFocusIndicator: siteVars.colors.white,

    // replace these with the regular button's
    circularColor: siteVars.colors.grey[500],
    circularColorActive: siteVars.colors.white,
    circularBackgroundColor: 'transparent',
    circularBackgroundColorActive: siteVars.colors.grey[500],
    circularBackgroundColorHover: siteVars.colors.grey[450],
    circularBackgroundColorFocus: siteVars.colors.grey[450],
    circularBorderColor: siteVars.colors.grey[500],
    circularBorderColorActive: 'transparent',
    circularBorderColorHover: 'transparent',
    circularBorderColorFocus: 'transparent',
    circularBorderColorFocusIndicator: siteVars.colors.white,

    textColor: siteVars.colors.primary[600], // we don't have this :(
    textColorHover: siteVars.colors.primary[800], // hmm
    textPrimaryColor: siteVars.colors.primary[600],
    textPrimaryColorHover: siteVars.colors.primary[800],
    textSecondaryColor: siteVars.colors.grey[450], // OK
    textSecondaryColorHover: siteVars.colors.primary[800], // hmm

    boxShadow: siteVars.shadowLevel1,
    borderRadiusFocused: pxToRem(3),
  }
}
