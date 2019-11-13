import { ICSSInJSStyle } from '../../../types'

const splitButtonStyles = {
  menuButton: ({ variables: v }): ICSSInJSStyle => ({
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    borderRightWidth: '0',

    ':active': {
      animationName: '0',
    },
  }),

  toggleButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    borderColor: p.primary ? v.borderColorPrimary : v.borderColor,
    ':active': {
      animationName: '0',
    },
  }),

  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      position: 'relative',

      ':focus-within': {
        ...(p.isFromKeyboard
          ? {
              color: v.colorFocus,
            }
          : { ':active': { backgroundColor: 'auto' } }),
      },
    }
  },
}

export default splitButtonStyles
