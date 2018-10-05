import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IButtonProps, IButtonState } from '../../../../components/Button/Button'
import { truncateStyle } from '../../../../styles/customCSS'

const buttonStyles: IComponentPartStylesInput<IButtonProps & IButtonState, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, fluid, type, text, iconOnly, isFromKeyboard } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      height,
      minWidth,
      maxWidth,
      borderRadius,
      circularRadius,
      paddingLeftRightValue,

      color,
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

      primaryColor,
      primaryColorDisabled,
      primaryBackgroundColor,
      primaryBackgroundColorActive,
      primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      primaryBackgroundColorDisabled,
      primaryBorderColor,
      primaryBorderColorActive,
      primaryBorderColorHover,
      primaryBorderColorFocus,
      primaryBorderColorFocusIndicator,
      primaryBorderColorDisabled,

      secondaryCircularColor,
      secondaryCircularColorActive,
      secondaryCircularColorDisabled,
      secondaryCircularBackgroundColor,
      secondaryCircularBackgroundColorActive,
      secondaryCircularBackgroundColorHover,
      secondaryCircularBackgroundColorFocus,
      secondaryCircularBackgroundColorDisabled,
      secondaryCircularBorderColor,
      secondaryCircularBorderColorActive,
      secondaryCircularBorderColorHover,
      secondaryCircularBorderColorFocus,
      secondaryCircularBorderColorFocusIndicator,
      secondaryCircularBorderColorDisabled,

      textColorHover,
      textPrimaryColor,
      textPrimaryColorHover,
      textSecondaryColor,
      textSecondaryColorHover,
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

      ...(!text && {
        outline: 0,
        borderRadius: '2px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor,
        ':hover': {
          backgroundColor: backgroundColorHover,
          borderColor,
        },
        ...(isFromKeyboard && {
          ':focus': {
            backgroundColor: backgroundColorFocus,
            borderColor: borderColorFocus,
            ':after': {
              content: '""',
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              bottom: '-2px',
              left: '-2px',
              border: `${pxToRem(1)} solid ${borderColorFocusIndicator}`,
              borderRadius: '3px',
            },
          },
        }),
        ...(!isFromKeyboard && {
          ':focus': {
            ':active': {
              backgroundColor: backgroundColorActive,
              borderColor: borderColorActive,
            },
          },
        }),
      }),

      ...(circular &&
        !text && {
          color: secondaryCircularColor,
          backgroundColor: secondaryCircularBackgroundColor,
          borderColor: secondaryCircularBorderColor,
          ':hover': {
            color: secondaryCircularColorActive,
            backgroundColor: secondaryCircularBackgroundColorHover,
            borderColor: secondaryCircularBorderColorHover,
          },
          ...(isFromKeyboard && {
            ':focus': {
              color: secondaryCircularColorActive,
              backgroundColor: secondaryCircularBackgroundColorFocus,
              borderColor: secondaryCircularBorderColorFocus,
              ':after': {
                content: '""',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                border: `${pxToRem(1)} solid ${secondaryCircularBorderColorFocusIndicator}`,
                borderRadius: circularRadius,
              },
            },
          }),
          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                color: secondaryCircularColorActive,
                backgroundColor: secondaryCircularBackgroundColorActive,
                borderColor: secondaryCircularBorderColorActive,
              },
            },
          }),
        }),

      ...(primary &&
        !text && {
          color: primaryColor,
          backgroundColor: primaryBackgroundColor,
          borderColor: primaryBorderColor,
          ':hover': {
            backgroundColor: primaryBackgroundColorHover,
            borderColor: primaryBorderColorHover,
          },

          ...(isFromKeyboard && {
            ':focus': {
              backgroundColor: primaryBackgroundColorFocus,
              borderColor: primaryBorderColorFocus,
              ':after': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                bottom: '-2px',
                left: '-2px',
                border: `${pxToRem(1)} solid ${primaryBorderColorFocusIndicator}`,
                borderRadius: '3px',
              },
            },
          }),
          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                backgroundColor: primaryBackgroundColorActive,
                borderColor: primaryBorderColorActive,
              },
            },
          }),
        }),

      ...(text && {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        ':hover': {
          color: textColorHover,
        },
      }),

      // ...(primary &&
      //   !text &&
      //   !circular && {
      //     ':focus': {
      //       ...(isFromKeyboard && {
      //         backgroundColor: primaryBackgroundColorFocus,
      //         borderColor: primaryBorderColorFocus,
      //         '::before': {
      //           content: '""',
      //           position: 'absolute',
      //           top: '0',
      //           left: '0',
      //           right: '0',
      //           bottom: '0',
      //           border: `${pxToRem(1)} solid ${primaryBorderColorInsetFocus}`,
      //           borderRadius: `${pxToRem(2)}`,
      //         },
      //       }),
      //     },
      //   }),

      ...(primary &&
        text && {
          color: textPrimaryColor,
          ':hover': {
            color: textPrimaryColorHover,
          },
        }),

      // ...(secondary &&
      //   !text && {
      //     color: secondaryColor,
      //     backgroundColor: secondaryBackgroundColor,
      //     borderColor: secondaryBorderColor,
      //     border: `${pxToRem(1)} solid ${secondaryBorderColor}`,
      //     ':active': {
      //       backgroundColor: secondaryBackgroundColorActive,
      //       borderColor: secondaryBorderColorActive,
      //     },
      //     ':hover': {
      //       backgroundColor: secondaryBackgroundColorHover,
      //       borderColor: secondaryBorderColorHover,
      //     },
      //   }),

      // ...(secondary &&
      //   !text &&
      //   !circular && {
      //     ':focus': {
      //       ...(isFromKeyboard && {
      //         backgroundColor: secondaryBackgroundColorFocus,
      //         borderColor: secondaryBorderColorFocus,
      //         '::before': {
      //           content: '""',
      //           position: 'absolute',
      //           top: '0',
      //           left: '0',
      //           right: '0',
      //           bottom: '0',
      //           border: `${pxToRem(1)} solid ${secondaryBorderColorInsetFocus}`,
      //           borderRadius: `${pxToRem(2)}`,
      //         },
      //       }),
      //     },
      //   }),

      // ...(secondary &&
      //   text && {
      //     color: textSecondaryColor,
      //     ':hover': {
      //       color: textSecondaryColorHover,
      //     },
      //   }),

      ...(circular && {
        minWidth: height,
        padding: 0,
        borderRadius: circularRadius,
      }),

      ...(fluid && {
        width: '100%',
        maxWidth: '100%',
      }),

      ...(disabled && {
        cursor: 'default',
        color: colorDisabled,
        backgroundColor: backgroundColorDisabled,
        borderColor: borderColorDisabled,
        ':hover': {
          backgroundColor: backgroundColorDisabled,
          borderColor: borderColorDisabled,
        },
      }),

      ...(iconOnly && {
        minWidth: height,
        padding: 0,
      }),
    }
  },

  content: ({ props }) => ({
    overflow: 'hidden',
    ...(typeof props.content === 'string' && truncateStyle),
  }),
}

export default buttonStyles
