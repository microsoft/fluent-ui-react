import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import menuButtonBehavior from '../MenuButton/menuButtonBehavior'

/**
 * @specification
 * Triggers 'closeMenuAndFocusButton' action with 'Escape' on 'menuButton'.
 */
const splitButtonBehavior: Accessibility<SplitButtonProps> = props => {
  const splitButtonMenuButtonBehavior = props => {
    const menuButtonBehaviorData = menuButtonBehavior(props)
    menuButtonBehaviorData.keyActions = {}

    return _.merge(menuButtonBehaviorData, {
      attributes: {
        trigger: {
          tabIndex: -1,
        },
      },
    })
  }

  return {
    keyActions: {
      menuButton: {
        closeMenuAndFocusButton: {
          keyCombinations: [
            { keyCode: keyboardKey.Escape },
            { keyCode: keyboardKey.ArrowUp, altKey: true },
          ],
        },
      },
      button: {
        openAndFocusFirst: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowDown, altKey: true }],
        },
      },
    },
    childBehaviors: {
      menuButton: splitButtonMenuButtonBehavior,
    },
  }
}

export default splitButtonBehavior

export type SplitButtonProps = {
  /** Element type. */
  // as: string
  /** A button can show it is currently unable to be interacted with. */
  // disabled?: boolean
}
