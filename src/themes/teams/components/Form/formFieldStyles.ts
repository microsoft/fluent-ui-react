import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IFormProps } from '../../../../components/Form/Form'
import { pxToRem } from '../../../../lib'

const formFieldStyles: IComponentPartStylesInput<IFormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
  label: ({ props }): ICSSInJSStyle => ({
    display: 'block',
    ...(props.inline && { marginRight: pxToRem(10), display: 'inline' }),
  }),
  message: (): ICSSInJSStyle => ({
    display: 'block',
  }),
}

export default formFieldStyles
