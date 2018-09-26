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
      role: getAriaAttributeFromProps('role', props, 'button'),
      tabIndex: getAriaAttributeFromProps('tabIndex', props, '0'),
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

const isFocusable = propsData => {
  try {
    const { as, href, type } = propsData
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

const getAriaAttributeFromProps = (attributeName: string, props: any, defaultValue: string) => {
  if (!props.trigger) return undefined
  if (props.trigger.props[attributeName]) {
    return props.trigger.props[attributeName]
  }
  const { as, href } = props.trigger.props
  const { type } = props.trigger
  if (isFocusable({ as, href, type })) {
    return undefined
  }
  return defaultValue
}

export default PopupBehavior
