import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

import { Accessibility } from '../../types'
import popupBehavior, { PopupBehaviorProps } from '../Popup/popupBehavior'

/**
 * @description
 * Implements ARIA [MenuButton](https://www.w3.org/TR/wai-aria-practices/#menubutton) design pattern.
 * Adds attribute 'aria-controls=menu-id' based on the property 'open' to 'trigger' slot.
 *
 * @specification
 * Adds role='none'.
 * Adds attribute 'aria-haspopup=true' to 'trigger' slot if 'contextMenu' property is not set.
 * Adds attribute 'tabIndex=-1' based on the property 'open' to 'trigger' slot.
 * Adds attribute 'aria-expanded=true' based on the property 'open' to 'trigger' slot.
 * Adds attribute 'id=trigger-id' based on the property 'triggerId' to 'trigger' slot.
 * Adds attribute 'id=menu-id' based on the property 'menuId' to 'menu' slot.
 * Adds attribute 'aria-labelledby=trigger-id' based on the property 'triggerId' to 'menu' slot.
 */
const menuButtonBehavior: Accessibility<MenuButtonBehaviorProps> = props => {
  const behavior = popupBehavior(props)
  return _.merge(behavior, {
    attributes: {
      root: {
        role: 'none',
      },
      trigger: {
        'aria-controls': props.open ? props.menuId : undefined,
        'aria-expanded': props.open || undefined,
        'aria-haspopup': props.contextMenu ? undefined : 'true',
        id: props.triggerId,
        ...(!props.contextMenu && props.open && { tabIndex: -1 }),
      },

      menu: {
        'aria-labelledby': props.triggerId,
        id: props.menuId,
      },
    },
    keyActions: {
      root: {
        ...(props.open
          ? {
              closeMenu: {
                keyCombinations: [
                  { keyCode: keyboardKey.Tab, shiftKey: false },
                  { keyCode: keyboardKey.Tab, shiftKey: true },
                ],
              },
            }
          : _.includes(props.on, 'click') && {
              openAndFocusFirst: {
                keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
              },
              openAndFocusLast: {
                keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
              },
            }),
      },
    },
  })
}

export interface MenuButtonBehaviorProps extends PopupBehaviorProps {
  /** Defines ID of the menu element. */
  menuId?: string
  /** Defines ID of the trigger element. */
  triggerId?: string
  /** Defines whether popup is displayed. */
  open?: boolean
  /** Determines if the MenuButton behaves as context menu */
  contextMenu?: boolean
}

export default menuButtonBehavior
