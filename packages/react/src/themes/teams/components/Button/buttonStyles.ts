import * as _ from 'lodash'
import { pxToRem, createAnimationStyles } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import Loader from '../../../../components/Loader/Loader'
import { ButtonProps } from '../../../../components/Button/Button'
import { ButtonVariables } from './buttonVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const buttonStyles: ComponentSlotStylesPrepared<ButtonProps, ButtonVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme
    const { borderWidth } = siteVariables

    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
      borderPadding: borderWidth,
      ...(p.circular && {
        borderPadding: pxToRem(4),
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

        ':active': {
          ...createAnimationStyles('scaleDownSoft', theme),
          color: v.colorActive,
          backgroundColor: v.backgroundColorActive,
          borderColor: v.borderColorActive,
          boxShadow: 'none',
        },

        ':focus': {
          ...borderFocusStyles[':focus'],
        },

        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          borderColor: v.borderColor,
          borderWidth,

          ':hover': {
            borderColor: v.borderColorHover,
          },
        },

        ...(p.size === 'small' && {
          boxShadow: 'none',
        }),
      }),

      // circular button defaults
      ...(p.circular &&
        !p.text && {
          minWidth: v.height,
          padding: 0,
          borderRadius: v.circularBorderRadius,

          ...(p.size === 'small' && {
            minWidth: v.sizeSmallHeight,
          }),
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
          boxShadow: v.primaryBoxShadow,

          ':active': {
            ...createAnimationStyles('scaleDownSoft', theme),
            backgroundColor: v.primaryBackgroundColorActive,
            boxShadow: 'none',
          },

          ':focus': {
            ...borderFocusStyles[':focus'],
          },

          ':focus-visible': {
            ...borderFocusStyles[':focus-visible'],
          },

          ':hover': {
            color: v.primaryColorHover,
            backgroundColor: v.primaryBackgroundColorHover,
          },
        }),

      ...(p.inverted && {
        backgroundColor: siteVariables.colorScheme.silver.background,
        borderColor: siteVariables.colorScheme.silver.border,
        color: siteVariables.colorScheme.silver.foreground,

        ':active': {
          ...createAnimationStyles('scaleDownSoft', theme),
          backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
          color: siteVariables.colorScheme.silver.foregroundHover,
        },

        ':hover': {
          backgroundColor: siteVariables.colorScheme.silver.backgroundHover,
          color: siteVariables.colorScheme.silver.foregroundHover,
        },

        ':focus': {
          ...borderFocusStyles[':focus'],
          boxShadow: 'none',
        },

        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
          color: siteVariables.colorScheme.silver.foregroundHover,
        },
      }),

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        color: v.colorDisabled,
        boxShadow: 'none',
        pointerEvents: 'none',
        ':hover': {
          color: v.colorDisabled,
        },

        ...(p.text && {
          color: v.textColorDisabled,
          backgroundColor: 'transparent',
          ':hover': {
            color: v.textColorDisabled,
          },
        }),

        ...(!p.text && {
          backgroundColor: v.backgroundColorDisabled,
          borderColor: v.borderColorDisabled,
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
