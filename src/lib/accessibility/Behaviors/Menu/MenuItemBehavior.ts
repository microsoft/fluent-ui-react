import { Accessibility } from '../../interfaces'

/**
 * @description
 *  Adds role 'presentation' on the root element
 *  Adds role 'menuitem' on anchor element
 *  Adds attribute 'aria-expanded=true' on anchor element based on "submenuOpened" property
 *  The behavior is designed for particular structure of menu item. The item consists of root element and anchor inside the root element.
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
