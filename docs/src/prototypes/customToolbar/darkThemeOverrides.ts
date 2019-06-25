import { ComponentStyleFunctionParam, ThemeInput, pxToRem } from '@stardust-ui/react'

export const darkThemeOverrides: ThemeInput = {
  componentVariables: {
    Box: siteVars => ({
      ctBackground: 'rgba(41,40,40,.9)', // HUH: must be kept in sync with ToolbarItem.ctBackground
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
      ctColorActive: '#fff',
      ctBackgroundActive: '#343441',
      ctBackgroundActiveOverlay:
        'linear-gradient(90deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(135deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 70%),linear-gradient(180deg,rgba(60,62,93,.6) 70%,rgba(60,62,93,0) 94%),linear-gradient(225deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 73%),linear-gradient(270deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(0deg,rgba(98,100,167,.75) 6%,rgba(98,100,167,0) 70%)',
    }),
  },

  componentStyles: {
    Box: {
      root: ({ variables: v }: ComponentStyleFunctionParam) => ({
        ...(v.uBarButtonWrapper && {
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: v.ctBackground,
        }),
        ...(v.verticalPaddingSmall && {
          paddingLeft: '.1rem',
          paddingRight: '.1rem',
        }),
        ...(v.verticalPaddingMedium && {
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }),
      }),
    },

    Toolbar: {
      root: ({ variables: v }: ComponentStyleFunctionParam) => ({
        ...(v.uBar && {
          height: '4rem',
          overflow: 'hidden',
          borderRadius: '4px',
        }),
      }),
    },

    ToolbarItem: {
      root: ({ props: p, variables: v }: ComponentStyleFunctionParam) => {
        return {
          ...(v.uBar && {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '4rem',
            minWidth: '4rem',
            color: v.ctColor,

            background: v.ctBackground,
            position: 'relative',

            ...(p.active &&
              !v.primary && {
                // active intentionally before primary and danger, only affects regular items
                color: v.ctColorActive,
                background: v.ctBackgroundActive,

                '::before': {
                  content: `''`,
                  position: 'absolute',
                  top: pxToRem(-2),
                  left: pxToRem(-2),
                  bottom: pxToRem(-2),
                  right: pxToRem(-2),
                  background: v.ctBackgroundActiveOverlay,
                  ...(p.isFromKeyboard && {
                    border: `${pxToRem(2)} solid #fff`,
                  }),
                },
              }),

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

              ...(v.noHoverColors && {
                color: undefined,
                background: 'blue',
              }),
            },

            ...(v.hasDot && {
              '::after': {
                content: `''`,
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'red',
                transform: 'translateX(100%) translateY(-100%)',
              },
            }),

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

          ...(v.noFillOnHover && {
            '& .ui-icon__filled': {
              display: 'none',
            },
            '& .ui-icon__outline': {
              display: 'block',
            },
            '&:hover .ui-icon__filled': {
              display: 'none',
            },
            '&:hover .ui-icon__outline': {
              display: 'block',
            },
          }),
        }
      },
    },
  },
}
