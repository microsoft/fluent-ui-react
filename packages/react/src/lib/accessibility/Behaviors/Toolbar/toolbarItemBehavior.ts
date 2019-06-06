import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

/**
 * @description
 * The behavior is designed for particular structure of toolbar item.
 *
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'data-is-focusable=true' if element type is other than 'button'.
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'root' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' component's part.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'root' component's part.
 * Adds attribute 'aria-disabled=true' to 'root' component's part based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'wrapper'.
 */
const toolbarItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      [IS_FOCUSABLE_ATTRIBUTE]: props.as === 'button' ? undefined : true,
      'aria-disabled': !_.isNil(props['aria-disabled'])
        ? props['aria-disabled']
        : !!props['disabled']
        ? true
        : undefined,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
    },
  },

  keyActions: {
    wrapper: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default toolbarItemBehavior
