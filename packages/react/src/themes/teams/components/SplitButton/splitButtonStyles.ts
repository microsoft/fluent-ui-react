import { ICSSInJSStyle } from '../../../types'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const splitButtonStyles = {
  menuButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    padding: v.padding,

    ...(p.small && {
      height: v.smallDimension,
      padding: v.smallPadding,
      minWidth: v.smallMinWidth,
      boxShadow: v.smallBoxShadow,
    }),

    ':focus-visible': {
      borderRightWidth: 0,

      ':before': {
        borderRightWidth: 0,
      },

      ':after': {
        borderRightWidth: 0,
      },
    },

    ':active': {
      animationName: 'unset',
      animationDuration: 'unset',
    },
  }),

  toggleButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: v.borderColor,
    ...getIconFillOrOutlineStyles({ outline: true }),

    ...(p.primary && {
      borderWidth: v.borderWidthLeftOnly,
      borderColor: v.borderColorPrimary,
    }),

    ...(p.disabled && {
      borderWidth: v.borderWidthLeftOnly,
      borderColor: v.borderColorDisabled,
    }),

    ...(p.small && {
      height: v.smallDimension,
      width: v.smallDimension,
      minWidth: v.smallMinWidth,
      boxShadow: v.smallBoxShadow,
    }),

    ':focus-visible': {
      ':before': {
        borderLeftWidth: 0,
      },

      ':after': {
        borderLeftWidth: 0,
      },
    },

    ':active': {
      animationName: 'unset',
      animationDuration: 'unset',
    },
  }),

  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

    return {
      borderRadius: v.borderRadius,
      position: 'relative',
      display: 'inline-block',

      ':focus-within': {
        ...borderFocusStyles[':focus-visible'],
      },
    }
  },
}

export default splitButtonStyles
