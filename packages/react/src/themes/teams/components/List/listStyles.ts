import { debugRoot } from '../../../../styles/debugStyles'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ListProps } from '../../../../components/List/List'

const listStyles: ComponentSlotStylesInput<ListProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugRoot()),
    display: p.vertical ? 'block' : 'inline-flex',
    ...((p.as === 'ul' || p.as === 'ol') && {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    }),
  }),
}

export default listStyles
