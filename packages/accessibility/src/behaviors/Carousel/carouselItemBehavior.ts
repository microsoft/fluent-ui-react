import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * Adds attribute 'tabIndex=0' to 'root' slot if 'active' property and 'navigation' property is true. Sets the attribute to '-1' otherwise.
 *
 * @specification
 * Adds attribute 'role=tabpanel' to 'root' slot if 'navigation' property is true. Sets the attribute to 'group' otherwise.
 * Adds attribute 'aria-hidden=false' to 'root' slot if 'active' property is true. Sets the attribute to 'true' otherwise.
 */
const carouselItemBehavior: Accessibility<CarouselItemProps> = props => ({
  attributes: {
    root: {
      role: props.navigation ? 'tabpanel' : 'group',
      'aria-hidden': props.active ? 'false' : 'true',
      tabIndex: props.navigation ? props.active ? 0 : -1 : -1,
    },
  },

  keyActions: {
    root: {
      stopPropagation: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }, { keyCode: keyboardKey.ArrowLeft }]
      },
    },
  }
})

export default carouselItemBehavior

export type CarouselItemProps = {
  /** If item is visible in the carousel. */
  active?: boolean
  navigation?: boolean
}
