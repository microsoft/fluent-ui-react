import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IFormProps } from '../../../../components/Form/Form'
import { pxToRem } from '../../../../lib'

const formFieldStyles: IComponentPartStylesInput<IFormProps, any> = {
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
  message: (): ICSSInJSStyle => ({
    display: 'block',
  }),
}

export default formFieldStyles
