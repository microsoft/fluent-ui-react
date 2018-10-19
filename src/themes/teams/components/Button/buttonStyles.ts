import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IButtonProps, IButtonState } from '../../../../components/Button/Button'
import { truncateStyle } from '../../../../styles/customCSS'

const buttonStyles: IComponentPartStylesInput<IButtonProps & IButtonState, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, fluid, type, text, iconOnly, isFromKeyboard } = props
    const primary = type === 'primary'

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
              border: `${pxToRem(borderWidth)} solid ${borderColorFocusIndicator}`,
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

      ...(circular &&
        !text && {
          color: circularColor,
          backgroundColor: circularBackgroundColor,
          borderColor: circularBorderColor,
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
                border: `${pxToRem(borderWidth)} solid ${circularBorderColorFocusIndicator}`,
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

      ...(primary &&
        !text &&
        !disabled && {
          color: primaryColor,
          backgroundColor: primaryBackgroundColor,
          border: `${pxToRem(primaryBorderWidth)} solid ${primaryBorderColor}`,
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
                  border: `${pxToRem(
                    primaryBorderWidth,
                  )} solid ${primaryBorderColorFocusIndicator}`,
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
                  border: `${pxToRem(
                    primaryBorderWidth,
                  )} solid ${primaryCircularBorderColorFocusIndicator}`,
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

      ...(text && {
        color: textColor,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        ':hover': {
          color: textColorHover,
        },
      }),

      ...(primary &&
        text && {
          color: textPrimaryColor,
          ':hover': {
            color: textPrimaryColorHover,
          },
        }),

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
        boxShadow: 'none',
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
