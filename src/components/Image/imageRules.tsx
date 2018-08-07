import { pxToRem } from '../../lib'

export default {
  root: ({ props, variables }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: variables.width || (props.fluid && '100%'),
    height: variables.height || 'auto',
    ...(props.circular && { borderRadius: pxToRem(9999) }),
    ...(props.avatar && {
      width: variables.avatarSize,
      borderRadius: variables.avatarRadius,
    }),
  }),
}
