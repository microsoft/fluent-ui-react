import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role 'alert' to 'root' component's part.
 * Adds aria-live 'polite' to 'root' component's part.
 */

const alertBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'alert',
      ['aria-live']: 'polite',
    },
  },
})

export default alertBehavior
