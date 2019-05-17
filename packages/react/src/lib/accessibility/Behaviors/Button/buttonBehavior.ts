import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'tabIndex=0' if element type is other than 'button'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const buttonBehavior: Accessibility<ButtonBehaviorProps> = props => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      tabIndex: props.as === 'button' ? undefined : 0,
      'aria-disabled': props.disabled,
    },
  },

  keyActions: {
    content: {},
    icon: {
      onKeyDown(e, ...args) {
        const iconRef = findDOMNode(props.icon.???)
      },
    },

    contentIcon: {},

    root: {
      ...(props.as !== 'button' &&
        props.as !== 'a' && {
          onKeyDown(e, ...args) {
            props.root.onKeyDown(e, ...args)

            if (e.defaultPrevented) return

            const code = keyboardKey(e)
            if (code === keyboardKey.Enter || keyboardKey.Spacebar) {
              this.onClick(e, ...args)
            }
          },
        }),

      ...(props.as !== 'button' &&
        props.as !== 'a' && {
          performClick: {
            keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
          },
        }),
    },
  },
})

export default buttonBehavior

export type ButtonBehaviorProps = {
  /** Element type. */
  as: string
  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean
}
