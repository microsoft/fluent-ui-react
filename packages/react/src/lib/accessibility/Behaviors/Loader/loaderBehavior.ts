import { Accessibility } from '../../types'

/**
 * @description
 * Loader is usually an element that displays the progress status for a task that take a long time or consists of several steps.
 *
 * @specification
 * Adds role 'progressbar' to 'root' component's part.
 */

const loaderBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'progressbar',
    },
  },
})

export default loaderBehavior
