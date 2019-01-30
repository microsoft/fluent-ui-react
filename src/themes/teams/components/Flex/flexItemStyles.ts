import { ComponentSlotStylesInput } from '../../../types'
import { FlexItemProps } from '../../../../components/Flex/FlexItem'

import { toFlexAlignment, toFlexItemSizeValues } from './utils'

const flexItemStyles: ComponentSlotStylesInput<FlexItemProps, any> = {
  root: ({ props: p }) => {
    return {
      ...(p.align && { alignSelf: toFlexAlignment(p.align) }),

      ...(p.size && toFlexItemSizeValues(p.size)),

      ...(p.shrink && { flexShrink: p.shrink }),
      ...(p.shrink === false && { flexShrink: 0 }),

      ...(p.stretch && { flexGrow: p.stretch }),
      ...(p.stretch === true && { flexGrow: 1 }),

      ...p.itemStyles,
      ...(p.push &&
        (p.flexDirection === 'column' ? { marginTop: 'auto' } : { marginLeft: 'auto' })),
    }
  },
}

export default flexItemStyles
