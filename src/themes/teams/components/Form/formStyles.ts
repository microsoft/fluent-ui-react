import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { FormProps } from '../../../../components/Form/Form'
import { teamsPxToRem } from '../../utils'

const formStyles: ComponentSlotStylesInput<FormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'space-evenly',
    gridGap: teamsPxToRem(20),
    justifyItems: 'start',
  }),
}

export default formStyles
