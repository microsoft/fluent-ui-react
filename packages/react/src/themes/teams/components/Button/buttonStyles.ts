import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ButtonProps, ButtonState } from '../../../../components/Button/Button'
import { ButtonVariables } from './buttonVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const buttonStyles: ComponentSlotStylesInput<ButtonProps & ButtonState, ButtonVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const { borderWidth } = siteVariables

    const { ':focus': borderFocusStyles } = getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: p.isFromKeyboard,
      ...(p.circular && {
        borderRadius: v.circularBorderRadius,
        focusOuterBorderColor: v.circularBorderColorFocus,
      }),
    })

    return {
      height: v.height,
      minWidth: v.minWidth,
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
          boxShadow: 'none',
          ...(p.isFromKeyboard
            ? {
                color: v.colorFocus,
                backgroundColor: v.backgroundColorFocus,
                ...borderFocusStyles,
              }
            : { ':active': { backgroundColor: v.backgroundColorActive } }),
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
            boxShadow: 'none',
            ...(p.isFromKeyboard
              ? {
                  color: v.circularColorActive,
                  backgroundColor: v.circularBackgroundColorFocus,
                  ...borderFocusStyles,
                }
              : { ':active': { backgroundColor: v.circularBackgroundColorActive } }),
          },
        }),

      // text button defaults
      ...(p.text && {
        color: v.textColor,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        ':hover': {
          color: v.textColorHover,
        },
        ...(p.primary && {
          color: v.textPrimaryColor,
          ':hover': {
            color: v.textPrimaryColorHover,
          },
        }),

        ':focus': {
          boxShadow: 'none',
          outline: 'none',
          ...(p.isFromKeyboard && borderFocusStyles),
        },
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
            boxShadow: 'none',
            ...(p.isFromKeyboard
              ? {
                  color: v.primaryColorFocus,
                  backgroundColor: v.primaryBackgroundColorFocus,
                  ...borderFocusStyles,
                }
              : { ':active': { backgroundColor: v.primaryBackgroundColorActive } }),
          },
        }),

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        color: v.colorDisabled,
        backgroundColor: v.backgroundColorDisabled,
        borderColor: v.borderColorDisabled,
        boxShadow: 'none',
        ':hover': {
          backgroundColor: v.backgroundColorDisabled,
        },
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
}

export default buttonStyles
