import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const toolbarStyles: ComponentSlotStylesInput = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
  }),

  wrapper: (): ICSSInJSStyle => ({
    position: 'relative',
  }),

  measurement: (): ICSSInJSStyle => ({
    position: 'fixed',
    visibility: 'hidden',
  }),
}

export default toolbarStyles
