import { ICSSInJSStyle } from '../../../types'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const splitButtonStyles = {
  menuButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    borderRightWidth: '0',
    padding: v.padding,

    ...(p.small && {
      height: v.smallDimension,
      padding: v.smallPadding,
      minWidth: v.smallMinWidth,
      boxShadow: v.smallBoxShadow,
    }),

    ':active': {
      animationName: 'unset',
    },
  }),

  toggleButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
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

    ':active': {
      animationName: 'unset',
      animationDuration: 'unset',
    },
  }),
}

export default splitButtonStyles
