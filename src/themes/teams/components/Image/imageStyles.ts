import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'
import { IImageVariables } from './imageVariables'

export default {
  root: ({ props, variables: v }: { props: any; variables: IImageVariables }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: (props.fluid && '100%') || v.width,
    height: v.height || 'auto',
    ...(props.circular && { borderRadius: pxToRem(9999) }),
    ...(props.avatar && {
      width: (props.fluid && '100%') || v.avatarSize,
      borderRadius: v.avatarRadius,
    }),
  }),
}
