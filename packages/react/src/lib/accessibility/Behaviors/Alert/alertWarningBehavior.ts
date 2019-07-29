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
      // TODO: this was aria-live polite, do we want to remove it?
      // 'aria-atomic': 'true',
    },
  },
})

export default alertWarningBehavior
