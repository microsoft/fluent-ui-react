import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'
import { IImageProps } from '../../../../components/Image/Image'

export default {
  root: ({ props, variables }: { props: IImageProps; variables: any }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: (props.fluid && '100%') || variables.width,
    height: variables.height || 'auto',
    ...(props.circular && { borderRadius: pxToRem(9999) }),
    ...(props.avatar && {
      width: (props.fluid && '100%') || variables.avatarSize,
      borderRadius: variables.avatarRadius,
    }),
  }),
}
