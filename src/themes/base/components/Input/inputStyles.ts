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
    ...(p.clearable && { padding: v.inputPaddingWithIconAtEnd }),
    ...(p.icon && {
      padding:
        p.iconPosition === 'start' ? v.inputPaddingWithIconAtStart : v.inputPaddingWithIconAtEnd,
    }),
  }),

  icon: ({ props: { iconPosition }, variables: v }): ICSSInJSStyle => ({
    position: v.iconPosition as PositionProperty,
    color: v.iconColor,
    ...(iconPosition === 'start' && {
      left: v.iconLeft,
    }),
    ...(iconPosition === 'end' && {
      right: v.iconRight,
    }),
    outline: 0,
  }),
}

export default inputStyles
