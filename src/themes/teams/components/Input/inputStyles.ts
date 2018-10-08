import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IInputProps } from '../../../../components/Input/Input'
import { IInputVariables } from './inputVariables'
import { PositionProperty } from 'csstype'

const inputStyles: IComponentPartStylesInput<IInputProps, IInputVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    outline: 0,
    ...(p.fluid && { width: '100%' }),
  }),

  input: ({ props: p }): ICSSInJSStyle => p.inline && { float: 'left' },

  icon: ({ variables: v }): ICSSInJSStyle => ({
    position: v.iconPosition as PositionProperty,
    right: v.iconRight,
    outline: 0,
  }),
}

export default inputStyles
