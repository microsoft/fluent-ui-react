import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

/**
 * @description
 * The behavior is designed for particular structure of menu item. The item consists of root element and anchor inside the root element.
 *
 * @specification
 * Adds role 'presentation' to 'root' component's part.
 * Adds role 'menuitem' to 'anchor' component's part.
 * Adds attribute 'tabIndex=0' to 'anchor' component's part.
 * Adds attribute 'data-is-focusable=true' to 'anchor' component's part.
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'anchor' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'anchor' component's part.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'anchor' component's part.
 * Adds attribute 'aria-expanded=true' based on the property 'menuOpen' if the component has 'menu' property to 'anchor' component's part.
 * Adds attribute 'aria-haspopup=true' to 'anchor' component's part based on the property 'menu'.
 * Performs 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Performs 'closeAllMenus' action with 'Escape' on 'root'.
 * Performs 'closeAllMenusAndFocusNextParentItem' action with 'ArrowRight' on 'root'.
 * Performs 'closeMenu' action with 'ArrowLeft' on 'root'.
 * Performs 'openMenu' action with 'ArrowDown' on 'root', when orientation is horizontal.
 * Performs 'openMenu' action with 'ArrowRight' on 'root', when orientation is vertical.
 */

const menuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      tabIndex: '0',
      'aria-expanded': props.menu ? props['menuOpen'] || false : undefined,
      'aria-haspopup': props.menu ? 'true' : undefined,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },

  handledProps: [
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-expanded',
    'aria-haspopup',
  ],

  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
      closeAllMenus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
      closeAllMenusAndFocusNextParentItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
      closeMenu: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
      openMenu: {
        keyCombinations: [
          { keyCode: props.vertical ? keyboardKey.ArrowRight : keyboardKey.ArrowDown },
        ],
      },
    },
  },
})

export default menuItemBehavior
