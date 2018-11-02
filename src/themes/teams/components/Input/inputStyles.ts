import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { InputProps } from '../../../../components/Input/Input'
import { InputVariables } from './inputVariables'
import { PositionProperty } from 'csstype'

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
      borderBottomColor: v.inputFocusBorderBottomColor,
      boxShadow: v.boxShadow,
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
