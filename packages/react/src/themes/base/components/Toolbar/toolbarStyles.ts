import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const toolbarStyles: ComponentSlotStylesInput = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
  }),
}

export default toolbarStyles
