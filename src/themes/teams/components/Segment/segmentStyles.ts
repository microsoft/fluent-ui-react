import * as _ from 'lodash'

import { SegmentProps } from '../../../../components/Segment/Segment'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { SegmentVariables } from './segmentVariables'

const segmentStyles: ComponentSlotStylesInput<SegmentProps, SegmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const segmentColor = _.get(v.colors, p.color)

    return {
      padding: v.padding,
      borderTop: `2px solid transparent`,
      borderRadius: v.borderRadius,
      boxShadow: `0 1px 1px 1px ${v.boxShadowColor}`,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderColor: segmentColor,
      ...(p.inverted && {
        color: v.backgroundColor,
        backgroundColor: segmentColor || v.color,
      }),
    }
  },
}

export default segmentStyles
