import { debugRoot } from '../../../../styles/debugStyles'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { ListProps } from '../../../../components/List/List'

const listStyles: ComponentSlotStylesPrepared<ListProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugRoot()),
    display: p.horizontal ? 'inline-flex' : 'block',
    ...((p.as === 'ul' || p.as === 'ol') && {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    }),
  }),
}

export default listStyles
