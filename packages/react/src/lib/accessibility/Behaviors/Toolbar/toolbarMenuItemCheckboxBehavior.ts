import { Accessibility } from '../../types'

/**
 * @specification
 *  Adds role='menuitemradio'.
 *  Adds attribute 'aria-checked=true' based on the property 'active'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */
const toolbarMenuItemCheckboxBehavior: Accessibility<
  ToolbarMenuItemCheckboxBehaviorProps
> = props => ({
  attributes: {
    root: {
      role: 'menuitemcheckbox',
      'aria-checked': props.checked,
      'aria-disabled': props.disabled,
    },
  },
})

export default toolbarMenuItemCheckboxBehavior

type ToolbarMenuItemCheckboxBehaviorProps = {
  checked?: boolean
  disabled?: boolean
}
