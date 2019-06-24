import { ThemeInput } from '@stardust-ui/react'

export const darkThemeOverrides: ThemeInput = {
  componentVariables: {
    Toolbar: siteVars => ({
      // We can't override these variables directly because TMP has usages of regular Toolbar
      dividerMargin: 0,
      borderRadius: 0,
    }),

    ToolbarItem: siteVars => ({
      ctColor: '#fff',
      ctBackground: 'rgba(41,40,40,.9)',
      ctPrimaryBackground: 'rgba(59,58,58,.95)',
      ctDangerBackground: '#9d2f42',

      ctColorHover: '#fff',
      ctBackgroundHover: '#343441', // siteVars.colorScheme.brand.backgroundHover1,
      ctPrimaryColorHover: '#fff',
      ctPrimaryBackgroundHover: '#343441', // siteVars.colorScheme.brand.backgroundHover1,
      ctDangerColorHover: '#fff',
      ctDangerBackgroundHover: '#a72037',
    }),
  },

  componentStyles: {
    CustomToolbarTimer: {
      root: {
        pointerEvents: 'none',
      },
    },

    Toolbar: {
      root: ({ variables: v }) => ({
        ...(v.uBar && {
          height: '4rem',
          overflow: 'hidden',
          borderRadius: '4px',
        }),
      }),
    },

    ToolbarItem: {
      root: ({ props: p, variables: v }) => {
        return {
          ...(v.uBar && {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '4rem',
            minWidth: '4rem',
            color: v.ctColor,

            background: v.ctBackground,

            ...(v.danger && {
              background: v.ctDangerBackground,
            }),

            ...(v.primary && {
              background: v.ctPrimaryBackground,
            }),

            ':hover': {
              color: v.ctColorHover,
              background: v.ctBackgroundHover,

              ...(v.danger && {
                color: v.ctDangerColorHover,
                background: v.ctDangerBackgroundHover,
              }),

              ...(v.primary && {
                color: v.ctPrimaryColorHover,
                background: v.ctPrimaryBackgroundHover,
              }),
            },

            ...(p.isFromKeyboard && {
              border: '2px solid white',
              color: v.ctColorHover,
              background: v.ctBackgroundHover,

              ...(v.danger && {
                color: v.ctDangerColorHover,
                background: v.ctDangerBackgroundHover,
              }),

              ...(v.primary && {
                color: v.ctPrimaryColorHover,
                background: v.ctPrimaryBackgroundHover,
              }),
            }),
          }),
        }
      },
    },
  },
}
