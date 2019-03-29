import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role 'status' to 'content' component's part.
 * Adds Adds attribute 'aria-live=polite' to 'content' component's part.
 */

const alertInfoBehavior: Accessibility = (props: any) => ({
  attributes: {
    content: {
      role: 'status',
      ['aria-live']: 'polite',
    },
  },
})

export default alertInfoBehavior
