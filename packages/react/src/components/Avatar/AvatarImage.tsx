import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory } from '../../utils'
import Image, { ImageProps } from '../Image/Image'

export interface AvatarImageProps extends ImageProps {}

const AvatarImage = compose(Image, {
  displayName: 'AvatarImage',
})

// @ts-ignore
AvatarImage.create = createShorthandFactory({
  // @ts-ignore
  Component: AvatarImage,
  mappedProp: 'src',
})

export default AvatarImage
