import { SegmentProps } from '../../../../components/Segment/Segment'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { SegmentVariables } from './segmentVariables'
import { getColorScheme } from '../../colors'

const segmentStyles: ComponentSlotStylesInput<SegmentProps, SegmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, p.color)

    return {
      padding: v.padding,
      borderTop: `2px solid transparent`,
      borderRadius: v.borderRadius,
      boxShadow: `0 1px 1px 1px ${v.boxShadowColor}`,
      color: v.color,
      backgroundColor: v.backgroundColor,
      ...(p.color && { borderColor: colors.foregroundDefault }),
      ...(p.inverted && {
        color: v.backgroundColor,
        backgroundColor: p.color ? colors.foregroundDefault : v.color,
      }),
    }
  },
}

export default segmentStyles
