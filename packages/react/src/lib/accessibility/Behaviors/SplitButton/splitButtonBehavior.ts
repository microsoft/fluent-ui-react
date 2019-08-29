import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import menuButtonBehavior from '../MenuButton/menuButtonBehavior'

/**
 * @specification
 * Adds attribute 'tabIndex=-1' to 'toggleButton' slot.
 */
const splitButtonBehavior: Accessibility = props => {
  const splitButtonMenuButtonBehavior = props => {
    const menuButtonBehaviorData = menuButtonBehavior(props)

    return _.merge(menuButtonBehaviorData, {
      keyActions: {
        trigger: {
          open: {
            keyCombinations: [{ keyCode: keyboardKey.ArrowDown, altKey: true }],
          },
        },
        popup: {
          closeAndFocusTrigger: {
            keyCombinations: [
              { keyCode: keyboardKey.Escape },
              { keyCode: keyboardKey.ArrowUp, altKey: true },
            ],
          },
        },
      },
    })
  }

  return {
    attributes: {
      toggleButton: {
        tabIndex: -1,
      },
    },
    childBehaviors: {
      menuButton: splitButtonMenuButtonBehavior,
    },
  }
}

export default splitButtonBehavior
