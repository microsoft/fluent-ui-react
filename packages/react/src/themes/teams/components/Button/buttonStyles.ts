import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ButtonProps, ButtonState } from '../../../../components/Button/Button'
import { ButtonVariables } from './buttonVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const buttonStyles: ComponentSlotStylesInput<ButtonProps & ButtonState, ButtonVariables> = {
  root: ({ props, variables, theme: { siteVariables } }): ICSSInJSStyle => {
    const { circular, disabled, fluid, primary, text, iconOnly, isFromKeyboard } = props
    const { borderWidth } = siteVariables

    const {
      height,
      minWidth,
      maxWidth,
      circularBorderRadius,
      paddingLeftRightValue,

      color,
      colorHover,
      colorFocus,
      colorDisabled,
      backgroundColor,
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
      primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      primaryBorderColor,

      circularColor,
      circularColorActive,
      circularBackgroundColor,
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

    const { ':focus': borderFocusStyles, ...borderRootStyles } = getBorderFocusStyles({
      siteVariables,
      isFromKeyboard,
      ...(circular && {
        borderRadius: circularBorderRadius,
        focusOuterBorderColor: circularBorderColorFocus,
      }),
    })

    return {
      height,
      minWidth,
      maxWidth,
      color,
      backgroundColor,
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
        ...borderRootStyles,

        ':hover': {
          color: colorHover,
          backgroundColor: backgroundColorHover,
          borderColor: borderColorHover,
        },

        ...(isFromKeyboard && {
          ':focus': {
            color: colorFocus,
            backgroundColor: backgroundColorFocus,
            boxShadow: 'none',
            ...borderFocusStyles,
          },
        }),
      }),

      // circular button defaults
      ...(circular &&
        !text && {
          minWidth: height,
          padding: 0,
          color: circularColor,
          backgroundColor: circularBackgroundColor,
          borderColor: circularBorderColor,
          ...borderRootStyles,

          ':hover': {
            color: circularColorActive,
            backgroundColor: circularBackgroundColorHover,
            borderColor: circularBorderColorHover,
          },
          ...(isFromKeyboard && {
            ':focus': {
              color: circularColorActive,
              backgroundColor: circularBackgroundColorFocus,
              ...borderFocusStyles,
            },
          }),
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
      }),

      // Overrides for "primary" buttons
      ...(primary &&
        !text && {
          color: primaryColor,
          backgroundColor: primaryBackgroundColor,
          borderColor: primaryBorderColor,
          ...borderRootStyles,

          ':hover': {
            color: primaryColorHover,
            backgroundColor: primaryBackgroundColorHover,
          },

          ...(isFromKeyboard && {
            ':focus': {
              color: primaryColorFocus,
              backgroundColor: primaryBackgroundColorFocus,
              ...borderFocusStyles,
            },
          }),
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
}

export default buttonStyles
