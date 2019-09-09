import { Accessibility } from '../../types'
/**
 * @specification
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 */
const textAreaBehavior: Accessibility<TextAreaBehaviorProps> = props => ({
  attributes: {
    textArea: {
      'aria-disabled': props.disabled,
    },
  },
})

export default textAreaBehavior

type TextAreaBehaviorProps = {
  disabled?: boolean
}
