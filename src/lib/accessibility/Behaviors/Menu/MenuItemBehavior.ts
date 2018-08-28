import { Accessibility } from '../../interfaces'

/**
 * @description
 * The MenuItemBehavior is done for structure of menu item which consist of root element and anchor inside the root element.
 * The MenuItemBehavior adds :
 * - role 'presentation' on the root element
 * - role 'menuitem' on anchor element
 * - 'aria-expanded' attribute on anchor element based on "submenuOpened" property
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
