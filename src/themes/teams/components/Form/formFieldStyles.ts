import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { FormProps } from '../../../../components/Form/Form'

const formFieldStyles: ComponentSlotStylesInput<FormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
  label: ({ props, pxToRem }): ICSSInJSStyle => {
    const { type, inline, required } = props
    return {
      ...((!type || (type !== 'radio' && type !== 'checkbox')) && {
        display: 'block',
      }),
      ...(inline && { marginRight: pxToRem(10), display: 'inline' }),
      ...(required && {
        '::after': {
          content: '"*"',
        },
      }),
    }
  },
  control: ({ props, pxToRem }): ICSSInJSStyle => {
    const { type } = props
    return {
      ...(type &&
        (type === 'radio' || type === 'checkbox') && {
          marginRight: pxToRem(10),
        }),
    }
  },
  message: (): ICSSInJSStyle => ({
    display: 'block',
  }),
}

export default formFieldStyles
