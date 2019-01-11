import { getColorSchemeWithCustomDefaults } from '../../../../lib'
import { ColorValues, ColorScheme, SiteVariablesPrepared } from '../../../types'

export type MenuColorScheme = Pick<ColorScheme, 'foreground' | 'background' | 'border'>

export interface MenuVariables {
  colorScheme: ColorValues<MenuColorScheme>

  color: string
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

export default (siteVars: SiteVariablesPrepared): MenuVariables => {
  const v: MenuVariables = {
    color: siteVars.gray02,
    focusedColor: siteVars.black,
    disabledColor: siteVars.gray06,
    primaryActiveColor: siteVars.white,
    primaryFocusedColor: siteVars.white,

    backgroundColor: siteVars.white,
    activeBackgroundColor: siteVars.gray10,
    focusedBackgroundColor: siteVars.gray14,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryFocusedBackgroundColor: siteVars.brand12,

    borderColor: siteVars.gray08,
    primaryBorderColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.brand,

    lineHeightBase: siteVars.lineHeightMedium,
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
