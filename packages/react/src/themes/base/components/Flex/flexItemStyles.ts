import { ComponentSlotStylesInput } from '../../../types'
import { FlexItemProps } from '../../../../components/Flex/FlexItem'

import { toFlexAlignment, toFlexItemSizeValues } from './utils'
import { FlexItemVariables } from './flexItemVariables'

const flexItemStyles: ComponentSlotStylesInput<FlexItemProps, FlexItemVariables> = {
  root: ({ props: p, variables: v }) => {
    return {
      ...(p.align && { alignSelf: toFlexAlignment(p.align) }),

      ...(p.size && toFlexItemSizeValues(v[p.size])),

      ...(typeof p.shrink === 'number' && { flexShrink: p.shrink }),
      ...(p.shrink === false && { flexShrink: 0 }),

      ...(p.grow && { flexGrow: p.grow }),
      ...(p.grow === true && { flexGrow: 1 }),

      ...p.itemStyles,
      ...(p.push &&
        (p.flexDirection === 'column' ? { marginTop: 'auto' } : { marginLeft: 'auto' })),
    }
  },
}

export default flexItemStyles
