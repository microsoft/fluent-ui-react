import * as _ from 'lodash'

import { SegmentProps } from '../../../../components/Segment/Segment'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { SegmentVariables } from './segmentVariables'

const segmentStyles: ComponentSlotStylesInput<SegmentProps, SegmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const color = _.get(v.colors, p.color, v.color)

    return {
      padding: v.padding,
      background: v.background,
      borderRadius: v.borderRadius,
      boxShadow: '0 1px 1px 1px rgba(34,36,38,.15)',
      ...(color &&
        (p.inverted
          ? {
              background: color,
              color: '#eee', // TODO: fix this color once we fix #629
            }
          : {
              borderTop: `2px solid ${color}`,
            })),
    }
  },
}

export default segmentStyles
