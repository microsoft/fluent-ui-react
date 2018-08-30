import { Accessibility } from '../../interfaces'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/FocusUtilities'

const MenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['submenuOpened'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
})

export default MenuItemBehavior
