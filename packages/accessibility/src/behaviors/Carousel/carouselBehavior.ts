import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Triggers 'moveNext' action with 'ArrowRight' on 'itemsContainer'.
 * Triggers 'movePrevious' action with 'ArrowLeft' on 'itemsContainer'.
 */
const carouselBehavior: Accessibility<CarouselBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'region',
    },
    itemsContainerWrapper: {
      'aria-live': 'polite',
    },
    itemsContainer: {
      tabIndex: 0,
      'aria-labelledby': props.itemIds[props.activeIndex],
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
  itemIds: string[]
  activeIndex: number
}

export default carouselBehavior
