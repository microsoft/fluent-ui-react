import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ImageProps } from '../../../../components/Image/Image'

export default {
  root: ({ props, variables }): ICSSInJSStyle => ({
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'middle',
    width: (props.fluid && '100%') || variables.width,
    height: variables.height || 'auto',
    ...(props.circular && { borderRadius: variables.circularRadius }),
    ...(props.avatar && {
      width: (props.fluid && '100%') || variables.avatarSize,
      borderRadius: variables.avatarRadius,
    }),
  }),
} as ComponentSlotStylesInput<ImageProps, any>
