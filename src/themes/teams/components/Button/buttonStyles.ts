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
      margin: `0 ${pxToRem(8)} 0 0`,
      verticalAlign: 'middle',
      cursor: 'pointer',

      // rectangular button defaults
      ...(!text && {
        outline: 0,
        borderRadius: '2px',
        borderWidth: `${pxToRem(borderWidth)}`,
        borderStyle: 'solid',
        borderColor,
        boxShadow,
        ':hover': {
          color: colorHover,
          backgroundColor: backgroundColorHover,
          borderColor: borderColorHover,
        },
        ...(isFromKeyboard && {
          ':focus': {
            color: colorFocus,
            backgroundColor: backgroundColorFocus,
            borderColor: borderColorFocus,
            ':after': {
              content: '""',
              position: 'absolute',
              top: `-${pxToRem(borderWidth * 2)}`,
              right: `-${pxToRem(borderWidth * 2)}`,
              bottom: `-${pxToRem(borderWidth * 2)}`,
              left: `-${pxToRem(borderWidth * 2)}`,
              borderWidth: `${pxToRem(borderWidth)}`,
              borderStyle: 'solid',
              borderColor: `${borderColorFocusIndicator}`,
              borderRadius: '3px',
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
          borderColor: circularBorderColor,
          borderRadius: circularRadius,
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
          borderWidth: `${pxToRem(primaryBorderWidth)}`,
          borderStyle: 'solid',
          borderColor: `${primaryBorderColor}`,
          ':hover': {
            color: primaryColorHover,
            backgroundColor: primaryBackgroundColorHover,
            borderColor: primaryBorderColorHover,
          },
          ...(isFromKeyboard &&
            !circular && {
              ':focus': {
                color: primaryColorFocus,
                backgroundColor: primaryBackgroundColorFocus,
                borderColor: primaryBorderColorFocus,
                ':after': {
                  content: '""',
                  position: 'absolute',
                  top: `-${pxToRem(primaryBorderWidth * 2)}`,
                  right: `-${pxToRem(primaryBorderWidth * 2)}`,
                  bottom: `-${pxToRem(primaryBorderWidth * 2)}`,
                  left: `-${pxToRem(primaryBorderWidth * 2)}`,
                  borderWidth: `${pxToRem(primaryBorderWidth)}`,
                  borderStyle: 'solid',
                  borderColor: `${primaryBorderColorFocusIndicator}`,
                  borderRadius: '3px',
                },
              },
            }),
          ...(isFromKeyboard &&
            circular && {
              ':focus': {
                color: primaryColorFocus,
                backgroundColor: primaryBackgroundColorFocus,
                borderColor: primaryBackgroundColorFocus,
                ':after': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  bottom: '0',
                  left: '0',
                  borderWidth: `${pxToRem(primaryBorderWidth)}`,
                  borderStyle: 'solid',
                  borderColor: `${primaryCircularBorderColorFocusIndicator}`,
                  borderRadius: circularRadius,
                },
              },
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

  content: () => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
}

export default buttonStyles
