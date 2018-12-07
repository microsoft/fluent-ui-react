import { debugRoot } from '../../../../styles/debugStyles'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ListProps } from '../../../../components/List/List'

const listStyles: ComponentSlotStylesInput<ListProps> = {
  root: ({ props }): ICSSInJSStyle => {
    const { as, debug } = props
    return {
      ...(debug && debugRoot()),
      ...((as === 'ul' || as === 'ol') && {
        listStyle: 'none',
        display: 'block',
        padding: 0,
        margin: 0,
      }),
    }
  },
}

export default listStyles
