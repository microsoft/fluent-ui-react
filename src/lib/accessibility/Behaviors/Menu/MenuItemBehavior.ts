import { Accessibility } from '../../interfaces'

/**
 * @description
 * // not finished, need to be finished...
 * The MenuItemBehavior adds :
 * - role'presentation'
 * - role 'menuitem' on anchor
 */

const MenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['submenuOpened'],
      tabIndex: '0',
    },
  },
})

export default MenuItemBehavior
