import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IFormProps } from '../../../../components/Form/Form'
import { pxToRem } from '../../../../lib'

const formStyles: IComponentPartStylesInput<IFormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
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
