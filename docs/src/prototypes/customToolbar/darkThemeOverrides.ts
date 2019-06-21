import { ThemeInput } from '@stardust-ui/react'

export const darkThemeOverrides: ThemeInput = {
  componentStyles: {
    CustomToolbarTimer: {
      root: {
        pointerEvents: 'none',
      },
    },
    Toolbar: {
      root: {
        //   borderRadius: '3px',
        //   overflow: 'hidden',
        background: 'black',
      },
    },
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
    Toolbar: siteVars => ({
      // We can't override these variables directly because TMP has usages of regular Toolbar
      dividerMargin: 0,
      borderRadius: 0,

      // backgroundHover: '#343441',
    }),
    ToolbarItem: siteVars => ({
      dangerBackgroundColor: 'red',

      primaryBackgroundColor: 'white',
    }),
  },
}
