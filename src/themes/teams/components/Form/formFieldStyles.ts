import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { FormProps } from '../../../../components/Form/Form'
import { teamsPxToRem } from '../../utils'

const formFieldStyles: ComponentSlotStylesInput<FormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
  label: ({ props }): ICSSInJSStyle => {
    const { type, inline, required } = props
    return {
      ...((!type || (type !== 'radio' && type !== 'checkbox')) && {
        display: 'block',
      }),
      ...(inline && { marginRight: teamsPxToRem(10), display: 'inline' }),
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
          marginRight: teamsPxToRem(10),
        }),
    }
  },
  message: (): ICSSInJSStyle => ({
    display: 'block',
  }),
}

export default formFieldStyles
