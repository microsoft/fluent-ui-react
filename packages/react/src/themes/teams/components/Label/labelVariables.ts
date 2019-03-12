import { pxToRem, getColorSchemeWithCustomDefaults } from '../../../../lib'
import { ColorValues, ColorScheme, SiteVariablesPrepared } from '../../../types'
import { colors } from 'src/themes/teams/colors'

type LabelColorScheme = Pick<ColorScheme, 'foreground' | 'background'>

export interface LabelVariables {
  colorScheme: ColorValues<LabelColorScheme>
  circularRadius: string
  padding: string
  startPaddingLeft: string
  endPaddingRight: string
  height: string
  iconColor: string
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  const color = 'rgba(0, 0, 0, 0.6)'

  const colorScheme = {
    // ...getColorSchemeWithCustomDefaults(siteVars.colorScheme, {
    //   foreground: color,
    //   background: 'rgb(232, 232, 232)',
    // }),
    ...siteVars.colorScheme,
    undefined: {
      // foreground: 'red',
      // background: 'red',
      foreground: color,
      background: 'rgb(232, 232, 232)',
    },
    grey: {
      undefined: {
        foreground: siteVars.colors.grey.light14,
        background: siteVars.colors.grey.light02,
        border: siteVars.colors.grey.light02,
        shadow: siteVars.colors.grey.light02,
      },
      active: {
        foreground: siteVars.colors.grey.light14,
        background: siteVars.colors.grey.light02,
        border: siteVars.colors.grey.light02,
        shadow: siteVars.colors.grey.light02,
      },
      focus: {
        foreground: siteVars.colors.grey.light14,
        background: siteVars.colors.grey.light02,
        border: siteVars.colors.grey.light02,
        shadow: siteVars.colors.grey.light02,
      },
      focusWithin: {
        foreground: siteVars.colors.grey.light14,
        background: siteVars.colors.grey.light02,
        border: siteVars.colors.grey.light02,
        shadow: siteVars.colors.grey.light02,
      },
      hover: {
        foreground: siteVars.colors.grey.light14,
        background: siteVars.colors.grey.light02,
        border: siteVars.colors.grey.light02,
        shadow: siteVars.colors.grey.light02,
      },
      disabled: {
        foreground: siteVars.colors.grey.light14,
        background: siteVars.colors.grey.light02,
        border: siteVars.colors.grey.light02,
        shadow: siteVars.colors.grey.light02,
      },
      error: {
        foreground: siteVars.colors.grey.light14,
        background: siteVars.colors.grey.light02,
        border: siteVars.colors.grey.light02,
        shadow: siteVars.colors.grey.light02,
      },
    },
  }

  return {
    colorScheme,
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    iconColor: color,
  }
}
