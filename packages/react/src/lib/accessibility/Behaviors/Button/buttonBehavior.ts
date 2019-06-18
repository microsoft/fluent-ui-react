import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 */
const buttonBehavior: Accessibility<ButtonBehaviorProps> = props => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      'aria-disabled': props.disabled,
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
