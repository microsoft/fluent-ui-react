import { Accessibility } from '../../types'

/**
 * @specification
 *  Adds attribute 'aria-checked=true' based on the property 'checked'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 *  Adds role='menuitemradio'.
 *  Adds attribute 'tabIndex=0' to 'root' slot.
 */
const toolbarMenuItemRadioBehavior: Accessibility<ToolbarMenuItemRadioBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-checked': props.checked,
      'aria-disabled': props.disabled,
      role: 'menuitemradio',
      tabIndex: 0,
    },
  },
})

export default toolbarMenuItemRadioBehavior

type ToolbarMenuItemRadioBehaviorProps = {
  checked?: boolean
  disabled?: boolean
}
