import {
  ComponentSlotStylesInput,
  ComponentVariablesInput,
  pxToRem,
  ThemeInput,
} from '@stardust-ui/react'

type NotificationVariables = {
  contentBackgroundColor: string
  contentColor: string
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
        zIndex: 1000,
      }),
      content: ({ variables: v }) => ({
        backgroundColor: v.contentBackgroundColor,
        color: v.contentColor,
        fontSize: v.contentFontSize,
        fontWeight: v.contentFontWeight,
        padding: v.contentPadding,
      }),
    },
  },
  componentVariables: {
    Notification: (siteVariables): NotificationVariables => ({
      contentBackgroundColor: siteVariables.colorScheme.default.foreground,
      contentColor: siteVariables.colorScheme.default.background,
      contentPadding: pxToRem(10),
      contentFontSize: siteVariables.fontSizes.larger,
      contentFontWeight: siteVariables.fontWeightSemibold,
    }),
  },
}

export default themeOverrides
