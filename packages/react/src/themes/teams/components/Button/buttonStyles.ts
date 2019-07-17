import * as _ from 'lodash'
import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ButtonProps, ButtonState } from '../../../../components/Button/Button'
import { ButtonVariables } from './buttonVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const buttonStyles: ComponentSlotStylesInput<ButtonProps & ButtonState, ButtonVariables> = {
  root: ({ props, variables, theme: { siteVariables } }): ICSSInJSStyle => {
    const { circular, disabled, fluid, primary, text, iconOnly, isFromKeyboard, loading } = props
    const { borderWidth } = siteVariables

    const {
      height,
      minWidth,
      loadingMinWidth,
      maxWidth,
      borderRadius,
      circularBorderRadius,
      paddingLeftRightValue,

      color,
      colorHover,
      colorFocus,
      colorDisabled,
      backgroundColor,
      backgroundColorActive,
      backgroundColorHover,
      backgroundColorFocus,
      backgroundColorDisabled,
      borderColor,
      borderColorHover,
      borderColorDisabled,

      primaryColor,
      primaryColorHover,
      primaryColorFocus,
      primaryBackgroundColor,
      primaryBackgroundColorActive,
      primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      primaryBorderColor,

      circularColor,
      circularColorActive,
      circularBackgroundColor,
      circularBackgroundColorActive,
      circularBackgroundColorHover,
      circularBackgroundColorFocus,
      circularBorderColor,
      circularBorderColorHover,
      circularBorderColorFocus,

      textColor,
      textColorHover,
      textPrimaryColor,
      textPrimaryColorHover,
      boxShadow,
    } = variables

    const { ':focus': borderFocusStyles } = getBorderFocusStyles({
      siteVariables,
      isFromKeyboard,
      ...(circular && {
        borderRadius: circularBorderRadius,
        focusOuterBorderColor: circularBorderColorFocus,
      }),
    })

    return {
      height,
      minWidth: _.isNil(loading) ? minWidth : loadingMinWidth,
      maxWidth,
      color,
      backgroundColor,
      borderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      verticalAlign: 'middle',
      cursor: 'pointer',

      // rectangular button defaults
      ...(!text && {
        outline: 0,
        borderWidth,
        borderStyle: 'solid',
        borderColor,
        boxShadow,

        ':hover': {
          color: colorHover,
          backgroundColor: backgroundColorHover,
          borderColor: borderColorHover,
        },

        ':focus': {
          boxShadow: 'none',
          ...(isFromKeyboard
            ? {
                color: colorFocus,
                backgroundColor: backgroundColorFocus,
                ...borderFocusStyles,
              }
            : { ':active': { backgroundColor: backgroundColorActive } }),
        },
      }),

      // circular button defaults
      ...(circular &&
        !text && {
          minWidth: height,
          padding: 0,
          color: circularColor,
          backgroundColor: circularBackgroundColor,
          borderColor: circularBorderColor,
          borderRadius: circularBorderRadius,

          ':hover': {
            color: circularColorActive,
            backgroundColor: circularBackgroundColorHover,
            borderColor: circularBorderColorHover,
          },

          ':focus': {
            boxShadow: 'none',
            ...(isFromKeyboard
              ? {
                  color: circularColorActive,
                  backgroundColor: circularBackgroundColorFocus,
                  ...borderFocusStyles,
                }
              : { ':active': { backgroundColor: circularBackgroundColorActive } }),
          },
        }),

      // text button defaults
      ...(text && {
        color: textColor,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        ':hover': {
          color: textColorHover,
        },
        ...(primary && {
          color: textPrimaryColor,
          ':hover': {
            color: textPrimaryColorHover,
          },
        }),

        ':focus': {
          boxShadow: 'none',
          outline: 'none',
          ...(isFromKeyboard && borderFocusStyles),
        },
      }),

      // Overrides for "primary" buttons
      ...(primary &&
        !text && {
          color: primaryColor,
          backgroundColor: primaryBackgroundColor,
          borderColor: primaryBorderColor,

          ':hover': {
            color: primaryColorHover,
            backgroundColor: primaryBackgroundColorHover,
          },

          ':focus': {
            boxShadow: 'none',
            ...(isFromKeyboard
              ? {
                  color: primaryColorFocus,
                  backgroundColor: primaryBackgroundColorFocus,
                  ...borderFocusStyles,
                }
              : { ':active': { backgroundColor: primaryBackgroundColorActive } }),
          },
        }),

      // Overrides for "disabled" buttons
      ...(disabled && {
        cursor: 'default',
        color: colorDisabled,
        backgroundColor: backgroundColorDisabled,
        borderColor: borderColorDisabled,
        boxShadow: 'none',
        ':hover': {
          backgroundColor: backgroundColorDisabled,
        },
      }),

      ...(fluid && {
        width: '100%',
        maxWidth: '100%',
      }),

      ...(iconOnly && {
        minWidth: height,
        padding: 0,
      }),
    }
  },

  // modifies the text of the button
  content: ({ variables }): ICSSInJSStyle => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: variables.contentFontWeight,
  }),

  loader: ({ props: p, variables: v }): ICSSInJSStyle => ({
    marginRight: pxToRem(4),
  }),
}

export default buttonStyles
