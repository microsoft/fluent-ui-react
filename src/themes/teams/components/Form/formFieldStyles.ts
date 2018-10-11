import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IFormProps } from '../../../../components/Form/Form'

const formFieldStyles: IComponentPartStylesInput<IFormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({}),
  label: ({ props }): ICSSInJSStyle => ({
    ...(!props.inline && { display: 'block' }),
  }),
}

export default formFieldStyles
