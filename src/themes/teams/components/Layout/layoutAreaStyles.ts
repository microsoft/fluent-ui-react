import { debugArea } from '../../../../styles/debugStyles'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const layoutStyles: IComponentPartStylesInput = {
  root: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugArea()),
    flex: 1,
    ...(props.size === 'auto' && { flex: '0 0 auto' }),
    ...(props.truncate && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
  }),
}

export default layoutStyles
