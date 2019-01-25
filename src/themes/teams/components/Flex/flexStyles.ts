import { ComponentSlotStylesInput } from '../../../types'
import { FlexProps } from '../../../../components/Flex/Flex'

import { toFlexAlignment } from './utils'

const flexStyles: ComponentSlotStylesInput<FlexProps, any> = {
  root: ({ props: p }) => {
    return {
      display: 'flex',
      ...(p.debug && { border: '1px dotted grey', background: 'lightgrey' }),

      ...(p.inline && { display: 'inline-flex' }),

      ...(p.row && { flexDirection: 'row' }),
      ...(p.column && { flexDirection: 'column' }),

      ...(p.center && {
        justifyContent: 'center',
        alignItems: 'center',
      }),

      // TODO note - too much copypaste!!
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

      // NOTE - EXPERIMENTAL PROPS //
      ...(p.fill && {
        height: '100%',
      }),

      ...(p.padding && { padding: p.padding }),
    }
  },
}

export default flexStyles
