import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import * as _ from 'lodash'

/**
 * @specification
 * Adds role 'presentation' to 'wrapper' component's part.
 * Adds role 'tab' to 'root' component's part.
 * Adds attribute 'tabIndex=0' to 'root' component's part.
 * Adds attribute 'aria-selected=true' to 'root' component's part based on the property 'active'. This can be overriden by providing 'aria-selected' property directly to the component.
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'root' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' component's part.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'root' component's part.
 * Adds attribute 'aria-controls' based on the property 'aria-controls' to 'root' component's part.
 * Performs 'performClick' action with 'Enter' or 'Spacebar' on 'wrapper'.
 */
const tabBehavior: Accessibility = (props: any) => ({
  attributes: {
    wrapper: {
      role: 'presentation',
    },
    root: {
      role: 'tab',
      tabIndex: '0',
      'aria-selected': !_.isNil(props['aria-selected'])
        ? props['aria-selected']
        : !!props['active'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      'aria-controls': props['aria-controls'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  handledProps: [
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-controls',
    'aria-selected',
  ],
  keyActions: {
    wrapper: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default tabBehavior
