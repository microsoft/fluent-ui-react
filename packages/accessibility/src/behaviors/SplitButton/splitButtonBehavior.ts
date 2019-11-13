import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

import { Accessibility } from '../../types'
import menuButtonBehavior from '../MenuButton/menuButtonBehavior'

/**
 * @description
 * Adds attribute 'tabIndex=-1' based on the property 'open' to 'trigger' slot.
 * Adds attribute 'aria-controls=menu-id' based on the property 'menuId' to 'trigger' slot.
 * Adds attribute 'aria-expanded=true' based on the property 'open' to 'trigger' slot.
 * Adds attribute 'id=trigger-id' based on the property 'triggerId' to 'trigger' slot.
 * Adds attribute 'id=menu-id' based on the property 'menuId' to 'menu' slot.
 * Adds attribute 'aria-labelledby=trigger-id' based on the property 'triggerId' to 'menu' slot.
 * Triggers 'closeAndFocusTrigger' action with 'Escape' or 'altKey'+'ArrowUp' or 'Tab' or 'Shift'+'Tab' on 'popup' slot.
 * Triggers 'open' action with 'altKey'+'ArrowDown' on 'trigger' slot.
 *
 * @specification
 * Adds attribute 'tabIndex=-1' to 'toggleButton' slot.
 * Adds attribute 'aria-haspopup=true' to 'toggleButton' slot.
 */
const splitButtonBehavior: Accessibility = props => {
  const splitButtonMenuButtonBehavior = props => {
    const menuButtonBehaviorData = menuButtonBehavior(props)
    menuButtonBehaviorData.attributes.trigger['aria-haspopup'] = undefined

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
              { keyCode: keyboardKey.Tab, shiftKey: false },
              { keyCode: keyboardKey.Tab, shiftKey: true },
            ],
          },
        },
      },
    })
  }

  return {
    attributes: {
      root: {},
      toggleButton: {
        tabIndex: -1,
        'aria-haspopup': true,
      },
    },
    childBehaviors: {
      menuButton: splitButtonMenuButtonBehavior,
    },
  }
}

export default splitButtonBehavior
