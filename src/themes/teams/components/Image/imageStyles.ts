import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'

export default {
  root: ({ props, variables }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    ...(props.circular && { borderRadius: pxToRem(9999) }),
    ...(props.avatar && {
      width: variables.avatarSize,
      borderRadius: variables.avatarRadius,
    }),
  }),
}
