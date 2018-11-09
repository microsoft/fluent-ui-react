import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

/**
 * @description
 * The behavior is designed for particular structure of menu item. The item consists of root element and anchor inside the root element.
 * @specification
 * Adds role 'presentation' to 'root' component's part.
 * Adds role 'button' to 'anchor' component's part.
 * Adds attribute 'tabIndex=0' to 'anchor' component's part.
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'anchor' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'anchor' component's part.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'anchor' component's part.
 * Adds attribute 'aria-disabled=true' to 'anchor' component's part based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Performs click action with 'Enter' and 'Spacebar' on 'anchor'.
 */
const toolbarButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'button',
      tabIndex: '0',
      'aria-disabled': !_.isNil(props['aria-disabled'])
        ? props['aria-disabled']
        : !!props['disabled'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },

  handledProps: ['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-disabled'],

  keyActions: {
    anchor: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default toolbarButtonBehavior
