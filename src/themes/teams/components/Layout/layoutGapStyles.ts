import { debugGap } from '../../../../styles/debugStyles'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const layoutGapStyles: ComponentSlotStylesInput = {
  root: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugGap({ vertical: props.vertical })),
    ...(props.size && { flex: `0 0 ${props.size}` }),
  }),
}

export default layoutGapStyles
