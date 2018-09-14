import { debugGap } from '../../../../styles/debugStyles'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const layoutGapStyles: IComponentPartStylesInput = {
  root: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugGap({ vertical: props.vertical })),
    ...(props.size && { flex: `0 0 ${props.size}` }),
  }),
}

export default layoutGapStyles
