import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role 'alert' to 'content' component's part.
 * Adds Adds attribute 'aria-live=polite' to 'content' component's part.
 */

const alertWarningBehavior: Accessibility = (props: any) => ({
  attributes: {
    content: {
      role: 'alert',
      'aria-live': 'polite',
    },
  },
})

export default alertWarningBehavior
