import { ThemeInput } from '@stardust-ui/react'

export const darkThemeOverrides: ThemeInput = {
  componentVariables: {
    Toolbar: siteVars => ({
      // We can't override these variables directly because TMP has usages of regular Toolbar
      dividerMargin: 0,
      borderRadius: 0,

      // backgroundHover: '#343441',
    }),

    ToolbarItem: siteVars => ({
      dangerBackgroundColor: '#b44',
      primaryBackgroundColor: '#333',
      customToolbarBackgroundHover: siteVars.colorScheme.brand.backgroundHover1,
    }),
  },

  componentStyles: {
    CustomToolbarTimer: {
      root: {
        pointerEvents: 'none',
      },
    },

    Toolbar: {
      root: {
        height: '4rem',
        overflow: 'hidden',
        background: '#333',
        borderRadius: '4px',
      },
    },

    ToolbarItem: {
      root: ({ variables: v }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '4rem',
        minWidth: '4rem',
        color: 'white',

        ...(v.danger && {
          backgroundColor: v.dangerBackgroundColor,
        }),

        ...(v.primary && {
          backgroundColor: v.primaryBackgroundColor,
        }),

        ':hover': {
          backgroundColor: v.customToolbarBackgroundHover,
        },
      }),
    },
  },
}
