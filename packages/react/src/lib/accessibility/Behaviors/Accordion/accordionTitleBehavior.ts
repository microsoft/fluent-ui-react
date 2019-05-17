import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * Adds accessibility attributed to implement the Accordion design pattern.
 * Adds 'aria-disabled' to the 'content' component's part with a value based on active and canBeCollapsed props.
 *
 * @specification
 * Adds attribute 'role=heading' to 'root' component's part if element type is other than 'h3'.
 * Adds attribute 'aria-level=3' to 'root' component's part if element type is other than 'h3'.
 * Adds attribute 'role=button' to 'content' component's part.
 * Adds attribute 'tabIndex=0' to 'content' component's part.
 * Adds attribute 'aria-expanded=true' based on the property 'active' to 'content' component's part.
 * Adds attribute 'aria-controls=content-id' based on the property 'accordionContentId' to 'content' component's part.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'content'.
 */
const accordionTitleBehavior: Accessibility = (props: any) => {
  const isHeading = /(h\d{1})$/.test(props.as)
  return {
    attributes: {
      root: {
        role: isHeading ? undefined : 'heading',
        'aria-level': isHeading ? undefined : 3,
      },
      content: {
        'aria-expanded': !!props.active,
        'aria-disabled': !!(props.active && !props.canBeCollapsed),
        'aria-controls': props.accordionContentId,
        role: 'button',
        tabIndex: 0,
      },
    },
    keyActions: {
      content: {
        performClick: {
          keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
        },
      },
    },
  }
}

export default accordionTitleBehavior
