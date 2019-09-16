import { TextAreaVariables } from './textAreaVariables'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TextAreaProps } from 'packages/react/src/components/TextArea/TextArea'

const textAreaStyles: ComponentSlotStylesInput<TextAreaProps, TextAreaVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    margin: v.margin,
    height: v.height,

    backgroundColor: v.backgroundColor,
    ...(p.inverted && {
      backgroundColor: v.backgroundColorInverted,
    }),

    color: v.fontColor,

    borderColor: v.borderColor,
    borderRadius: v.borderRadius,
    borderStyle: 'solid',
    borderWidth: v.borderWidth,

    outline: 0,
    padding: v.padding,

    ...(!p.resize && {
      resize: 'none',
    }),

    ...(p.resize && {
      resize: p.resize,
    }),

    ...(p.fluid && {
      width: '100%',
    }),

    ...(p.disabled && {
      pointerEvents: 'none',
      backgroundColor: v.backgroundColorDisabled,
      color: v.colorDisabled,
    }),

    '::placeholder': {
      color: v.placeholderColor,
      opacity: 1, // undo Firefox default opacity
    },

    ':focus': {
      borderColor: v.focusBorderColor,
    },
  }),
}

export default textAreaStyles
