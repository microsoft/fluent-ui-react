import { Accessibility } from '../../types'
import buttonBehavior from '../Button/buttonBehavior'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * The behavior is designed for particular structure of toolbar item.
 *
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'tabIndex=0' if element type is other than 'button'.
 * Adds attribute 'aria-disabled=true' to 'root' component's part based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const toolbarItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...buttonBehavior(props).attributes.root,
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

export default toolbarItemBehavior
