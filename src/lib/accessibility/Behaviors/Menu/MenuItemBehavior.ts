import { Accessibility } from '../../interfaces'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/FocusUtilities'
import * as keyboardKey from 'keyboard-key'

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
      [IS_FOCUSABLE_ATTRIBUTE]: true,
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
