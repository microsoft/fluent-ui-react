import { debugRoot } from '../../../../styles/debugStyles'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const layoutStyles: ComponentSlotStylesInput = {
  root: ({ props }): ICSSInJSStyle => {
    const { debug, vertical } = props

    return {
      ...(debug && debugRoot()),
      display: 'flex',
      ...(vertical && {
        flexDirection: 'column',
      }),
    }
  },
}

export default layoutStyles
