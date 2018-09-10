import { Accessibility } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 *  Adds role 'presentation' on the root element
 *  Adds role 'menuitem' on anchor element
 *  Adds attribute 'aria-expanded=true' on anchor element based on "submenuOpened" property. Based on this screen readers will recognize the expanded state of the item.
 *  The behavior is designed for particular structure of menu item. The item consists of root element and anchor inside the root element.
 */

const MenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      tabIndex: '0',
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
    },
  },

  handledProps: ['aria-label', 'aria-labelledby'],

  keyActions: {
    anchor: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default MenuItemBehavior
