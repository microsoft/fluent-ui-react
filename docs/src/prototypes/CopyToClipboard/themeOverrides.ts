import {
  ComponentSlotStylesInput,
  ComponentVariablesInput,
  pxToRem,
  ThemeInput,
  TooltipProps,
} from '@stardust-ui/react'

type NotificationVariables = {
  contentBackgroundColor: string
  contentColor: string
  contentFontSize: string
  contentFontWeight: number
  contentPadding: string
}

type NotificationTooltipVariables = {
  basic?: boolean
  primary?: boolean

  basicContentBackgroundColor: string
  basicContentColor: string

  primaryContentBackgroundColor: string
  primaryContentColor: string
}

type ThemeOverrides = ThemeInput & {
  componentStyles: {
    Notification: ComponentSlotStylesInput<{}, NotificationVariables>
    TooltipContent: ComponentSlotStylesInput<TooltipProps, NotificationTooltipVariables>
  }
  componentVariables: {
    Notification: ComponentVariablesInput
    TooltipContent: ComponentVariablesInput
  }
}

const pointerSvgUrl = (backgroundColor: string) =>
  `url("data:image/svg+xml,%3Csvg fill='${encodeURIComponent(
    backgroundColor,
  )}' viewBox='0 0 6 16'%3E%3Cpath d='M.708 9.527a2.002 2.002 0 0 1 0-3.055l3.284-2.78C5.324 2.562 5.991 1.332 5.991 0c0 1.002.02 15.013 0 16 0-1.333-.665-2.562-1.995-3.689L.708 9.527z' fill-rule='evenodd' clip-rule='evenodd'/%3E%3C/svg%3E%0A");`

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
    TooltipContent: {
      root: ({ variables: v }) => ({
        ...(v.basic && {
          background: v.basicContentBackgroundColor,
          color: v.basicContentColor,
        }),

        ...(v.primary && {
          background: v.primaryContentBackgroundColor,
          color: v.primaryContentColor,
        }),
      }),
      pointer: ({ variables: v }) => ({
        ...(v.basic && {
          backgroundImage: pointerSvgUrl(v.basicContentBackgroundColor),
        }),

        ...(v.primary && {
          backgroundImage: pointerSvgUrl(v.primaryContentBackgroundColor),
        }),
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
    TooltipContent: (siteVariables): NotificationTooltipVariables => ({
      basicContentBackgroundColor: siteVariables.colorScheme.default.background,
      basicContentColor: siteVariables.colorScheme.default.foreground,

      primaryContentBackgroundColor: siteVariables.colorScheme.brand.background,
      primaryContentColor: siteVariables.colorScheme.brand.foreground4,
    }),
  },
}

export default themeOverrides
