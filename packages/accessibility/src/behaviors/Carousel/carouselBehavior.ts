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
    ...(props.tabList && {
      buttonNext: {
        tabIndex: -1,
        'aria-hidden': 'true',
      },
      buttonPrevious: {
        tabIndex: -1,
        'aria-hidden': 'true',
      },
    }),
  },

  keyActions: {
    itemsContainer: {
      moveNext: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
      movePrevious: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
    },
    buttonNext: {
      moveNextAndFocusContainerIfLast: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
    buttonPrevious: {
      movePreviousAndFocusContainerIfFirst: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export type CarouselBehaviorProps = {
  /** Element type. */
  tabList: Object | Object[]
  ariaLiveOn: boolean
}

export default carouselBehavior
