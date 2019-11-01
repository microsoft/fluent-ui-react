import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds attribute 'role=region' to 'root' slot.
 * Adds attribute 'aria-live=polite' to 'itemsContainerWrapper' slot if 'ariaLiveOn' property is true. Sets the attribute to 'off' otherwise.
 * Triggers 'moveNext' action with 'ArrowRight' on 'itemsContainer'.
 * Triggers 'movePrevious' action with 'ArrowLeft' on 'itemsContainer'.
 */
const carouselBehavior: Accessibility<CarouselBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'region',
    },
    itemsContainerWrapper: {
      'aria-live': props.ariaLiveOn ? 'polite' : 'off',
    },
    ...(props.navigation && {
      paddleNext: {
        tabIndex: -1,
        'aria-hidden': 'true',
      },
      paddlePrevious: {
        tabIndex: -1,
        'aria-hidden': 'true',
      },
    }),
  },

  keyActions: {
    itemsContainer: {
      showNextSlideByKeyboardNavigation: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
      showPreviousSlideByKeyboardNavigation: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
    },
    paddleNext: {
      showNextSlideByPaddlePress: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
    paddlePrevious: {
      showPreviousSlideByPaddlePress: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export type CarouselBehaviorProps = {
  /** Element type. */
  navigation: Object | Object[]
  ariaLiveOn: boolean
}

export default carouselBehavior
