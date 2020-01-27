import { debugRoot } from '../../../../styles/debugStyles'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { ListProps } from '../../../../components/List/List'

export type ListStylesProps = Pick<ListProps, 'debug' | 'horizontal'> & { as: string }

const listStyles: ComponentSlotStylesPrepared<ListStylesProps> = {
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
