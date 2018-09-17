import { Accessibility } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'
import _ from 'lodash'

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

export default PopupBehavior
