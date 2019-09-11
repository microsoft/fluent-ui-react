import { Accessibility } from '../../types'

/**
 * @specification
 *  Adds role='menuitemradio'.
 *  Adds attribute 'aria-checked=true' based on the property 'active'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */
const toolbarMenuItemRadioBehavior: Accessibility<ToolbarMenuItemRadioBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'menuitemradio',
      'aria-checked': props.checked,
      'aria-disabled': props.disabled,
    },
  },
})

export default toolbarMenuItemRadioBehavior

type ToolbarMenuItemRadioBehaviorProps = {
  checked?: boolean
  disabled?: boolean
}
