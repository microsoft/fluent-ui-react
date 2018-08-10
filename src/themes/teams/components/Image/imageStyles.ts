import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'

export default {
  root: ({ props, variables }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: variables.width || (props.fluid && '100%'),
    height: variables.height || 'auto',
    ...(props.circular && { borderRadius: pxToRem(9999) }),
    ...(props.avatar && {
      width: variables.avatarSize || (props.fluid && '100%') || pxToRem(32),
      borderRadius: variables.avatarRadius,
    }),
  }),
}
