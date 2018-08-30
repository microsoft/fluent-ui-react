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
      'aria-expanded': props['submenuOpened'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      tabIndex: '0',
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
    },
  },

  actionsDefinition: {
    anchor: {
      performClick: {
        keyCombinations: [
          { keyCode: keyboardKey.Enter },
          { keyCode: keyboardKey.Spacebar },
          { keyCode: keyboardKey.ArrowDown },
        ],
      },
    },
  },
  handledProps: ['aria-label', 'aria-labelledby'],
})

export default MenuItemBehavior
