import { Accessibility } from '../../types'

/**
 * @specification
 */
const carouselItemBehavior: Accessibility<CarouselItemProps> = props => ({
  attributes: {
    root: {
      role: 'tabpanel',
      'aria-hidden': props.active ? 'false' : 'true',
      tabIndex: props.active ? 0 : -1,
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
