import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { FormProps } from '../../../../components/Form/Form'
import { pxToRem } from '../../../../lib'

const formFieldStyles: ComponentSlotStylesInput<FormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
  label: ({ props }): ICSSInJSStyle => {
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
  control: ({ props }): ICSSInJSStyle => {
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
