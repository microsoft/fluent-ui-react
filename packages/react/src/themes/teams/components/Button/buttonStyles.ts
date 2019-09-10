import * as _ from 'lodash'
import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import Loader from '../../../../components/Loader/Loader'
import { ButtonProps } from '../../../../components/Button/Button'
import { ButtonVariables } from './buttonVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const buttonStyles: ComponentSlotStylesInput<ButtonProps, ButtonVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const { borderWidth } = siteVariables

    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
      ...(p.circular && {
        borderRadius: v.circularBorderRadius,
        focusOuterBorderColor: v.circularBorderColorFocus,
      }),
    })

    return {
      height: v.height,
      minWidth: _.isNil(p.loading) ? v.minWidth : v.loadingMinWidth,
      maxWidth: v.maxWidth,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderRadius: v.borderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: v.padding,
      verticalAlign: 'middle',
      cursor: 'pointer',

      ...(p.size === 'small' && {
        padding: v.sizeSmallPadding,
        height: v.sizeSmallHeight,
        minWidth: v.sizeSmallMinWidth,
      }),

      // rectangular button defaults
      ...(!p.text && {
        outline: 0,
        borderWidth,
        borderStyle: 'solid',
        borderColor: v.borderColor,
        boxShadow: v.boxShadow,

        ':hover': {
          color: v.colorHover,
          backgroundColor: v.backgroundColorHover,
          borderColor: v.borderColorHover,
        },

        ':focus': {
          ...borderFocusStyles[':focus'],
          boxShadow: 'none',
          ':active': { backgroundColor: v.backgroundColorActive },
        },
        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          color: v.colorFocus,
          backgroundColor: v.backgroundColorFocus,
        },
      }),

      // circular button defaults
      ...(p.circular &&
        !p.text && {
          minWidth: v.height,
          padding: 0,
          color: v.circularColor,
          backgroundColor: v.circularBackgroundColor,
          borderColor: v.circularBorderColor,
          borderRadius: v.circularBorderRadius,

          ...(p.size === 'small' && {
            minWidth: v.sizeSmallHeight,
          }),

          ':hover': {
            color: v.circularColorActive,
            backgroundColor: v.circularBackgroundColorHover,
            borderColor: v.circularBorderColorHover,
          },

          ':focus': {
            ...borderFocusStyles[':focus'],
            boxShadow: 'none',
            ':active': { backgroundColor: v.circularBackgroundColorActive },
          },
          ':focus-visible': {
            ...borderFocusStyles[':focus-visible'],
            color: v.circularColorActive,
            backgroundColor: v.circularBackgroundColorFocus,
          },
        }),

      // text button defaults
      ...(p.text && {
        color: v.textColor,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        padding: `0 ${pxToRem(8)}`,

        // by default icons should always be outline, but filled on hover/focus
        ...getIconFillOrOutlineStyles({ outline: true }),

        ':hover': {
          color: v.textColorHover,
          ...getIconFillOrOutlineStyles({ outline: false }),
        },

        ':focus': {
          boxShadow: 'none',
          ...borderFocusStyles[':focus'],
        },
        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          ...getIconFillOrOutlineStyles({ outline: false }),
        },

        ...(p.primary && {
          color: v.textPrimaryColor,
        }),
      }),

      // Overrides for "primary" buttons
      ...(p.primary &&
        !p.text && {
          color: v.primaryColor,
          backgroundColor: v.primaryBackgroundColor,
          borderColor: v.primaryBorderColor,

          ':hover': {
            color: v.primaryColorHover,
            backgroundColor: v.primaryBackgroundColorHover,
          },

          ':focus': {
            ...borderFocusStyles[':focus'],
            boxShadow: 'none',
            ':active': { backgroundColor: v.primaryBackgroundColorActive },
          },
          ':focus-visible': {
            ...borderFocusStyles[':focus-visible'],
            color: v.primaryColorFocus,
            backgroundColor: v.primaryBackgroundColorFocus,
          },
        }),

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        color: v.colorDisabled,
        boxShadow: 'none',
        ':hover': {
          color: v.colorDisabled,
        },

        ...(p.text && {
          color: v.textColorDisabled,
          ':hover': {
            color: v.textColorDisabled,
          },
        }),

        ...(!p.text && {
          backgroundColor: v.backgroundColorDisabled,
          borderColor: v.borderColorDisabled,
          ':hover': {
            backgroundColor: v.backgroundColorDisabled,
          },
        }),
      }),

      ...(p.fluid && {
        width: '100%',
        maxWidth: '100%',
      }),

      ...(p.iconOnly && {
        minWidth: v.height,
        padding: 0,

        ...(p.size === 'small' && {
          minWidth: v.sizeSmallHeight,
        }),
      }),
    }
  },

  // modifies the text of the button
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: v.contentFontSize,
    fontWeight: v.contentFontWeight,
    lineHeight: v.contentLineHeight,

    ...(p.size === 'small' && {
      fontSize: v.sizeSmallContentFontSize,
      lineHeight: v.sizeSmallContentLineHeight,
    }),
  }),

  icon: ({ props: p, variables: v }) => ({
    // when loading, hide the icon
    ...(p.loading && {
      margin: 0,
      opacity: 0,
      width: 0,
    }),
  }),

  loader: ({ props: p, variables: v }): ICSSInJSStyle => ({
    [`& .${Loader.slotClassNames.indicator}`]: {
      width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
      height: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
    },
    [`& .${Loader.slotClassNames.svg}`]: {
      ':before': {
        animationName: {
          to: {
            transform: `translate3d(0, ${
              p.size === 'small' ? v.sizeSmallLoaderSvgAnimationHeight : v.loaderSvgAnimationHeight
            }, 0)`,
          },
        },
        borderWidth: p.size === 'small' ? v.sizeSmallLoaderBorderSize : v.loaderBorderSize,
        width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
        height: p.size === 'small' ? v.sizeSmallLoaderSvgHeight : v.loaderSvgHeight,
      },
    },

    ...(p.content && {
      marginRight: pxToRem(4),
    }),
  }),
}

export default buttonStyles
