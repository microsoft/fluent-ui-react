import { SegmentProps } from '../../../../components/Segment/Segment'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { SegmentVariables } from './segmentVariables'

const segmentStyles: ComponentSlotStylesInput<SegmentProps, SegmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const color = p.color || v.color
    return {
      padding: v.padding,
      background: v.background,
      borderRadius: v.borderRadius,
      boxShadow: '0 1px 1px 1px rgba(34,36,38,.15)',
      ...(color &&
        (p.inverted
          ? {
              background: color,
              color: '#eee',
            }
          : {
              borderTop: `2px solid ${color}`,
            })),
    }
  },
}

export default segmentStyles
