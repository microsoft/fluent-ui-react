import { Accessibility } from '../../types'

/**
 * @description
 * Loader is usually an element that displays the progress status for a task that take a long time or consists of several steps.
 *
 * @specification
 * Adds role 'progressbar' to 'root' slot.
 */

const loaderBehavior: Accessibility<LoaderBehaviorProps> = props => ({
  attributes: {
    root: {
      role: props.loaderInAnotherElement ? undefined : 'progressbar',
    },
  },
})

export default loaderBehavior

export type LoaderBehaviorProps = {
  loaderInAnotherElement?: boolean
}
