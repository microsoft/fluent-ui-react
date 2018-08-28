import { Accessibility, IS_FOCUSABLE_ATTRIBUTE } from '../../interfaces'

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
