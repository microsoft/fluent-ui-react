import { ICSSInJSStyle } from '../../../types'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const splitButtonStyles = {
  menuButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    borderRightWidth: '0',

    ...(p.small && {
      height: v.smallDimension,
      padding: v.smallPadding,
      minWidth: v.smallMinWidth,
      boxShadow: v.smallBoxShadow,
    }),

    ':active': {
      animationName: '0',
    },
  }),

  toggleButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    borderColor: p.primary ? v.borderColorPrimary : v.borderColor,
    ...getIconFillOrOutlineStyles({ outline: true }),

    ...(p.small && {
      height: v.smallDimension,
      width: v.smallDimension,
      minWidth: v.smallMinWidth,
      boxShadow: v.smallBoxShadow,
    }),

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
