import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * Adds attribute 'role=region' to 'root' slot if 'navigation' property is false. Does not set the attribute otherwise.
 * Adds attribute 'aria-roledescription' to 'root' slot if 'navigation' property is false. Does not set the attribute otherwise.
 * Adds attribute 'aria-label' to 'root' slot if 'navigation' property is false. Does not set the attribute otherwise.
 * Adds attribute 'aria-roledescription' to 'itemsContainer' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-label' to 'itemsContainer' slot if 'navigation' property is true. Does not set the attribute otherwise.
 *
 * @specification
 * Adds attribute 'role=region' to 'root' slot.
 * Adds attribute 'aria-live=polite' to 'itemsContainerWrapper' slot if 'ariaLiveOn' property is true. Sets the attribute to 'off' otherwise.
 * Adds attribute 'aria-hidden=true' to 'paddleNext' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-hidden=true' to 'paddlePrevious' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'tabIndex=-1' to 'paddlePrevious' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'tabIndex=-1' to 'paddlePrevious' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'role=group' to 'itemsContainer' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Triggers 'showNextSlideByKeyboardNavigation' action with 'ArrowRight' on 'itemsContainer'.
 * Triggers 'showPreviousSlideByKeyboardNavigation' action with 'ArrowLeft' on 'itemsContainer'.
 * Triggers 'showNextSlideByPaddlePress' action with 'Enter' or 'Spacebar' on 'paddleNext'.
 * Triggers 'showPreviousSlideByPaddlePress' action with 'Enter' or 'Spacebar' on 'paddlePrevious'.
 */
const carouselBehavior: Accessibility<CarouselBehaviorProps> = props => ({
  attributes: {
    root: {
      role: props.navigation ? undefined : 'region',
      'aria-roledescription': props.navigation ? undefined : props.ariaRoleDescription,
      'aria-label': props.navigation ? undefined : props.ariaLabel,
    },
    itemsContainerWrapper: {
      'aria-live': props.ariaLiveOn ? 'polite' : 'off',
    },
    itemsContainer: {
      role: props.navigation ? 'group' : undefined,
      'aria-roledescription': props.navigation ? props.ariaRoleDescription : undefined,
      'aria-label': props.navigation ? props.ariaLabel : undefined,
    },

    paddleNext: {
      ...(props.navigation && {
        tabIndex: -1,
        'aria-hidden': 'true',
      }),
    },
    paddlePrevious: {
      ...(props.navigation && {
        tabIndex: -1,
        'aria-hidden': 'true',
      }),
    },
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
  ariaRoleDescription?: string
  ariaLabel?: string
}

export default carouselBehavior
