import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { FormProps } from '../../../../components/Form/Form'

const formStyles: ComponentSlotStylesInput<FormProps, any> = {
  root: ({ props, variables, pxToRem }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'space-evenly',
    gridGap: pxToRem(20),
    justifyItems: 'start',
  }),
}

export default formStyles
