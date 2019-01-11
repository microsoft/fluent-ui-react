import { getColorSchemeWithCustomDefaults } from '../../../../lib'
import { ColorValues, ColorScheme } from '../../../types'

export type MenuColorScheme = Pick<ColorScheme, 'foreground' | 'background' | 'border'>

export interface MenuVariables {
  colorScheme: ColorValues<MenuColorScheme>

  color: string
  activeColor: string
  focusedColor: string
  disabledColor: string
  primaryActiveColor: string
  primaryFocusedColor: string

  backgroundColor: string
  activeBackgroundColor: string
  focusedBackgroundColor: string
  primaryActiveBackgroundColor: string
  primaryFocusedBackgroundColor: string

  borderColor: string
  primaryBorderColor: string
  primaryActiveBorderColor: string

  lineHeightBase: string
}

export default (siteVars: any): MenuVariables => {
  const v: MenuVariables = {
    color: siteVars.white,
    activeColor: siteVars.black,
    focusedColor: siteVars.black,
    disabledColor: siteVars.gray06,
    primaryActiveColor: siteVars.white,
    primaryFocusedColor: siteVars.white,

    backgroundColor: siteVars.black,
    activeBackgroundColor: siteVars.accessibleYellow,
    focusedBackgroundColor: siteVars.accessibleYellow,
    primaryActiveBackgroundColor: siteVars.accessibleYellow,
    primaryFocusedBackgroundColor: siteVars.accessibleYellow,

    borderColor: siteVars.white,
    primaryBorderColor: siteVars.white,
    primaryActiveBorderColor: siteVars.white,

    lineHeightBase: siteVars.lineHeightBase,
    colorScheme: null,
  }

  const primary: ColorScheme = {
    foreground: {
      initial: v.color,
      active: v.primaryActiveColor,
      disabled: v.disabledColor,
      focused: v.primaryFocusedColor,
      hovered: v.primaryFocusedColor,
    },
    background: {
      initial: v.backgroundColor,
      active: v.primaryActiveBackgroundColor,
      disabled: v.disabledColor,
      focused: v.primaryFocusedBackgroundColor,
      hovered: v.primaryFocusedBackgroundColor,
    },
    border: {
      initial: v.primaryBorderColor,
      active: v.primaryActiveBorderColor,
      disabled: v.disabledColor,
      focused: v.primaryActiveBorderColor,
      hovered: v.primaryActiveBorderColor,
    },
  }

  v.colorScheme = getColorSchemeWithCustomDefaults(siteVars.colorScheme, primary)
  v.colorScheme.primary = primary

  return v
}
