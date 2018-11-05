import { ICSSInJSStyle } from '../../../types'
import { SegmentVariables } from './segmentVariables'

export default {
  root: ({ variables }: { variables: SegmentVariables }): ICSSInJSStyle => {
    return {
      padding: variables.padding,
      background: variables.background,
      border: variables.border,
      borderRadius: variables.borderRadius,
      // boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)', Is this build-in shadow necessary for how generic Segment is?
    }
  },
}
