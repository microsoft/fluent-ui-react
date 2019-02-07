import { ComponentSlotStylesInput } from '../../../types'
import { FlexProps } from '../../../../components/Flex/Flex'

import { toFlexAlignment } from './utils'

const flexStyles: ComponentSlotStylesInput<FlexProps, any> = {
  root: ({ props: p, variables: v }) => ({
    display: 'flex',
    ...(p.debug && { border: '1px dotted grey', background: 'lightgrey' }),

    ...(p.inline && { display: 'inline-flex' }),

    ...(p.column && { flexDirection: 'column' }),

    ...(p.hAlign &&
      (p.column
        ? { alignItems: toFlexAlignment(p.hAlign) }
        : { justifyContent: toFlexAlignment(p.hAlign) })),
    ...(p.vAlign &&
      (p.column
        ? { justifyContent: toFlexAlignment(p.vAlign) }
        : { alignItems: toFlexAlignment(p.vAlign) })),

    ...(p.space && { justifyContent: `space-${p.space}` }),

    ...(p.wrap && { flexWrap: 'wrap' }),

    ...(p.fill && {
      height: '100%',
    }),

    ...(p.padding && { padding: v[p.padding] }),
  }),

  gap: ({ props: p, variables: v }) => {
    const gapValue = v[p.gap]

    return {
      ...(p.column ? { height: gapValue } : { width: gapValue }),
    }
  },
}

export default flexStyles
