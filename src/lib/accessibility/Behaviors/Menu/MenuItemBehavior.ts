import { Accessibility, ActionsDefinition, AccessibilityActions } from '../../interfaces'
import getKeyDownHandlers from '../../../getKeyDownHandlers'
import * as keyboardKey from 'keyboard-key'

const actionsDefinition: ActionsDefinition = {
  anchor: {
    performClick: {
      keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
    },
  },
}

const MenuItemBehavior: Accessibility = (props: any, actions: AccessibilityActions) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['submenuOpened'],
      tabIndex: '0',
    },
  },

  handlers: getKeyDownHandlers(actions, actionsDefinition, props),
})

export default MenuItemBehavior
