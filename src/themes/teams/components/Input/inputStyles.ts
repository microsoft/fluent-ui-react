import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { InputProps } from '../../../../components/Input/Input'
import { TeamsInputVariables } from './inputVariables'

const inputStyles: ComponentSlotStylesInput<InputProps, TeamsInputVariables> = {
  input: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ':focus': {
      borderBottomColor: v.inputFocusBorderBottomColor,
      boxShadow: v.boxShadow,
    },
  }),
}

export default inputStyles
