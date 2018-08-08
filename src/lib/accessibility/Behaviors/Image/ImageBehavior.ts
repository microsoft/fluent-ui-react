import { Accessibility } from '../../interfaces'

const ImageBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props['alt'] ? undefined : 'presentation',
    },
  },
})

export default ImageBehavior
