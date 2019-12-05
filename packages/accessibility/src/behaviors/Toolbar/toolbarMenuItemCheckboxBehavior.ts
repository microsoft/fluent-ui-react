import { Accessibility } from '../../types'

/**
 * @specification
 *  Adds attribute 'aria-checked=true' based on the property 'active'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 *  Adds role='menuitemcheckbox'.
 * Adds role 'presentation' to 'wrapper' slot.
 */
const toolbarMenuItemCheckboxBehavior: Accessibility<ToolbarMenuItemCheckboxBehaviorProps> = props => ({
  attributes: {
    wrapper: {
      role: 'presentation',
    },
    root: {
      'aria-checked': props.active,
      'aria-disabled': props.disabled,
      role: 'menuitemcheckbox',
    },
  },
})

export default toolbarMenuItemCheckboxBehavior

type ToolbarMenuItemCheckboxBehaviorProps = {
  active?: boolean
  disabled?: boolean
}
