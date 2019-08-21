import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role 'alert' to 'wrapper' element.
 * Adds attribute 'aria-live=polite' to 'wrpper' element.
 */

const alertWarningBehavior: Accessibility<AlertWarningBehaviorProps> = props => ({
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

type AlertWarningBehaviorProps = {
  /** id of the alert wrapper element. */
  wrapperId?: string
}

export default alertWarningBehavior
