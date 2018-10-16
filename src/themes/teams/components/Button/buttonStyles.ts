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

      primaryColor,
      primaryBackgroundColor,
      primaryBackgroundColorActive,
      primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      primaryBorderColor,
      primaryBorderColorActive,
      primaryBorderColorHover,
      primaryBorderColorFocus,
      primaryBorderColorFocusIndicator,

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
        borderWidth: '1px',
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
                border: `${pxToRem(1)} solid ${circularBorderColorFocusIndicator}`,
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
        !text && {
          color: primaryColor,
          backgroundColor: primaryBackgroundColor,
          borderColor: primaryBorderColor,
          ':hover': {
            backgroundColor: primaryBackgroundColorHover,
            borderColor: primaryBorderColorHover,
          },

          ...(isFromKeyboard &&
            !circular && {
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
          ...(isFromKeyboard &&
            circular && {
              ':focus': {
                backgroundColor: primaryBackgroundColorFocus,
                borderColor: primaryBackgroundColorFocus,
                ':after': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  bottom: '0',
                  left: '0',
                  border: `${pxToRem(1)} solid ${primaryCircularBorderColorFocusIndicator}`,
                  borderRadius: circularRadius,
                },
              },
            }),
          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
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
