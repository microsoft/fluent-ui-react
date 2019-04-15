import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ButtonProps, ButtonState } from '../../../../components/Button/Button'

const buttonStyles: ComponentSlotStylesInput<ButtonProps & ButtonState, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, fluid, primary, text, iconOnly, isFromKeyboard } = props

    const {
      height,
      minWidth,
      maxWidth,
      borderRadius,
      circularRadius,
      paddingLeftRightValue,

      color,
      colorActive,
      colorHover,
      colorFocus,
      colorDisabled,
      backgroundColor,
      backgroundColorActive,
      backgroundColorHover,
      backgroundColorFocus,
      backgroundColorDisabled,
      borderColor,
      borderColorActive,
      borderColorHover,
      borderColorFocus,
      borderColorFocusIndicator,
      borderColorDisabled,
      borderWidth,

      primaryColor,
      primaryColorActive,
      primaryColorHover,
      primaryColorFocus,
      primaryBackgroundColor,
      primaryBackgroundColorActive,
      primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      primaryBorderColor,
      primaryBorderColorActive,
      primaryBorderColorHover,
      primaryBorderColorFocus,
      primaryBorderColorFocusIndicator,
      primaryBorderWidth,

      primaryCircularBorderColorFocusIndicator,

      circularColor,
      circularColorActive,
      circularBackgroundColor,
      circularBackgroundColorActive,
      circularBackgroundColorHover,
      circularBackgroundColorFocus,
      circularBorderColor,
      circularBorderColorActive,
      circularBorderColorHover,
      circularBorderColorFocus,
      circularBorderColorFocusIndicator,

      textColor,
      textColorHover,
      textPrimaryColor,
      textPrimaryColorHover,
      boxShadow,
      borderRadiusFocused,
    } = variables

    return {
      height,
      minWidth,
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
        border: 0,
        boxShadow,

        ':hover': {
          color: colorHover,
          backgroundColor: backgroundColorHover,
        },

        ':before': {
          content: '""',
          position: 'absolute',
          top: pxToRem(borderWidth),
          right: pxToRem(borderWidth),
          bottom: pxToRem(borderWidth),
          left: pxToRem(borderWidth),
          borderWidth: pxToRem(borderWidth),
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRadius: borderRadiusFocused,
        },

        ':after': {
          content: '""',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          borderWidth: pxToRem(borderWidth),
          borderStyle: 'solid',
          borderColor,
          borderRadius: borderRadiusFocused,
        },

        ...(isFromKeyboard && {
          ':focus': {
            color: colorFocus,
            backgroundColor: backgroundColorFocus,
            borderColor: 'transparent',
            boxShadow: 'none',

            ':before': {
              borderColor: borderColorFocus,
            },

            ':after': {
              borderColor: borderColorFocusIndicator,
            },
          },
        }),

        ...(!isFromKeyboard && {
          ':focus': {
            ':active': {
              color: colorActive,
              backgroundColor: backgroundColorActive,
              borderColor: borderColorActive,
              boxShadow: 'none',
            },
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
          borderWidth: pxToRem(borderWidth),
          borderStyle: 'solid',
          borderColor: circularBorderColor,
          borderRadius: circularRadius,

          ':after': {
            borderColor: 'transparent',
          },

          ':hover': {
            color: circularColorActive,
            backgroundColor: circularBackgroundColorHover,
            borderColor: circularBorderColorHover,
          },
          ...(isFromKeyboard && {
            ':focus': {
              color: circularColorActive,
              backgroundColor: circularBackgroundColorFocus,
              borderColor: circularBorderColorFocus,
              ':after': {
                content: '""',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                borderWidth: `${pxToRem(borderWidth)}`,
                borderStyle: 'solid',
                borderColor: `${circularBorderColorFocusIndicator}`,
                borderRadius: circularRadius,
              },
            },
          }),

          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                color: circularColorActive,
                backgroundColor: circularBackgroundColorActive,
                borderColor: circularBorderColorActive,
                boxShadow: 'none',
              },
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

          ':after': {
            borderColor: primaryBorderColor,
          },

          ':hover': {
            color: primaryColorHover,
            backgroundColor: primaryBackgroundColorHover,
          },

          ...(isFromKeyboard && {
            ':focus': {
              color: primaryColorFocus,
              backgroundColor: primaryBackgroundColorFocus,

              ':before': {
                borderColor: borderColorFocus,
              },

              ':after': {
                borderColor: borderColorFocusIndicator,
              },
            },

            ...(circular && {
              ':focus': {
                color: primaryColorFocus,
                backgroundColor: primaryBackgroundColorFocus,
                borderColor: primaryBackgroundColorFocus,
              },
            }),
          }),

          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                color: primaryColorActive,
                backgroundColor: primaryBackgroundColorActive,
                borderColor: primaryBorderColorActive,
                boxShadow: 'none',
              },
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
          borderColor: borderColorDisabled,
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
