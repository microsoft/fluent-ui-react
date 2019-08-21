import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role 'alert' to 'wrapper' element.
 * Adds attribute 'aria-live=polite' to 'wrpper' element.
 */

const alertWarningBehavior: Accessibility<AlertBehaviorProps> = props => ({
  attributes: {
    wrapper: {
      role: 'alert',
      'aria-live': 'polite',
    },
    dismissAction: {
      'aria-labelledby': props.wrapperId,
    },
  },
})

export default alertWarningBehavior
