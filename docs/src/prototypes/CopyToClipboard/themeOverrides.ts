import {
  ComponentSlotStylesInput,
  ComponentVariablesInput,
  pxToRem,
  ThemeInput,
} from '@stardust-ui/react'

type NotificationVariables = {
  contentBackgroundColor: string
  contentColor: string
  contentBorderRadius: string
  contentFontSize: string
  contentFontWeight: number
  contentPadding: string
}

type ThemeOverrides = ThemeInput & {
  componentStyles: {
    Notification: ComponentSlotStylesInput<{}, NotificationVariables>
  }
  componentVariables: {
    Notification: ComponentVariablesInput
  }
}

const themeOverrides: ThemeOverrides = {
  componentStyles: {
    Notification: {
      root: () => ({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        height: 'unset',
        width: 'unset',

        position: 'static',
        visibility: 'hidden',
        zIndex: 1000,
      }),
      overlay: () => ({
        alignItems: 'center',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        left: 0,
        overflow: 'auto',
        position: 'fixed',
        right: 0,
        top: 0,
      }),
    },
  },
  componentVariables: {
    Notification: (siteVariables): NotificationVariables => ({
      contentBackgroundColor: siteVariables.colorScheme.default.foreground,
      contentColor: siteVariables.colorScheme.default.background,
      contentBorderRadius: pxToRem(3),
      contentPadding: pxToRem(10),
      contentFontSize: siteVariables.fontSizes.larger,
      contentFontWeight: siteVariables.fontWeightSemibold,
    }),
  },
}

export default themeOverrides
