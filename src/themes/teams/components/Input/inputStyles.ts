import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IInputProps } from '../../../../components/Input/Input'

const inputStyles: IComponentPartStylesInput<IInputProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { fluid } = props

    return {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      outline: 0,
      ...(fluid && { width: '100%' }),
    }
  },

  input: ({ props, variables }): ICSSInJSStyle => {
    const { fluid, inline } = props

    return {
      outline: 0,
      border: 0,
      borderRadius: variables.borderRadius,
      borderBottom: variables.borderBottom,
      color: variables.fontColor,
      backgroundColor: variables.backgroundColor,
      padding: variables.inputPadding,
      ...(fluid && { width: '100%' }),
      ...(inline && { float: 'left' }),
      ':focus': {
        borderColor: variables.inputFocusBorderColor,
        borderRadius: variables.inputFocusBorderRadius,
      },
    }
  },

  icon: ({ props, variables }): ICSSInJSStyle => {
    return {
      position: variables.iconPosition,
      right: variables.iconRight,
      color: variables.iconColor,
      outline: 0,
    }
  },
}

export default inputStyles
