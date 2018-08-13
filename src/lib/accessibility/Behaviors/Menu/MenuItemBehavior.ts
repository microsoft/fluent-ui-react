import { Accessibility } from '../../interfaces'
import BasicMenuItemBehavior from '../Menu/BasicMenuItemBehavior'
import VerticalMenuItemBehavior from '../Menu/VerticalMenuItemBehavior'

import callable from '../../../callable'

const MenuItemBehavior: Accessibility = (props: any) => {
  const menuItemBehavior: Accessibility = props.vertical
    ? VerticalMenuItemBehavior
    : BasicMenuItemBehavior
  return callable(menuItemBehavior)({ props })
}

export default MenuItemBehavior
