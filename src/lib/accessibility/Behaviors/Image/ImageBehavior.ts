import { Accessibility } from '../../interfaces'

/**
 * @description
 * The ImageBehavior add attribute "aria-hidden='true'"  on img tag, if there is no 'alt' attribute provided.
 * Image is usually only visual representation and therefore is hidden from screen readers.
 */

const ImageBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-hidden': props['alt'] ? undefined : 'true',
    },
  },
})

export default ImageBehavior
