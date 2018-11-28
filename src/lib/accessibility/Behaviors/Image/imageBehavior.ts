import { Accessibility } from '../../types'

/**
 * @description
 * Image is usually only visual representation and therefore is hidden from screen readers.
 *
 * @specification
 * Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
 */

const imageBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-hidden': props['alt'] ? undefined : 'true',
    },
  },
})

export default imageBehavior
