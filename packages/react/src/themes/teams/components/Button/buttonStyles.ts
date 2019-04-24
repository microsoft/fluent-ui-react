import * as _ from 'lodash'

import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ButtonProps, ButtonState } from '../../../../components/Button/Button'
import { ButtonVariables } from './buttonVariables'
import { getBorderStyles } from '../../borders'

const buttonStyles: ComponentSlotStylesInput<ButtonProps & ButtonState, ButtonVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, fluid, primary, text, iconOnly, isFromKeyboard } = props

    const {
      height,
      minWidth,
      maxWidth,
      borderRadius,
      circularBorderRadius,
      paddingLeftRightValue,

      color,
      // colorActive,
      colorHover,
      colorFocus,
      colorDisabled,
      backgroundColor,
      // backgroundColorActive,
      backgroundColorHover,
      backgroundColorFocus,
      backgroundColorDisabled,
      borderColor,
      // borderColorActive,
      borderColorHover,
      borderColorFocus,
      borderColorFocusIndicator,
      borderColorDisabled,
      borderWidth,

      primaryColor,
      // primaryColorActive,
      primaryColorHover,
      primaryColorFocus,
      primaryBackgroundColor,
      // primaryBackgroundColorActive,
      primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      primaryBorderColor,
      // primaryBorderColorActive,
      // primaryBorderColorHover,
      // primaryBorderColorFocus,
      // primaryBorderColorFocusIndicator,

      // primaryCircularBorderColorFocusIndicator,

      circularColor,
      circularColorActive,
      circularBackgroundColor,
      // circularBackgroundColorActive,
      circularBackgroundColorHover,
      circularBackgroundColorFocus,
      circularBorderColor,
      // circularBorderColorActive,
      circularBorderColorHover,
      circularBorderColorFocus,
      circularBorderColorFocusIndicator,

      textColor,
      textColorHover,
      textPrimaryColor,
      textPrimaryColorHover,
      boxShadow,
      // borderRadiusFocused,
    } = variables

    return {
      height,
      minWidth,
      maxWidth,
      color,
      backgroundColor,
      // borderRadius, // TODO needed?
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      verticalAlign: 'middle',
      cursor: 'pointer',

      // rectangular button defaults
      ...(!text &&
        _.merge(
          {
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

            // ':before': {
            //   content: '""',
            //   position: 'absolute',
            //   top: pxToRem(borderWidth),
            //   right: pxToRem(borderWidth),
            //   bottom: pxToRem(borderWidth),
            //   left: pxToRem(borderWidth),
            //   borderWidth: pxToRem(borderWidth),
            //   borderStyle: 'solid',
            //   borderColor: 'transparent',
            //   borderRadius: borderRadiusFocused,
            // },

            // ':after': {
            //   content: '""',
            //   position: 'absolute',
            //   top: '0',
            //   right: '0',
            //   bottom: '0',
            //   left: '0',
            //   borderWidth: pxToRem(borderWidth),
            //   borderStyle: 'solid',
            //   borderColor,
            //   borderRadius: borderRadiusFocused,
            // },

            ...(isFromKeyboard && {
              ':focus': {
                color: colorFocus,
                backgroundColor: backgroundColorFocus,
                // borderColor: 'transparent', // TODO: needed?
                boxShadow: 'none',

                // ':before': {
                //   borderColor: borderColorFocus,
                // },

                // ':after': {
                //   borderColor: borderColorFocusIndicator,
                // },
              },
            }),

            // TODO: do we care about this? where is it used?
            // ...(!isFromKeyboard && {
            //   ':focus': {
            //     ':active': {
            //       color: colorActive,
            //       backgroundColor: backgroundColorActive,
            //       borderColor: borderColorActive,
            //       boxShadow: 'none',
            //     },
            //   },
            // }),
          },
          getBorderStyles({
            borderWidth,
            borderRadius,
            borderColorInner: borderColorFocus,
            borderColorOuter: borderColorFocusIndicator,
            focusFromKeyboard: isFromKeyboard,
          }),
        )),

      // circular button defaults
      ...(circular &&
        !text &&
        _.merge(
          {
            minWidth: height,
            padding: 0,
            color: circularColor,
            backgroundColor: circularBackgroundColor,
            borderColor: circularBorderColor,
            // borderRadius: circularRadius,

            ':hover': {
              color: circularColorActive,
              backgroundColor: circularBackgroundColorHover,
              borderColor: circularBorderColorHover, // TODO: add to getBorderStyles?
            },
            ...(isFromKeyboard && {
              ':focus': {
                color: circularColorActive,
                backgroundColor: circularBackgroundColorFocus,
                // borderColor: circularBorderColorFocus,
                // ':after': {
                //   content: '""',
                //   position: 'absolute',
                //   top: '0',
                //   right: '0',
                //   bottom: '0',
                //   left: '0',
                //   borderWidth: `${pxToRem(borderWidth)}`,
                //   borderStyle: 'solid',
                //   borderColor: `${circularBorderColorFocusIndicator}`,
                //   borderRadius: circularRadius,
                // },
              },
            }),

            // TODO: needed?
            // ...(!isFromKeyboard && {
            //   ':focus': {
            //     ':active': {
            //       color: circularColorActive,
            //       backgroundColor: circularBackgroundColorActive,
            //       borderColor: circularBorderColorActive, // TODO: needed?
            //       boxShadow: 'none',
            //     },
            //   },
            // }),
          },
          getBorderStyles({
            borderWidth,
            borderRadius: circularBorderRadius,
            borderColorInner: circularBorderColorFocusIndicator,
            borderColorOuter: circularBorderColorFocus,
            focusFromKeyboard: isFromKeyboard,
          }),
        )),

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
        !text &&
        _.merge(
          {
            color: primaryColor,
            backgroundColor: primaryBackgroundColor,
            // borderWidth, // TODO needed?
            // borderStyle: 'solid', // TODO needed?
            borderColor: primaryBorderColor,
            ':hover': {
              color: primaryColorHover,
              backgroundColor: primaryBackgroundColorHover,
            },

            // ':after': {
            //   borderColor: primaryBorderColor,
            // },

            ...(isFromKeyboard && {
              ':focus': {
                color: primaryColorFocus,
                backgroundColor: primaryBackgroundColorFocus,

                // ':before': {
                //   borderColor: borderColorFocus,
                // },

                // ':after': {
                //   borderColor: borderColorFocusIndicator,
                // },
              },

              // TODO redundant => remove
              // ...(circular && {
              //   ':focus': {
              //     color: primaryColorFocus,
              //     backgroundColor: primaryBackgroundColorFocus,
              //     borderColor: primaryBorderColorFocus, // FIX for circular border styles
              //   },
              // }),
            }),

            // TODO: do we care about this? where is it used?
            // ...(!isFromKeyboard && {
            //   ':focus': {
            //     ':active': {
            //       color: primaryColorActive,
            //       backgroundColor: primaryBackgroundColorActive,
            //       borderColor: primaryBorderColorActive,
            //       boxShadow: 'none',
            //     },
            //   },
            // }),
          },
          getBorderStyles({
            borderWidth,
            borderRadius: circular ? circularBorderRadius : borderRadius,
            borderColorInner: borderColorFocus,
            borderColorOuter: circular ? circularBorderColorFocus : borderColorFocusIndicator,
            focusFromKeyboard: isFromKeyboard,
          }),
        )),

      // Overrides for "disabled" buttons
      ...(disabled && {
        cursor: 'default',
        color: colorDisabled,
        backgroundColor: backgroundColorDisabled,
        borderColor: borderColorDisabled,
        boxShadow: 'none',
        ':hover': {
          backgroundColor: backgroundColorDisabled,
          // borderColor: borderColorDisabled, // TODO needed?
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
