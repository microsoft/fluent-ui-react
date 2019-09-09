import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { ListItemBehaviorProps } from './listItemBehavior'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @specification
 * Adds role='menuitem'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const navigableListItemBehavior: Accessibility<ListItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'menuitem',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default navigableListItemBehavior
