import { Accessibility } from '../../types'
import AlertProps from './alertProps'

/**
 * @specification
 * Adds role 'alert' to 'body' slot.
 * Adds attribute 'aria-live=polite' to 'body' slot.
 */

const alertWarningBehavior: Accessibility<AlertProps> = props => ({
  attributes: {
    body: {
      role: 'alert',
      'aria-live': 'polite',
    },
    dismissAction: {
      'aria-describedby': props.bodyId,
      'aria-label': 'dismiss',
    },
  },
})

export default alertWarningBehavior
