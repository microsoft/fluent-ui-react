import { ThemeInput } from '@stardust-ui/react'

export const darkThemeOverrides: ThemeInput = {
  componentStyles: {
    ToolbarItem: {
      root: ({ variables: v }) => ({
        ...(v.danger && {
          backgroundColor: v.dangerBackgroundColor,
        }),

        ...(v.primary && {
          backgroundColor: v.primaryBackgroundColor,
        }),
      }),
    },
  },
  componentVariables: {
    ToolbarItem: siteVars => ({
      dangerBackgroundColor: 'red',

      primaryBackgroundColor: 'white',
    }),
  },
}
