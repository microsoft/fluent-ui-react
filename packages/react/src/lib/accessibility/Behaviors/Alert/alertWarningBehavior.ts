import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role 'alert' to 'content' slot.
 * Adds attribute 'aria-live=polite' to 'content' slot.
 */

const alertWarningBehavior: Accessibility = () => ({
  attributes: {
    content: {
      role: 'alert',
      'aria-live': 'polite',
    },
  },
})

export default alertWarningBehavior
