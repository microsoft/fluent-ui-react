import { Accessibility } from '../../interfaces'

/**
 * @description
 * The MenuItemBehavior is done for structure of menu item which consist of root element and anchor inside the root element.
 * The MenuItemBehavior adds :
 * - role 'presentation' on the root element
 * - role 'menuitem' on anchor, which ...
 * - 'aria-expanded' attribute on anchor ???
 *
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
