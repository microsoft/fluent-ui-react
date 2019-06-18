import { SegmentProps } from '../../../../components/Segment/Segment'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { SegmentVariables } from './segmentVariables'
import { getColorScheme } from '../../colors'

const segmentStyles: ComponentSlotStylesInput<SegmentProps, SegmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, p.color)

    return {
      borderColor: 'transparent',
      borderRadius: v.borderRadius,
      borderStyle: v.borderStyle,
      borderWidth: v.borderWidth,
      boxShadow: v.boxShadow,
      padding: v.padding,
      color: v.color,
      backgroundColor: v.backgroundColor,
      ...(p.color && { borderColor: colors.foreground }),
      ...(p.inverted && {
        color: v.backgroundColor,
        backgroundColor: p.color ? colors.foreground : v.color,
      }),
      ...(p.disabled && {
        boxShadow: 'none',
        borderColor: v.borderColorDisabled,
        color: v.colorDisabled,
        backgroundColor: v.backgroundColorDisabled,
        ...(p.inverted && {
          color: v.backgroundColorDisabled,
          backgroundColor: v.colorDisabled,
        }),
      }),
    }
  },
}

export default segmentStyles
