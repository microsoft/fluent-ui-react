import { Accessibility } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'

const MenuItemBehavior: Accessibility = (props: any) => ({
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

  actionsDefinition: {
    triggerClick: {
      keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
    },
  },
})

export default MenuItemBehavior
