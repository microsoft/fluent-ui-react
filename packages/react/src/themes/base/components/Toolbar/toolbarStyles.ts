import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const toolbarStyles: ComponentSlotStylesInput = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    outline: '1px solid blue',
  }),

  wrapper: (): ICSSInJSStyle => ({
    position: 'relative',
  }),

  measurement: (): ICSSInJSStyle => ({
    // position: 'fixed',
    // visibility: 'hidden',
    background: '#ff000044',
  }),
}

export default toolbarStyles
