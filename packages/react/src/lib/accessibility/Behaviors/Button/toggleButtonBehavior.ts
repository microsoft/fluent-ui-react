import { Accessibility } from '../../types'
import { ButtonBehaviorProps } from './buttonBehavior'

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button
 * Adds attribute 'aria-pressed=true' based on the property 'active'. This can be overriden by providing 'aria-presssed' property directly to the component.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 */
const toggleButtonBehavior: Accessibility<ToggleButtonBehaviorProps> = props => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      'aria-disabled': props.disabled,
      'aria-pressed': !!props.active,
    },
  },
})

export default toggleButtonBehavior

type ToggleButtonBehaviorProps = ButtonBehaviorProps & {
  /** Indicates if a button is in pressed state. */
  active: boolean
}
