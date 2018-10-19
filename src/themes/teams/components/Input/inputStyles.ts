import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
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
    border: 0,
    borderRadius: v.borderRadius,
    borderBottom: v.borderBottom,
    color: v.fontColor,
    backgroundColor: v.backgroundColor,
    padding: v.inputPadding,
    ...(p.fluid && { width: '100%' }),
    ...(p.inline && { float: 'left' }),
    ':focus': {
      borderColor: v.inputFocusBorderColor,
      borderRadius: v.inputFocusBorderRadius,
    },
  }),

  icon: ({ variables: v }): ICSSInJSStyle => ({
    position: v.iconPosition as PositionProperty,
    right: v.iconRight,
    outline: 0,
  }),
}

export default inputStyles
