import { Accessibility } from '../../types'
import { AlertProps } from './alertWarningBehavior'

/**
 * @specification
 * Adds attribute 'aria-describedby' to 'body' slot.
 */

const alertBaseBehavior: Accessibility<AlertProps> = props => ({
  attributes: {
    dismissAction: {
      'aria-describedby': props.bodyId,
    },
  },
})

export default alertBaseBehavior
