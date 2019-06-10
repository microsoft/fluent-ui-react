import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

type InputBehaviorProps = {
  disabled?: boolean
}

/**
 * @specification
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'clear' action with 'Escape' on 'input'.
 */
const inputBehavior: Accessibility<InputBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
    },
  },
  keyActions: {
    input: {
      clear: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

export default inputBehavior
