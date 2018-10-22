import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { InputProps } from '../../../../components/Input/Input'
import { InputVariables } from './inputVariables'
import { PositionProperty } from 'csstype'
import { pxToRem } from '../../../../lib'

const inputStyles: ComponentSlotStylesInput<InputProps, InputVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    outline: 0,
    ...(p.fluid && { width: '100%' }),
  }),

  input: ({ props: p, variables: v }): ICSSInJSStyle => ({
    outline: 0,
    border: v.border,
    borderRadius: v.borderRadius,
    borderBottom: v.borderBottom,
    color: v.fontColor,
    backgroundColor: v.backgroundColor,
    position: 'relative',
    padding: v.inputPadding,
    ...(p.fluid && { width: '100%' }),
    ...(p.inline && { float: 'left' }),
    '::placeholder': {
      color: v.fontColor,
    },
    ':focus': {
      borderBottomColor: v.inputFocusBorderColor,
    },
    '&::after': {
      borderRadius: v.inputFocusBorderRadius,
      borderBottom: `${pxToRem(2)} solid transparent`,
      content: '',
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
    },
  }),

  icon: ({ variables: v }): ICSSInJSStyle => ({
    position: v.iconPosition as PositionProperty,
    color: v.iconColor,
    right: v.iconRight,
    outline: 0,
  }),
}

export default inputStyles
