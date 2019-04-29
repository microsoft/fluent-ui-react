import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ButtonProps, ButtonState } from '../../../../components/Button/Button'

const buttonStyles: ComponentSlotStylesInput<ButtonProps & ButtonState, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, fluid, primary, text, iconOnly, isFromKeyboard } = props
    const colorScheme = variables.colorScheme[primary ? 'primary' : 'default']
    const {
      height,
      minWidth,
      maxWidth,
      borderRadius,
      circularRadius,
      paddingLeftRightValue,

      // backgroundColorActive, // will be replaced after we have the pressed colors
      backgroundColorFocus,
      borderColorActive,

      borderWidth,

      // primaryColor,
      // primaryColorActive,
      // primaryColorHover,
      // primaryColorFocus,
      // primaryBackgroundColor,
      // primaryBackgroundColorActive,
      // primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      // primaryBorderColor,
      primaryBorderColorActive,
      // primaryBorderColorHover,
      // primaryBorderColorFocus,
      // primaryBorderColorFocusIndicator,
      // primaryBorderWidth,
      //
      // primaryCircularBorderColorFocusIndicator,

      // circularColor,
      // circularColorActive,
      // circularBackgroundColor,
      // circularBackgroundColorActive,
      // circularBackgroundColorHover,
      // circularBackgroundColorFocus,
      // circularBorderColor,
      // circularBorderColorActive,
      // circularBorderColorHover,
      // circularBorderColorFocus,
      // circularBorderColorFocusIndicator,

      // textColor,
      // textColorHover,
      textPrimaryColor,
      textPrimaryColorHover,
      boxShadow,
      borderRadiusFocused,
    } = variables

    return {
      height,
      minWidth,
      maxWidth,
      color: colorScheme.foregroundDefault1,
      backgroundColor: colorScheme.backgroundDefault1,
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
        borderWidth: pxToRem(borderWidth),
        borderStyle: 'solid',
        borderColor: colorScheme.borderDefault3,
        boxShadow,
        ':hover': {
          color: colorScheme.foregroundHover,
          backgroundColor: colorScheme.backgroundHover1,
          borderColor: colorScheme.borderHover3,
        },
        ...(isFromKeyboard && {
          ':focus': {
            color: colorScheme.foregroundFocus1,
            backgroundColor: primary ? primaryBackgroundColorFocus : backgroundColorFocus, // we are moving away from this
            borderColor: colorScheme.borderFocusWithin,
            ':after': {
              content: '""',
              position: 'absolute',
              top: `-${pxToRem(borderWidth * 2)}`,
              right: `-${pxToRem(borderWidth * 2)}`,
              bottom: `-${pxToRem(borderWidth * 2)}`,
              left: `-${pxToRem(borderWidth * 2)}`,
              borderWidth: pxToRem(borderWidth),
              borderStyle: 'solid',
              borderColor: colorScheme.borderFocus,
              borderRadius: borderRadiusFocused,
            },
          },
        }),
        ...(!isFromKeyboard && {
          ':focus': {
            ':active': {
              color: colorScheme.foregroundPressed,
              backgroundColor: colorScheme.backgroundPressed,
              borderColor: primary ? primaryBorderColorActive : borderColorActive,
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
          borderRadius: circularRadius,
          ...(isFromKeyboard && {
            ':focus': {
              ':after': {
                content: '""',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                borderWidth: `${pxToRem(borderWidth)}`,
                borderStyle: 'solid',
                borderColor: colorScheme.borderFocus,
                borderRadius: circularRadius,
              },
            },
          }),
        }),

      // text button defaults
      ...(text && {
        color: colorScheme.foregroundDefault1,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        ':hover': {
          color: colorScheme.foregroundHover,
        },
        ...(primary && {
          color: textPrimaryColor,
          ':hover': {
            color: textPrimaryColorHover,
          },
        }),
      }),

      // Overrides for "primary" buttons
      // ...(primary &&
      //   !text && {
      //     color: primaryColor,
      //     backgroundColor: primaryBackgroundColor,
      //     borderWidth: `${pxToRem(primaryBorderWidth)}`,
      //     borderStyle: 'solid',
      //     borderColor: `${primaryBorderColor}`,
      //     ':hover': {
      //       color: primaryColorHover,
      //       backgroundColor: primaryBackgroundColorHover,
      //       borderColor: primaryBorderColorHover,
      //     },
      //     ...(isFromKeyboard &&
      //       !circular && {
      //         ':focus': {
      //           color: primaryColorFocus,
      //           backgroundColor: primaryBackgroundColorFocus,
      //           borderColor: primaryBorderColorFocus,
      //           ':after': {
      //             content: '""',
      //             position: 'absolute',
      //             top: `-${pxToRem(primaryBorderWidth * 2)}`,
      //             right: `-${pxToRem(primaryBorderWidth * 2)}`,
      //             bottom: `-${pxToRem(primaryBorderWidth * 2)}`,
      //             left: `-${pxToRem(primaryBorderWidth * 2)}`,
      //             borderWidth: pxToRem(primaryBorderWidth),
      //             borderStyle: 'solid',
      //             borderColor: primaryBorderColorFocusIndicator,
      //             borderRadius: borderRadiusFocused,
      //           },
      //         },
      //       }),
      //     ...(isFromKeyboard &&
      //       circular && {
      //         ':focus': {
      //           color: primaryColorFocus,
      //           backgroundColor: primaryBackgroundColorFocus,
      //           borderColor: primaryBackgroundColorFocus,
      //           ':after': {
      //             content: '""',
      //             position: 'absolute',
      //             top: '0',
      //             right: '0',
      //             bottom: '0',
      //             left: '0',
      //             borderWidth: pxToRem(primaryBorderWidth),
      //             borderStyle: 'solid',
      //             borderColor: primaryCircularBorderColorFocusIndicator,
      //             borderRadius: circularRadius,
      //           },
      //         },
      //       }),
      //     ...(!isFromKeyboard && {
      //       ':focus': {
      //         ':active': {
      //           color: primaryColorActive,
      //           backgroundColor: primaryBackgroundColorActive,
      //           borderColor: primaryBorderColorActive,
      //           boxShadow: 'none',
      //         },
      //       },
      //     }),
      //   }),

      // Overrides for "disabled" buttons
      ...(disabled && {
        cursor: 'default',
        color: colorScheme.foregroundDisabled2,
        backgroundColor: colorScheme.backgroundDisabled1,
        borderColor: colorScheme.borderDisabled,
        boxShadow: 'none',
        ':hover': {
          backgroundColor: colorScheme.backgroundDisabled1,
          borderColor: colorScheme.borderDisabled,
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
