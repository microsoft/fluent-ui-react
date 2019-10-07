import { Accessibility } from '../../types'

/**
 * @specification
 * Adds attribute 'tabIndex=0' based on the property 'active'.
 */
const carouselItemBehavior: Accessibility<CarouselItemProps> = props => ({
  attributes: {
    root: {
      tabIndex: props.active ? 0 : -1,
      role: 'group',
      'aria-hidden': props.active ? 'false' : 'true',
    },
  },

  keyActions: {
    root: {},
  },
})

export default carouselItemBehavior

export type CarouselItemProps = {
  /** If item is visible in the carousel. */
  active?: boolean
}
