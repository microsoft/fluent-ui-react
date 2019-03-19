import { ComponentSlotStylesInput } from '../../../types'
import { FlexItemProps } from '../../../../components/Flex/FlexItem'

import { toFlexAlignment, toFlexItemSizeValues } from './utils'
import { FlexItemVariables } from './flexItemVariables'

const flexItemStyles: ComponentSlotStylesInput<FlexItemProps, FlexItemVariables> = {
  root: ({ props: p, variables: v }) => {
    return {
      ...(p.align && { alignSelf: toFlexAlignment(p.align) }),

      ...(p.size && toFlexItemSizeValues(v[p.size])),

      ...(p.shrink && { flexShrink: p.shrink }),
      ...(p.shrink === false && { flexShrink: 0 }),

      ...(p.grow && { flexGrow: p.grow }),
      ...(p.grow === true && { flexGrow: 1 }),

      ...p.itemStyles,

      ...(p.gap &&
        (p.flexDirection === 'column' ? { marginTop: v[p.gap] } : { marginLeft: v[p.gap] })),

      ...(p.push &&
        (p.flexDirection === 'column' ? { marginTop: 'auto' } : { marginLeft: 'auto' })),
    }
  },
}

export default flexItemStyles
