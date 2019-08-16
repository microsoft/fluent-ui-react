import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import menuButtonBehavior from '../MenuButton/menuButtonBehavior'

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'tabIndex=0' if element type is other than 'button'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const buttonBehavior: Accessibility<SplitButtonProps> = props => {
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

export default buttonBehavior

export type SplitButtonProps = {
  /** Element type. */
  // as: string
  /** A button can show it is currently unable to be interacted with. */
  // disabled?: boolean
}
