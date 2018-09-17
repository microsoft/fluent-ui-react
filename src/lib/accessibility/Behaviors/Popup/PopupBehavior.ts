import { Accessibility } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'
import _ from 'lodash'

/**
 * @description
 *  Adds role='button' to 'trigger' component's part, if it is not focusable element and no role attribute provided.
 *  Adds tabIndex='0' to 'trigger' component's part, if it is not tabbable element and no tabIndex attribute provided.
 *  Adds attribute 'aria-disabled=true' to 'trigger' component's part based on the property 'disabled'.
 *  Adds attribute 'aria-haspopup=true' to 'trigger' component's part.
 */
const PopupBehavior: Accessibility = (props: any) => ({
  attributes: {
    trigger: {
      role: getAriaAttribute('role', props, 'button'),
      tabIndex: getAriaAttribute('tabIndex', props, '0'),
      'aria-haspopup': 'true',
      'aria-disabled': !!props['disabled'],
    },
  },
  keyActions: {
    trigger: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
    popup: {
      closeAndFocusTrigger: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

const isFocusable = props => {
  try {
    const { as, href } = props.trigger.props
    const { type } = props.trigger
    return (
      type === 'button' ||
      type === 'input' ||
      (type === 'a' && href !== undefined) ||
      as === 'button'
    )
  } catch {
    return false
  }
}

const getAriaAttribute = (attribute, props, defaultValue) => {
  try {
    if (props.trigger.props[attribute]) {
      return props.trigger.props[attribute]
    }
    if (isFocusable(props)) {
      return undefined
    }
    return defaultValue
  } catch {
    return defaultValue
  }
}

export default PopupBehavior
