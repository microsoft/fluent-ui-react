import { Accessibility } from '../../types'
import buttonBehavior, { ButtonBehaviorProps } from '../Button/buttonBehavior'

/**
 * @specification
 *  Adds role='radio'. This allows screen readers to handle the component as a radio button.
 *  Adds attribute 'aria-checked=true' based on the property 'active'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 *  Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const toolbarRadioGroupItemBehavior: Accessibility<ToolbarRadioGroupItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'radio',
      'aria-checked': props.active,
      'aria-disabled': props.disabled,
    },
  },
  keyActions: buttonBehavior(props).keyActions,
})

export default toolbarRadioGroupItemBehavior

type ToolbarRadioGroupItemBehaviorProps = {
  /** Indicates if radio item is selected. */
  active?: boolean
  /** Indicates if radio item is disabled. */
  disabled?: boolean
} & ButtonBehaviorProps
