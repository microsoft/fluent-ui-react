import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds attribute 'aria-hidden=true' to icon.
 * Icon is usually only visual representation and therefore is hidden from screen readers.
 */

const IconBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-hidden': 'true',
    },
  },
})

export default IconBehavior
