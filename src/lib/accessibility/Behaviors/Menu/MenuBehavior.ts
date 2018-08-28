import { Accessibility } from '../../interfaces'

/**
 * @description
 * The MenuBehavior adds role='menu'.
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 */

const MenuBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'menu',
    },
  },
}

export default MenuBehavior
